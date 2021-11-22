# Vue Router 实现原理

History API 、原生实现、 Vue Router 原理。

## History API

### History.pushState()

向当前浏览器会话的历史堆栈中添加一个状态（state）。

```js
history.pushState(state, title[, url]);
```

```js
history.pushState({ key: '1' }, '', '/page?key=1');
```

### History.replaceState()

修改当前历史记录实体。

```js
history.replaceState(stateObj, title[, url]);
```

```js
history.replaceState({ key: '2' }, '', '/page1?key=2');
```

### popstate 事件

当活动历史记录条目更改时，将触发popstate事件。

需要注意的是**调用history.pushState()或history.replaceState()不会触发popstate事件。**只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()或者history.forward()方法）

## 实现一个简易版 Router

根据 History API ，咱们就可以实现一个简易版的路由。

思路是： pushState 改变路由并渲染页面； popstate 监听路由变化并渲染页面；初始化根据路由渲染页面。

```html
<body>
  <div>
    <button onclick="push('/')">Home</button>
    <button onclick="push('/about')">About</button>
    <button onclick="push('/center')">Center</button>
  </div>
  <div id="pageBox">
    <div data-key="home">Home Page</div>
    <div data-key="about">About Page</div>
    <div data-key="center">Center Page</div>
  </div>

  <script>
    // 路由表
    var routers = [
      { key: 'home', path: '/' },
      { key: 'about', path: '/about' },
      { key: 'center', path: '/center' },
    ]
    // 渲染
    function renderPage(key) {
      var pageBox = document.getElementById('pageBox');
      Array.prototype.forEach.call(pageBox.children, function (child) {
        if (child.dataset.key === key) {
          child.style.display = 'block';
        } else {
          child.style.display = 'none';
        }
      })
    }
    // 找到路由 key
    function findKey(path) {
      var router = routers.find(v => v.path === path);
      return key = router && router.key;
    }
    // push
    function push(path) {
      var key = findKey(path);
      window.history.pushState({ key }, '', path);
      renderPage(key);
    }
    // 监听
    window.addEventListener('popstate', function ({ state }) {
      renderPage(state.key);
    })
    // 初始化渲染
    renderPage(findKey(window.location.pathname));
  </script>
</body>
```

## Vue Router 原理

Vue Router 在 install 时使用 Vue.mixin 把 _routerRoot 添加到每个 vue 实例上，路由组件 router-view 使用 _routerRoot._route 和 路由表 渲染对用的页面；当 router.push 修改路由 或 popstate 监听到路由变化时，会改变 _routerRoot._route ，进而触发页面的更新。

Vue Router 还实现了 history 和 hash 两种模式，并做了向下兼容；

在渲染方面，对比原生的实现， vue-router 显得更加简洁， router-view 只需要根据 路由表 和 当前路由 写好渲染规则即可，路由改变自动更新页面；而原生手动修改 DOM 显得格外繁琐。

**参考**

* https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState
* https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState
* https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event
