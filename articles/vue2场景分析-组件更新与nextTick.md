# Vue2 场景分析 —— 组件更新与 nextTick 的顺序分析

Vue.js v2.6.10

之前听过这样一句话：**nextTick 中拿到的是更新后的 DOM。**

但是下面这些场景看起来并不符合：

```javascript
// <div id="txt">{{ this.txt }}</div>
// txt 默认 '0'

// 场景一
this.txt = '1'
this.$nextTick(() => {
  console.log(document.getElementById('txt').innerText) // '1'
})

// 场景二
this.$nextTick(() => {
  console.log(document.getElementById('txt').innerText) // '0'
})
this.txt = '1'

// 场景三
this.txt = '1'
this.$nextTick(() => {
  console.log(document.getElementById('txt').innerText) // '2'
})
this.txt = '2'
```

接下来就来分析分析这三个场景。

之前讲过 nextTick 的源码，[Vue 源码解析 —— nextTick](http://icyc.cc/article/6107e7063225df224d6305c4)，是把任务放进全局 callbacks ，使用微任务调用 flushCallbacks 循环执行 callbacks 。

this.txt 通过 watcher 触发组件更新，调用 watcher.update ，

```javascript
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

进而调用 queueWatcher 。

```javascript
function queueWatcher (watcher) {
  ...
  queue.push(watcher);
  ...
  // queue the flush
  if (!waiting) {
    waiting = true;
    
    nextTick(flushSchedulerQueue);
  }
}
```

queueWatcher 把 watcher 放入全局 queue 等待更新，并且调用 使用 nextTick 调用 flushSchedulerQueue 进行更新。 flushSchedulerQueue 方法同步触发组件的更新。

所以综上， this.$nextTick 和 组件的更新都调用了nextTick 放入 全局 callbacks ，然后按顺序执行，所以，先插入 callbacks 就先执行。

场景一和场景二就显而易见了。

场景三，代码 this.txt = '2' 直接放入全局 queue ，会跟着第一行代码一块儿渲染，所以打印 '2' 。
