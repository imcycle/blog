# Webpack、Vite、Rollup、Esbuild 对比

|方式|web 开发|生产构建|
|-|-|-|
|Webpack|bundle + HMR|webpack|
|Vite|Esbuild 预构建 + no bundle + ESM + HMR|rollup|
|Rollup|bundle + live reload|rollup|
|Esbuild|bundle + live reload|esbuild|

## Webpack

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

* 开发：webpack + webpack-dev-server
* 打包：webpack

开发中，启动前打包，代码改变后，重新打包。

## vite

开发坏境：

* esbuild 依赖预构建（一个依赖生成一个 esm 模块，支持 cjs，减少请求数量）
* 即时的模块热更新，基于 ESM 的 HMR（hot module replacement）
* 真正的按需加载: 利用浏览器 ESM 支持（拦截 esm 的 get 请求，打包返回）

生产打包：rollup

[深入理解Vite核心原理](https://juejin.cn/post/7064853960636989454)

### HMR（Hot Module Replacement）

出现背景：传统 live reload 方式会刷新页面，无法保存应用状态。HMR 实现按模块更新，不会丢失应用状态。

传统 live reload 方式：

1. 服务端与浏览器建立 socket 连接
2. 代码修改后，服务端重新打包，socket 通知浏览器
3. 浏览器收到通知后，window.reload() 刷新页面

HMR 在此原理基础上，会推送具体哪个模块发生了改变，并提供方法监听模块的变化。监听方法内的逻辑需要自己写，不过，如果是 react 或者 vue ，都有对应的 loader 处理。style-loader 实现了 HMR 接口；当它通过 HMR 接收到更新，它会使用新的样式替换旧的样式。

webpack 官网对于 [HMR](https://www.webpackjs.com/concepts/hot-module-replacement/) 介绍举例了这样代码，修改 printMe 内容，就能看到效果。代码如下：

```javascript
import _ from 'lodash';
import printMe from './print.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;  // onclick 事件绑定原始的 printMe 函数上

  element.appendChild(btn);

  return element;
}

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
  })
}
```

这片文章也写的比较详细：[120 行代码帮你了解 Webpack 下的 HMR 机制](https://juejin.cn/post/6973825927708934174)

## Rollup

官方描述：Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。

特点是：打包为 ESM ，对比 webpack （自己实现的 cjs ，还要吧代码编译为 cjs），打包更小。

web 开发环境，可以 rollup.watch + rollup-plugin-livereloaded ，live reload 模式更新页面。

[rollup打包产物解析及原理（对比webpack）](https://juejin.cn/post/7054752322269741064)

## Esbuild

go 语言实现，多线程并行打包。

对比 webpack，webpack 打包过程中存在大量重复动作。并且使用 nodejs ，单线程，有内存限制，随着项目变大，打包时间指数上升。

web 开发环境，可以 esbuild.serve + live-server



