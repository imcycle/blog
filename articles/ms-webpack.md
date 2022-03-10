

## Loader

webpack 默认支持处理 JS 与 JSON 文件，其他类型都处理不了，这里必须借助 Loader 来对不同类型的文件的进行处理。

* css-loader 处理 CSS
* style-loader 通过 style 标签的形式添加到页面上
* postcss-loader 自动添加 CSS3 部分属性的浏览器前缀
* less-loader / sass-loader
* file-loader	解决图片引入问题，并将图片 copy 到指定目录，默认为 dist
* url-loader 解依赖 file-loader，小图 base64 编码 src
* img-loader 压缩图片
* babel-loader 使用 Babel 加载 ES2015+ 代码并将其转换为 ES5

### babel-loader

可以配置在 package.json 中，也可以提取 .babelrc.js

* @babel/core Babel 编译的核心包
* @babel/preset-env Babel 编译的预设，可以理解为 Babel 插件的超集
* @babel/preset-react 

```javascript
// webpack.config.js
// ...
const config = {
  entry: './src/index.js', // 打包入口地址
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.join(__dirname, 'dist'), // 输出文件目录
  },
  module: { 
    rules: [
      {
        test: /\.js$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
            }
          }
        ]
      },
    // ...
    ]
  },
  //...
}
// ...
```

## 插件 plugin

插件（Plugin）可以贯穿 Webpack 打包的生命周期，执行不同的任务

* HtmlWebpackPlugin 打包后的文件引入html
* clean-webpack-plugin 自动清空打包目录
* mini-css-extract-plugin 分离样式文件

## 环境

cross-env

```json
"scripts": {
  "dev": "cross-env NODE_ENV=dev webpack serve --mode development", 
  "test": "cross-env NODE_ENV=test webpack --mode production",
  "build": "cross-env NODE_ENV=prod webpack --mode production"
},
```

## SourceMap

'eval',
'source-map',
'eval-source-map',
'cheap-source-map',
'inline-source-map',
'eval-cheap-source-map',
'cheap-module-source-map',
'inline-cheap-source-map',
'eval-cheap-module-source-map',
'inline-cheap-module-source-map',
'hidden-source-map',
'nosources-source-map'


|关键字|描述|
|-|-|
|inline|代码内通过 dataUrl 形式引入 SourceMap|
|hidden|生成 SourceMap 文件，但不使用|
|eval|eval(...) 形式执行代码，通过 dataUrl 形式引入 SourceMap|
|nosources|不生成 SourceMap|
|cheap|只需要定位到行信息，不需要列信息module展示源代码中的错误位置|

* 开发： eval-cheap-module-source-map
* 生产： none

```txt
devtool: 'eval-cheap-module-source-map',
```

## hash

* hash ：任何一个文件改动，整个项目的构建 hash 值都会改变；
* chunkhash：文件的改动只会影响其所在 chunk 的 hash 值；
* contenthash：每个文件都有单独的 hash 值，文件的改动只会影响自身的 hash 值；

```txt
filename: "[name][hash:8][ext]"
```

## 优化

### 优化构建速度

* alias 别名
* resolve.extensions 扩展名
* resolve.modules 优先搜索的目录
* resolveLoader.modules 自定义 loader
* externals 从输出的 bundle 中排除依赖
* 配置 babel 的时候 缩小范围 include exclude
* noParse 不需要解析依赖的第三方大型类库等
* 多进程配置 thread-loade   happypack (x)webpack5 已弃用
* 利用缓存 cacheDirectory cache-loader
* hard-source-webpack-plugin 为模块提供了中间缓存 ，重复构建时间大约可以减少 80% 。（webpack5已内置）

### 优化构建结果

* 压缩 CSS    optimize-css-assets-webpack-plugin
* 压缩 JS  
* 清除无用的 CSS    purgecss-webpack-plugin
* Tree-shaking     剔除没有使用的代码，以降低包的体积
* Scope Hoisting   即作用域提升，原理是将多个模块放在同一个作用域下，并重命名防止命名冲突，通过这种方式可以减少函数声明和内存开销。

### 优化进行时体验

* splitChunks 分包配置
* 代码懒加载
* prefetch 与 preload

## webpack 和 vite


## 首页加载优化

* Vue-Router路由懒加载（利用Webpack的代码切割）
* 使用CDN加速，将通用的库从vendor进行抽离
* Nginx的gzip压缩
* Vue异步组件
* 服务端渲染SSR
* 如果使用了一些UI库，采用按需加载


