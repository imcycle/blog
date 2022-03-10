# Vue3 源码初探 —— 响应式原理

"version": "3.2.20"

本文导读 vue3 的响应式原理，包括数据的处理、收集依赖和触发依赖。（也就是修改数据-页面的重新渲染，中间发生了什么）

```vue
<template>
  <button type="button" @click="add">count is: {{ state.count }}</button>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

const add = () => {
  state.count = state.count + 1
}
</script>
```

## 数据处理

Vue3 提供的数据响应式方法有很多，原理都类似，下面来一起看看 reactive 方法。

reactive 方法目录： /packages/reactivity/src/reactive.ts

reactive 调用 createReactiveObject ，使用 Proxy 处理数据，生成的新数据放进全局 reactiveMap ，并返回。简写如下：

```ts
export const reactiveMap = new WeakMap<Target, any>()

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
}


function reactive(target: object) {
  // 目标已有相应的代理
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  const proxy = new Proxy(target, baseHandlers)
  proxyMap.set(target, proxy)
  return proxy
}
```

数据的读取和修改会触发对应的 getter 和 setter ，与 Vue2 类似，会在 getter 中收集依赖， setter 中触发依赖，不过这里的依赖不是 Watcher ，而是 ReactiveEffect 的实例 effect 。

看 getter 和 setter 之前，先看看 mount 的过程会比较好理解。

## APP 首次 mount 过程

通常项目的 main.js 会有这样一段代码： ```createApp(App).mount('#app')``` ，这个就是项目的根节点挂载。

下面来看源码的 createApp 方法，目录： /packages/runtime-dom/src/index.ts 。

### createApp

```js
export const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args)

  const { mount } = app
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector)
    const proxy = mount(container, false, container instanceof SVGElement)
    return proxy
  }

  return app
})
```

app 生成的调用过程 ```ensureRenderer -> createRenderer -> baseCreateRenderer -> createAppAPI``` ，app 是在 createAppAPI 里生成的。和 Vue2 不同， Vue2 是 ```new Vue()``` 生成 vue 实例，而 Vue3 是直接生成的 app 对象。

项目 main.js createApp 后调用了 mount 方法，在源码中对应的是 createAppAPI 方法里的 app.mount 。

### mount

mount 方法关键一段 ```render(vnode, rootContainer, isSVG)``` ，这里的 render 是 createAppAPI 的第一个参数，也就是 baseCreateRenderer 方法里的 render 。

```js
const render: RootRenderFunction = (vnode, container, isSVG) => {
  if (vnode == null) {
    if (container._vnode) {
      unmount(container._vnode, null, null, true)
    }
  } else {
    patch(container._vnode || null, vnode, container, null, null, null, isSVG)
  }
  flushPostFlushCbs()
  container._vnode = vnode
}
```

patch 方法触发对比更新，由于是首次渲染，很容易定位到 patch 方法里的 processComponent 函数。进而定位到 mountComponent 方法。

### mountComponent

组件的首次挂载都会调用 mountComponent 方法。

```js
const mountComponent: MountComponentFn = (
  initialVNode,
  container,
  anchor,
  parentComponent,
  parentSuspense,
  isSVG,
  optimized
) => {
  ...

  setupRenderEffect(
    instance,
    initialVNode,
    container,
    anchor,
    parentSuspense,
    isSVG,
    optimized
  )
}
```

在 Vue2 中，mountComponent 方法会生成一个更新组件的 watcher ，Vue3 对应的方法是 setupRenderEffect 。

### setupRenderEffect

顾名思义，建立渲染的副作用。这个方法会创建一个更新组件的 effect ，并调用 effect.run ，run 方法会调用 effect 实例化时候的第一个参数，也就是 componentUpdateFn ，触发组件的第一次渲染。

```js
const setupRenderEffect: SetupRenderEffectFn = (
  instance,
  initialVNode,
  container,
  anchor,
  parentSuspense,
  isSVG,
  optimized
) => {
  const componentUpdateFn = () => {...}

  // create reactive effect for rendering
  const effect = new ReactiveEffect(
    componentUpdateFn,
    () => queueJob(instance.update),
    instance.scope // track it in component's effect scope
  )

  const update = (instance.update = effect.run.bind(effect) as SchedulerJob)
  update.id = instance.uid

  update()
}
```

接下来一起来看 ReactiveEffect 。

## 依赖收集

Vue3 中没有了 watcher ，取而代之的是 effect 。这里创建的是渲染的 effect ，代码中，也可以生成监听数据的 effect 。


### ReactiveEffect

目录： /packages/reactivity/src/effect.ts

ReactiveEffect 是 Vue3 的一个核心类，用于创建 effect 实例。

核心内容如下：

```js
class ReactiveEffect<T = any> {
  deps: Dep[] = [] // 记录收集过自己的 dep ，当自己删除时候，通知 dep 删除自己。

  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null,
    scope?: EffectScope | null
  ) {
    recordEffectScope(this, scope)
  }

  run() {...}
}
```

上面讲到，首次渲染的 mountComponent 方法调用 setupRenderEffect ，而 setupRenderEffect 调用 ReactiveEffect 生成了一个更新组件的 effect 。并调用了 effect.run。

