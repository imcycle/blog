# vue2 源码解析 —— scheduler 调度程序

Vue.js v2.6.14

目录：/node_modules/vue/src/core/observer/scheduler.js

上篇文章写到， vue 首次渲染是同步的，更新渲染是以组件为粒度放在队列里依次更新的，这是如何实现的呢？

## 首次渲染和更新渲染的区别

组件首次渲染 new Watcher(vm, updateComponent) 直接调用 updateComponent；

组件更新渲染 Watcher.prototype.update ；

```js
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
```

由于 lazy 和 sync 在用于试图更新的 watcher 里是 undefined ，所以调用的是 queueWatcher ，调度也就是从这里开始的。

## 调度程序

上篇文章讲过，更新渲染时，子组件 props 的修改会触发子组件的更新，会把子组件用于更新的 watcher 加入 queue 等待更新。

由于组件可以调用父子组件的方法，进而触发父子组件的更新，每一个组件的渲染都会产生大量的父子组件更新，所以会让更新变得杂乱无章。所以需要调度程序。

调度程序是如何让组件的更新井然有序呢？核心是通过按照 queue 中 组件的当前执行位置 和 watcher.id 大小，把新 watcher 插入合适的位置。

### 调度程序的全局变量

```js
const queue: Array<Watcher> = []  // 存放需要更新的 watcher 队列， watcher.run() 会触发组件的更新
const activatedChildren: Array<Component> = []
let has: { [key: number]: ?true } = {}  // queue 中已存在的 watcher.id ，防止重复添加
let waiting = false  // true 表示已开启渲染
let flushing = false  // 正在渲染中
let index = 0  // 正在更新的 queue 的下标
```

waiting 和 flushing 的区别是：waiting 表示开启渲染，但由于是 nextTick 开启的渲染，当真正开始渲染时， flushing 才会被赋值 true 。

### queueWatcher

queueWatcher 为什么使用 watcher.id 排序呢？因为整个项目的初次渲染时，整个 vnode 都是同步渲染的， 组件的 update watcher 的 id 的大小顺序就是初次渲染的顺序。

```js
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {  // 防止重复添加
    has[id] = true
    if (!flushing) {  // 如果没有开始渲染，就直接 push ，因为开始渲染时， queue 还会做一次排序。相比每一次 push 都排序提升了性能
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {  // 剩余部分，根据 id 从小到大，插入到合适位置
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {  // 如果没有开启渲染，就开启渲染
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
```

### flushSchedulerQueue

```js
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  flushing = true
  let watcher, id

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort((a, b) => a.id - b.id)

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()  // 调用生命周期 before
    }
    id = watcher.id
    has[id] = null
    watcher.run()  // 触发渲染
  }

  // keep copies of post queues before resetting state
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  resetSchedulerState()  // 更新完毕，重置 scheduler 状态

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue)  // 调用生命周期 activated (keep-alive)
  callUpdatedHooks(updatedQueue)  // 调用生命周期 updated
}
```

### resetSchedulerState

```js
/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}
```
