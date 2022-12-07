# Vue3 源码解析 —— 首次渲染和更新渲染

"version": "3.2.45"

ps: 代码中 hydrate 是服务端渲染，本文暂不讨论。 patch 中的 diff 算法，下篇讨论。

## 首次渲染

我们的代码 `createApp(App).mount('#app')` 调用的是 createAppAPI 里的 mount 方法，mount 包装 App 生成顶级的 vnode， 然后调用 `render(vnode, rootContainer, isSVG)` 进行渲染，也就是 `renderer.ts` 文件中的 render 方法。

render 方法调用 patch 渲染 AppVnode ， patch 会根据不同类型执行不同的方法。

```typescript
// packages/runtime-core/renderer.ts
const patch: PatchFn = (
  n1,
  n2,
  container,
  anchor = null,
  parentComponent = null,
  parentSuspense = null,
  isSVG = false,
  slotScopeIds = null,
  optimized = __DEV__ && isHmrUpdating ? false : !!n2.dynamicChildren
) => {
  const { type, ref, shapeFlag } = n2;
  // 根据 type 和 shapeFlag ，调用下面不同的方法

  // processText(n1, n2, container, anchor);
  // processCommentNode(n1, n2, container, anchor);
  // mountStaticNode(n2, container, anchor, isSVG);
  // processFragment(...);  fragment节点
  // processElement(...);
  // processComponent(...);
  // Teleport
  // Suspense
};
```

patch 方法根据不同的类型，调用不同的方法进行渲染。**processFragment 和 processElement 中如果遇到 children，也会调用 mountChildren 渲染列表。**

我们的 App 是 component ，所以看 processComponent 方法。processComponent 方法中：

```typescript
const processComponent = (
  n1: VNode | null,
  n2: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string[] | null,
  optimized: boolean
) => {
  if (n1 == null) {
    // ...
    mountComponent(
      n2,
      container,
      anchor,
      parentComponent,
      parentSuspense,
      isSVG,
      optimized
    );
  } else {
    updateComponent(n1, n2, optimized);
  }
};
```

- 如果是首次渲染，调用 mountComponent 方法，方法中生成组件的实例 instance ，然后调用 setupRenderEffect 进行下一层渲染；
- 如果是更新渲染，调用 updateComponent 方法。

由于是首次渲染，所以调用 mountComponent

```typescript
// packages/runtime-core/renderer.ts
const mountComponent: MountComponentFn = (
  initialVNode,
  container,
  anchor,
  parentComponent,
  parentSuspense,
  isSVG,
  optimized
) => {
  const instance: ComponentInternalInstance =
    compatMountInstance ||
    (initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    ));

  // ...

  // 执行组件定义的setup函数并将必要的信息挂载到组件实例上
  setupComponent(instance);

  // ...

  setupRenderEffect(
    instance,
    initialVNode,
    container,
    anchor,
    parentSuspense,
    isSVG,
    optimized
  );
};
```

mountComponent 生成 app 的实例 instance ，调用 setupRenderEffect 方法，进而调用 componentUpdateFn 。

```typescript
// packages/runtime-core/renderer.ts
const componentUpdateFn = () => {
  if (!instance.isMounted) {
    // 首次渲染
    // ...
    // 生成 vnode
    const subTree = (instance.subTree = renderComponentRoot(instance));
    // 首次渲染
    patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
    initialVNode.el = subTree.el; // initialVNode: 组件首次渲染初始化的vnode
    // ...
    instance.isMounted = true;
    // ...
  } else {
    // 更新
    // ...
    let { next, bu, u, parent, vnode } = instance;

    if (next) {
      next.el = vnode.el;
      // 更新组件信息 updateProps updateSlots 等 flushPreFlushCbs
      updateComponentPreRender(instance, next, optimized);
    } else {
      next = vnode;
    }
    // ...
    // 生成新的 vnode
    const nextTree = renderComponentRoot(instance);
    const prevTree = instance.subTree;
    instance.subTree = nextTree;
    // 更新渲染
    patch(
      prevTree,
      nextTree,
      // parent may have changed if it's in a teleport
      hostParentNode(prevTree.el!)!,
      // anchor may have changed if it's in a fragment
      getNextHostNode(prevTree),
      instance,
      parentSuspense,
      isSVG
    );
    next.el = nextTree.el;
    // ...
  }
};
```

componentUpdateFn 生成 subTree （也就是 App 的 children vnode ），继续调用 patch 方法渲染，形成了递归渲染。

到这里，我们梳理一下**首次渲染**流程：

1. mount
2. render
3. patch
4. mountComponent
5. setupRenderEffect
6. componentUpdateFn（这里开始子节点的渲染）
7. 重复步骤 3 ，形成递归渲染

## 更新渲染

上篇文章 [《Vue3 源码初探 —— 响应式原理》](http://icyc.cc/article/617176e9bd57925fa26f265c) 中，讲到数据的更新，会触发 triggerEffects ，调用 effect.run() ，也就是 componentUpdateFn 方法。

接下来更新组件信息，生成 children 的 vnode ，继续 patch ，如果子节点是组件， processComponent -> updateComponent 进行子节点的组件更新。

```typescript
// packages/runtime-core/renderer.ts
const updateComponent = (n1: VNode, n2: VNode, optimized: boolean) => {
  const instance = (n2.component = n1.component)!;
  if (shouldUpdateComponent(n1, n2, optimized)) {
    // ...

    instance.next = n2;

    // ...

    // instance.update is the reactive effect.
    instance.update();
  } else {
    // no update needed. just copy over properties
    n2.el = n1.el;
    instance.vnode = n2;
  }
};
```

在 setupRenderEffect 方法中有这么几句：

```typescript
// packages/runtime-core/renderer.ts
const setupRenderEffect: SetupRenderEffectFn = () => {
  const componentUpdateFn = () => {};

  // create reactive effect for rendering
  const effect = (instance.effect = new ReactiveEffect(
    componentUpdateFn,
    () => queueJob(update),
    instance.scope // track it in component's effect scope
  ));

  const update: SchedulerJob = (instance.update = () => effect.run());
};
```

所以 updateComponent 中的 `instance.update();` 即 effect.run() 形成递归更新。

到这里，我们梳理一下**更新渲染**流程：

1. 修改数据，触发 set
2. triggerEffects
3. effect.run()
4. componentUpdateFn（这里生成 child vnode ，开始子节点的渲染）
5. patch（type：text/component/list 等，如果是 component）
6. updateComponent
7. instance.update()
8. 重复步骤 3 ，形成递归更新
