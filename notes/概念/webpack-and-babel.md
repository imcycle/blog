webpack，babel，babel-loader，的关系，如何配合编译react。

通常我们新建一个项目，会先配置webpack，然后配置babel；babel是一个编译工具，实际上，babel也是可以单独使用的。

下面我们从Babel出发，简单配置一个react项目，来清晰认识一下webpack和babel的关系。

## Babel 和 Webpack 简介

Babel 是一个 JavaScript 编译器。（把浏览器不认识的语法，编译成浏览器认识的语法。）

webpack 是一个现代 JavaScript 应用程序的静态模块打包器。（项目打包）

下面会用到的：
|名称|描述|
|-|-|
|@babel/cli|Babel附带了一个内置的CLI，可用于从命令行编译文件。|
|@babel/core|使用本地配置文件|
|@babel/preset-env|编译最新版本JavaScript|
|@babel/preset-react|编译react|
|@babel/polyfill|通过 Polyfill 方式在目标环境中添加缺失的特性|
|@babel/plugin-proposal-class-properties|编译 class|

## 开始配置

新建项目

```shell
mkdir myProject
```

进入项目

```shell
cd myProject/
```

初始化 npm

```shell
npm init
```

不用管提示，一顿回车键。然后会生成一个文件 <code>package.json</code>

### 配置 Babel

安装 Babel 相关依赖

```shell
npm install --save-dev @babel/cli @babel/core @babel/preset-env @babel/polyfill
```

新建文件 <code>babel.config.json</code>

```json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": []
}
```

新建文件夹 <code>src</code>，<code>src</code> 内新建文件 <code>test.js</code>，随便写点啥es6语法。

<img style="width: 500px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200320164626077-631360087.png" />

使用下面命令编译

```shell
./node_modules/.bin/babel src --out-dir lib
```

<img style="width: 600px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200320164940662-570501411.png" />

编译完会新增目录<code>lib</code>, 里面放着编译好的文件

<img style="width: 500px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200320165128134-1895765200.png">

### 配置 React

安装 <code>React</code> 相关依赖

```shell
npm install --save react react-dom
```

<code>babel.config.json</code> 添加 <code>React</code> 相关配置

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}
```

<code>src</code> 下新增 <code>react</code> 文件 <code>main.js</code>

```js
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>Hello World!</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

运行命令编译

```shell
./node_modules/.bin/babel src --out-dir lib
```

编译完成后 <code>lib</code> 下多了一个 <code>main.js</code>

<img style="width: 800px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200320173447532-306023029.png" />

看起来编译很成功, 我们在 <code>lib</code> 下面新建一个 html 引入 <code>main.js</code> 看看效果

<img style="width: 600px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200320174059014-369351006.png" />

报错，原因TODO..

### 配置 webpack

安装 <code>webpack</code> 依赖

```shell
npm install --save-dev webpack webpack-cli
```

根目录新建文件 <code>webpack.config.js</code>

```js

```




