# Vue2 场景分析 —— queue 执行过程中遇到子组件被卸载，queue 中已存在的子组件是否渲染

Vue.js v2.6.10

### 问：

有关系是爷父子的三个组件 A B C ；B 组件更新时，触发 C 组件更新，然后修改了 A 组件的变量，导致 B 组件被删除。问，C 组件是否触发更新？

### 答：

不会触发更新。

组件卸载会调用每一个子组件的卸载方法，设置 watcher.active = false ， watcher.run 调用时不会触发更新。

源码如下：

卸载组件

```javascript
Vue.prototype.$destroy = function () {
  ...
  var i = vm._watchers.length;
  while (i--) {
    vm._watchers[i].teardown();
  }
  ...
};
```

卸载 watcher

```javascript
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // 删除 deps 中的此 watcher
    ...
    this.active = false;
  }
};
```

queue 中等的执行的 watcher 执行时，会先判断 active

```javascript
Watcher.prototype.run = function run () {
  if (this.active) {
    ...
  }
};
```
