# Vue2 源码解析 —— EventBus

Vue.js v2.6.10

目录：/node_modules/vue/dist/vue.esm.js

## EventBus 用法

```js
// 定义
Vue.prototype.Event = new Vue() // event bus

// 组件内
this.Event.$on('fn', this.fn) // 绑定
this.Event.$once('fn1', this.fn1) // 绑定只能调用一次
this.Event.$off('fn', this.fn) // 解绑
this.Event.$emit('fn', 1, 2, 3) // 触发
```

## EventBus 实现

源码结构如下：

```js
function eventsMixin (Vue) {
  Vue.prototype.$on = function (event, fn) {...};

  Vue.prototype.$once = function (event, fn) {...};

  Vue.prototype.$off = function (event, fn) {...};

  Vue.prototype.$emit = function (event) {...};
}
```

根据源码，写了一个简易版：

```js
class Event {
  constructor() {
    this._events = {} // { event -> cbs }
  }

  $on(event, fn) {
    this._events[event] || (this._events[event] = []).push(fn)
  }

  $once(event, fn) {
    const vm = this
    function on() {
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    vm.$on(event, on)
  }

  $off(event, fn) {
    const cbs = this._events[event]
    if (cbs) {
      var cb
      var i = cbs.length
      while (i--) {
        cb = cbs[i]
        if (cb === fn) {
          cbs.splice(i, 1)
          break
        }
      }
    }
  }

  $emit(event, ...args) {
    const cbs = this._events[event]
    if (cbs) {
      cbs.forEach(cb => cb.call(this, ...args))
    }
  }
}
```

$emit 方法和 $once 方法绑定的 this 是 event 实例，但为什么 vue 方法里获取的 this 是 vue 实例呢？原因是 vue 实例化时，methods 的每一个方法都绑定了 vue 实例。

## 组件 v-on 中的 EventBus

组件上使用 v-on:event1="fn" 绑定事件，组件内使用 this.$emit('event1') 调用，也是基于 event bus 。

![](http://storage.icyc.cc/p/20211108/rc-upload-1636348245259-2.png)

源码中， vnode 生成过程中，```var listeners = data.on;``` ；实例化时候， initEvents 把这些方法 通过 target.$on 处理，所以组件内部可以通过 this.$emit('event') 调用。
