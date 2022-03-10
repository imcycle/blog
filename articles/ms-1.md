# 1

## 介绍一下你的微前端项目

* 项目简介：
    所有应⽤和数据集成到⼀个信息管理平台之上。
    20年年底开始着手准备，21年年初立项，5月份上线第一版，截止去年年底，接入项目有190多个。
* 微前端是什么：
* qiankun框架：
    是什么，对比iframe，qiankun原理，fetch请求，js沙箱，css隔离；
    缺点：css隔离问题，路由切换实例销毁
* 项目搭建基础：
    权限管理系统，sso登陆，账号管理系统。
* 项目的特点：
    页面缓存，css隔离
* 接入：
    npm工具包，接入文档，相对路径图片

## react和vue有哪些不同

* 定义
    用于构建用户界面的 JavaScript 库。react
    用于构建用户界面的渐进式框架。vue
* 触发渲染的条件
    react：this.setState
    vue：数据更新
* 子节点的更新渲染
    react：子子孙孙全部渲染，16.8 fibber
    vue：props 改变才会触发更新
* diff 算法（ABCD-DABC）
    react：依次比对
    vue: 四根指针

## vue3对比vue2有哪些改进

* vue3具有的composition API实现逻辑模块化和重用
* 增加了新特性，如Teleport组件，全局API的修改和优化等
* 响应式数据处理 WeepMap

## react hooks 和 react class 对比

* 命令式 规则
* 地狱嵌套

## 做过vue的哪些优化 / 做过react哪些优化

vue

* 路由懒加载
* keep-live缓存页面
* 使用v-show代替v-if
* v-for遍历避免同时使用v-if
* 图片懒加载v-lazy
* 无状态组件使用函数式

react

* key
* pureComponent / shouldComponentUpdate
* 使用React.Fragment避免添加额外的DOM
* 延迟加载不是立即需要的组件


## 介绍一下 ts





让你设计一个小程序架构，你要怎么实现
有没有leader经验


## 简单请求

简单请求 GET HEAD POST ，无自定义头，Content-Type为以下几种： text/plain multipart/form-data application/x-www-form-urlencoded
非简单请求 PUT DELETE ，json 格式

## 封装组件

## 强缓存和协商缓存

1，浏览器进行资源请求时，会判断response headers是否命中强缓存，如果命中，直接从本地读取缓存，不会向服务器发送请求，
       
2，当强缓存没有命中时，会发送请求到服务端，判断协商缓存是否命中，如果命中，服务器将请求返回，不会返回资源，告诉浏览器从本地读取缓存。如何不命中，服务器直接返回资源  

区别： 强缓存命中，不会请求服务器，直接请求缓存；协商缓存命中，会请求服务器，不会返回内容，然后读取缓存；

### 强缓存 200 memory cache / disk cache

Expires：过期时间   http1.0

Cache-Control： max-age=300     http1.1

### 协商缓存 304

ETag Last-Modified


## JavaScript 

## 为什么 react 需要引入 React ，而 vue 不需要引入 Vue

react 编译完成调用 React.createElement

vue 编译完成，render 函数第一个参数 是 createElement

## 项目相关

### 项目业务

比较复杂的需求，会和产品业务一起需求评审

奇怪的需求，我也会跟产品重新确认，反复讨论



### 微前端架构有哪些，为什么选 qiankun

美团的前端微服务Bifrost
阿里 icestark 是一个面向大型系统的微前端解决方案

### qiankun 底层原理是什么，用的什么

### 项目有什么难点，是怎么解决的

* style 隔离
* 实例缓存（路由）qiankun 自带 是切换清除实例
* 子应用通信
* localStorage冲突：indexDB 数据库储存 
* 子应用强缓存 nginx
* 路由无线循环 ，配置 path: '*'

### 你们项目目前还有哪些地方可以优化

加载菜单过多，数量限制

### 你们这个项目做得成功吗，为什么这么觉得

我认为这个项目做的是成功的
1、从研发侧来说：高内聚低耦合原则构建业务域；业务域沉淀功能、沉淀各自业务域的系统设计，系统以完整的业务域形式呈现，业务域通过流程和数据驱动；
2、从用户侧来说：将企业的所有应用和数据集成到一个信息管理平台之上，并以个性化的统一入口为用户提供个性化的企业信息和服务，提升用户工作效率
3、从规范侧来说：制定了统一的规范，节约开发、开发及系统接入成本成本——首页框架接入规范、服务端开发规范、权限菜单接入规范、新前端应用发布规范、微前端接入规范、门户设计及交互规范。

### 如果再给你一次机会重新做这个项目，有哪些地方可有优化

* 功能（style 隔离，菜单同步）
* 子应用强缓存

### 为什么要离职

发展受限了，希望到更好的平台发挥

### 未来有什么规划

* 个人方面 去年一年都在研究框架的源码，近两年准备再深入沉淀，然后偏向于p路线，希望能多多参与部门内架构建设，有机会也非常希望能接触开源项目，希望在前端领域做一些贡献
* 团队方面 所学所思研究成果，部门内部定期分享讨论

### 说几个最近的前端前沿技术

* 微服务
* 微前端

## Reflect 用途

* 将 Object 对象明显属于语言内部的方法，放到Reflect对象上。未来的新方法将只部署在Reflect对象上。
* 某些返回值更加合理。（Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。）
* 让Object操作都变成函数行为。（delete obj[name] -> Reflect.deleteProperty(obj, name)）
* Reflect 与 Proxy 一一对应



## san mian

### 最近几年有什么规划

上海落户
