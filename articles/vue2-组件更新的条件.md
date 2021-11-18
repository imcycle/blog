# Vue2 源码解析 —— 组件更新的条件

Vue.js v2.6.14

目录：/node_modules/vue/dist/vue.runtime.esm.js

众所周知，父组件更新时，会用到 diff 算法对比判断新老 vnode 是否是新节点，如果是新节点会触发渲染，如果是老节点就触发更新。新节点的渲染比较好理解，那么在源码中，触发组件更新的过程是怎样的呢？

修改页面上的数据触发更新的流程如下：

updateComponent -> _update -> ```__patch__``` -> patch -> 由于是只修改了页面数据，组件还是老组件，所以调用 patchVnode(oldVnode, vnode, ...) -> 调用 prepatch 更新组件的 props ，调用 updateChildren 使用 diff 算法对比更新子节点，如果老节点，继续调用 patchVnode 更新。

我们就从一段代码详细看看更新流程：

```vue
<template>
  <!-- A 组件 -->
  <div>
    <button @click="num++">add</button>
    <div>
      <p>{{num}}</p>
    </div>
    <B :num="num">
    <span>123</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 0,
    }
  },
}
</script>


<template>
  <!-- B 组件 -->
  <div>{{num}}</div>
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  }
}
</script>
```

A 组件模板会生成这样的 vnode：

```js
var vnode = {
  tag: 'div',
  children: [
    { tag: 'button', children: [{ text: 'add' }] },
    { tag: 'div', children: [{ tag: 'p', children: [{ text: '0' }] }] },
    { tag: 'B' },
    { tag: 'span', children: [{ text: '123' }] },
  ],
}
```
点击 A 组件的 add 按钮，页面是怎么触发渲染的呢

1. A 组件中，点击 add 按钮， num 加一，触发 num 内更新 A 组件的 watcher ，然后调用了 updateComponent 方法；
2. updateComponent 方法生成 vnode （数据格式如上），这时候的 vnode 里组件的 props 已经是最新的数据，并调用 vm._update(vnode) 更新 vnode；
3. 由于是更新， _update 方法 会调用 ```vm.__patch__(prevVnode, vnode)``` ，也就是调用 patch 方法；
4. 当前两个组件是相似的，所以调用 patchVnode ；由于当前 vnode 是 div ，又有 children ，所以调用 updateChildren ；
5. updateChildren 使用 diff 算法对比新旧 children
6. 第一个 children 相似，使用 patchVnode 更新这个子节点；当前节点是 button ， updateChildren 更新 children ，第一个相似，调用 patchVnode ，此时是 text add ，oldVnode.text !== vnode.text 不成立，所以继续往下
7. 第二个 children 相似，使用 patchVnode 更新；当前节点是 div ，然后与第 6 步差不多， 一直往下执行，不同的是 vnode.text 变成了 1 ，oldVnode.text !== vnode.text 成立，所以 nodeOps.setTextContent(elm, vnode.text) 更新真实节点；（注意，在这里是更新了真实的 dom）
8. 第三个 children 相似，使用 patchVnode 更新；当前节点是 B 组件，由于是组件，会调用 prepatch 方法，进而调用 updateChildComponent ，循环新的 props 赋值给 vm._props ，由于 vm._props 是被响应式处理过的，所以会触发子组件的更新，这个更新会被放进队列中依次更新；
9. 第三个 children 相似，使用 patchVnode 更新；当前节点 span ，更新方式与 6 相同；
10. 当前组件更新完毕，更新全局 queue 数组中的下一个组件，此时也就是 B 组件，重头开始按顺序更新。

更新步骤到这里就讲完了，回归主题，组件更新的条件是什么呢？

**假如页面数据被修改，会触发当前组件的更新，更新过程中遇到子组件，会调用 updateChildComponent 方法修改响应式的 vm._props ，如果数据改变，会把子组件用于更新的 watcher 插入 queue 队列，等到当前组件更新完，就会找 queue 中下一个组件进行更新，直到 queue 为空，全部更新结束。**

特别需要注意的是：

* vue 的首次渲染是同步的，生成的真实 dom 会在最后插入页面。
* vue 的页面更新 维护了一个队列，以组件为维度一个一个更新，并且每一个最小单位 vnode 更新时都会直接修改 dom 。