```js
run() {
  ...
  try {
    effectStack.push((activeEffect = this))
    ...
    return this.fn()
  } finally {
    ...
    effectStack.pop()
    const n = effectStack.length
    activeEffect = n > 0 ? effectStack[n - 1] : undefined
  }
  ...
}
```

看到这儿，感觉就来了，和 Vue2 Watcher 的神似。

在 Vue2 中使用 Dep.target 和 targetStack 标记需要被收集的依赖：

```js
Dep.target = null;
var targetStack = [];
```

Vue3 类似，使用 activeEffect 和 effectStack 标记需要被收集的依赖：

```js
const effectStack: ReactiveEffect[] = []
let activeEffect: ReactiveEffect | undefined
```

run 方法 先标记依赖，后删除依赖，中间的 this.fn() 就是收集依赖的过程。

此时的 fn 是传进来的 componentUpdateFn 方法，只看名字就知道是渲染组件，那么想要渲染必然会读取数据，例如文章开始例子中的 ```state.count``` 。由于我们的 state 是 Proxy 处理过的对象的响应式副本，所以会调用 get 方法。

### getter

目录： /packages/reactivity/src/baseHandlers.ts

上面 数据处理 讲过，getter 是 mutableHandlers.get ，深入会找到 createGetter 方法。

```js
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    ...
    const res = Reflect.get(target, key, receiver)
    ...
    track(target, TrackOpTypes.GET, key)
    ...
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}
```

getter 的值会通过 Reflect.get 获取并返回，还会调用 track 方法收集依赖。

```js
const targetMap = new WeakMap<any, KeyToDepMap>()

export function track(target: object, type: TrackOpTypes, key: unknown) {
  ...
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = createDep()))
  }
  ...
  trackEffects(dep, eventInfo)
}

export function trackEffects(
  dep: Dep,
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  let shouldTrack = !dep.has(activeEffect!)
  ...
  if (shouldTrack) {
    dep.add(activeEffect!)
    activeEffect!.deps.push(dep)
    ...
  }
}
```

targetMap 的结构是 ```{target -> key -> dep}``` ，存放所有的响应式数据。 dep 中收集了数据相关的依赖（effect），那么数据被修改的时候，就会通知这些 effect 。

### setter

目录： /packages/reactivity/src/baseHandlers.ts

与 getter 相同，也能找到 createSetter 这个方法

```js
function createSetter(shallow = false) {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    let oldValue = (target as any)[key]
    ...
    const result = Reflect.set(target, key, value, receiver)
    ...
    trigger(target, TriggerOpTypes.SET, key, value, oldValue)

    return result
  }
}
```

通过 Reflect.set 修改数据，并调用 trigger 通知依赖。

```js
export function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {
  ...
  let deps: (Dep | undefined)[] = []
  ...
  deps.push(depsMap.get(key))
  ...
  if (deps.length === 1) {
    if (deps[0]) {
      triggerEffects(deps[0])
    }
  } else {
    const effects: ReactiveEffect[] = []
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep)
      }
    }
    triggerEffects(createDep(effects))
  }
}
```

trigger 循环调用 triggerEffects 通知依赖

```js
export function triggerEffects(
  dep: Dep | ReactiveEffect[],
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  // spread into array for stabilization
  for (const effect of isArray(dep) ? dep : [...dep]) {
    effect.run()
  }
}
```

triggerEffects 调用 effect.run ，run 会调用 fn 方法，并且会再次收集依赖，就形成了闭环。

## 与 Vue2 对比

* Vue2 初始化会把 data 数据递归处理，全部响应式处理，然后渲染时候通过 getter 收集依赖
* Vue3 初始化只会把 外层对象 调用 reactive 方法处理。当用到了对象内的数据，并且返回值是对象，继续调用 reactive 方法处理。
* 总的来说 Vue2 是 data 数据全部处理，Vue3 是用到的数据才处理。

### Vue2 为什么不按需处理数据？

Todo..

## 总结

Vue3 使用 Proxy 代理对象， getter 会收集放在全局的依赖（effect）， setter 通知收集到的依赖（effect）。

组件的首次渲染会生成一个 用于渲染组件的 effect ，并放在全局，然后渲染页面，此时页面上用到的数据在获取时会调用 getter ，把 effect 收集。

当代码修改数据时调用 setter 通知这个 effect 重新渲染页面。

方法整理：

```js
// {target -> key -> dep} 所有的响应式副本都在这儿，  target 是当前对象，当 target 不使用，会被垃圾回收
const targetMap = new WeakMap<any, KeyToDepMap>()

// 类似 Vue2 targetStack ，依赖栈，例如父子嵌套渲染时候，依赖出现递进关系
const effectStack: ReactiveEffect[] = []
// 类似 Vue2 Dep.target ，需要被收集的依赖
let activeEffect: ReactiveEffect | undefined

// 生成 effect
class ReactiveEffect {
  fn() {}  // 传入的回调
  run() {}  // 将自己放在全局 -> 执行 fn （ fn 中获取数据的会把自己收集） -> 把自己在全局删除
}

// Proxy
// getter
track() {}  // 获取 dep ，调用 trackEffects 收集依赖
trackEffects() {}  // 收集依赖
// setter
trigger() {}  // 循环 deps 调用 triggerEffects(effect)
triggerEffects() {} // 通知依赖 调用 effect.run()
```
