
## 性能优化

架构层面：
* 服务端渲染 ssr（描述什么是服务端渲染，优缺点）

开发阶段：
* 接到需求好好分析需求，设计通用性好的代码，当然也不要过度设计
* 减少重绘重排（讲一讲重绘重排过程）
* 使用事件委托，节省内存（讲一讲事件委托）
* ludashi call 和 apply
* if 和 switch ，条件多时候，使用 switch ，有更好的可读性（if 和 switch 实现方式一样，性能一样）
* 防抖节流
* 使用 web workers
* 使用 位操作（例如 /2 向下取整，右移）
* 使用 iconfont 代替图片图标，使用精灵图
* 将 CSS 放在文件头部，JavaScript 文件放在底部

webpack 打包阶段：
* 压缩文件，使用 gzip 压缩
  JavaScript：UglifyPlugin
  CSS ：MiniCssExtractPlugin
  HTML：HtmlWebpackPlugin
* 静态资源使用 CDN
* webpack 配置按需加载，提取第三方库
* 配置比较小的图片用 base64 方式插入标签

网络方面
* 使用js资源缓存（强缓存、协商缓存）
* 升级 HTTP2 （优点）
  1.解析速度快（基于帧的协议）
  2.多路复用
  3.首部压缩（把相同的首部存储起来，仅发送它们之间不同的部分）
  4.优先级
  5.流量控制
  6.服务器推送
* 减少 HTTP 请求。（描述请求过程，DNS 查找、TCP、TSL）

vue

* 唯一的key
* 不需要响应式的数据不要放data里
* 合理使用 watcher 和 computed

react

* 唯一的key
* pureComponent / shouldComponentUpdate

https://juejin.cn/post/6892994632968306702


## defer 和 async

* 默认情况下，请求资源-解析-请求资源-解析
* defer 异步请求资源，DOMCoutentLoad 之前解析
* async 异步请求资源，请求完成就解析

## webpack

## vue3 有哪些优化

* 引入 tree-shaking 技术，减少打包体积
* 数据劫持方案优化，由Object.defineProperty改为Proxy对象
* 编译优化（react 渲染，vue2 渲染，vue3 区分静态动态）
* 新特性（api）



项目介绍
微前端问了些
说一说你们项目构建流程
做一道题，题挺简单的
redux和vuex有啥不同
讲一讲webpack loader 和 plugin 


强缓存，协商缓存


说一说你的项目，在其中扮演的角色
从地址栏输入url到页面渲染出来，之间发生了什么
前端页面优化
HTTP1和http2的区别
说一说vue diff算法
说一说浏览器常见的攻击






你们项目优势，竞品