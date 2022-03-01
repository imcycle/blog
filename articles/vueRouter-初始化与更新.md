# vue-router 初始化流程和更新流程

版本：3.1.3

本文讲 vue-router 的初始化流程和更新流程。

vue-router 使用演示：

```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

new Vue(
  el: '#app',
  router: new Router({
    routes: []
  })
)
```

## 初始化流程

初始化过程分为三个部分 安装插件、实例化路由、初始化路由

安装插件时，全局混入 beforeCreate 方法，等根节点创建之前，实例化路由，并监听 _route 变化时更新页面；路由实例化设置路由模式，监听到路由变化时，修改 _route ，进而更新页面。

### 安装 Vue 插件

Vue.use(Router) 执行 Router.install 方法，对应源码路径 ```vue-router/src/install.js``` 。（node_modules/vue-router/src/ 下少了几个文件夹，需要去 github 上找。）

install 主要做了这几件事情：

* Vue.mixin 全局混入 beforeCreate 生命周期，初始化路由
* 在 Vue.prototype 添加不能修改的 $router $route
* Vue.component 注入全局组件 RouterView RouterLink

全局混入需要详细讲一讲

```js
Vue.mixin({
  // 全局混入的生命周期，每个组件都会执行
  beforeCreate () {
    // $options.router 即 new Vue 时候传进去的 router, 所以只有根节点存在
    if (isDef(this.$options.router)) {
      // 根节点走这里
      this._routerRoot = this
      this._router = this.$options.router
      // 初始化路由 init ，后面讲
      this._router.init(this)
      // defineReactive 是将属性变为响应式，get 时收集依赖，set 时通知依赖
      // 此处作用是: 把 _route 绑定在 this 上, 当  _route 被修改时, 会触发视图的更新
      Vue.util.defineReactive(this, '_route', this._router.history.current)
    } else {
      // 除根节点外的其他组件都会走这里
      // 根节点 vue 实例，所有路由相关操作，都在根节点上进行。$router $route 都从这里获取。
      this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
    }
    registerInstance(this, this)
  },
  destroyed () {
    registerInstance(this)
  }
})
```

$route 对整个流程也至关重要。上面说到，_route get 时收集依赖，set 时触发视图更新，收集依赖的重要一环就在这里。下面代码获取 $route 时， 会获取  this._routerRoot._route,  router-view 渲染时使用了 $route ，所以在页面初始化时，_route 收集到了更新视图的 updateComponent Watcher，_route 被修改时，触发 updateComponent 更新。

```js
Object.defineProperty(Vue.prototype, '$router', {
  get: function get () { return this._routerRoot._router }
});

Object.defineProperty(Vue.prototype, '$route', {
  // router-view render 中使用了 $route，所以 router-view 组件初始化时候，更新视图的依赖被收集
  get: function get () { return this._routerRoot._route }
});

Vue.component('RouterView', View);
Vue.component('RouterLink', Link);
```

### 路由实例化

路由实例化在会作为参数 router 放入 new Router({}) options 中

Router 构造函数实例化时：

* 初始化一些变量
* createMatcher
* 定义路由模式 history/hash/abstract ，并初始化路由，路由变化触发回调函数


### 路由初始化

在根节点 beforeCreate 时，会触调用路由实例上的 init 方法初始化路由

```vue-router/dist/vue-router.esm.js```

```js
VueRouter.prototype.init = function init (app /* Vue component instance */) {
  var this$1 = this;

  // 支持同时存在多个 vue 实例
  this.apps.push(app);

  // 每个实例卸载后，删除自己
  app.$once('hook:destroyed', function () {...});

  var history = this.history;

  if (history instanceof HTML5History) {
    ...
  } else if (history instanceof HashHistory) {
    ...
  }

  // 路由改变时，app._route 会被重新赋值，进而触发页面重新渲染
  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};
```

## 更新流程

push/replace/popstate -> transitionTo -> updateRoute  -> cb -> app._route = route -> 页面更新渲染 

## 总结

* Vue.use(VueRouter) 会在全局混入 beforeCreate 生命周期，在每一个实例上放上 _route
* 全局的 Vue.prototype.$route 取值 _route
* 当组件内用到了路由，组件的 updateWatcher 会被收集到 _route 的 subs 中 （RouterView 组件内用到了 _route）
* 当路由发生改变，_route 被重新赋值，通知 subs 触发更新渲染，也就是使用过 _route 的组件被触发更新渲染
