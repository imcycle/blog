# node cli 开发基础知识

## 开发流程 && 难点

* 创建 npm 项目
* 入口上方添加 运行方式
* 配置 package.json ,添加 bin
* 编写脚手架
* 发布 npm

### 安装使用

全局安装

### 难点

* 模块分包
* 命令注册
* 参数解析
* options 全称、简写
* 帮助文档
* 命令行交互
* 日志打印
* 变色文字
* 网络通信 http socket
* 文件处理

## 基础版本

1. npm init -y 新建项目
2. bin/index.js #!/usr/bin/env node 新建文件
3. package.json bin cyc-cli: bin/index.js 配置运行路径
4. npm login 登陆
5. npm publish 发布
6. npm install -g cyc-test-cli 全局安装
7. cyc-test 运行测试

## cli 本地调试

两种方式

1. 在 cli 目录下， -g 安装的包，如果包名相同，npm 软链会指向当前项目
2. 在 cli 目录下，npm link

npm link 用法

* npm link xxx : 将当前项目下的 node_modules 的 xxx ，连接到 node 全局 node_modules 下的 xxx 。
* npm link ：将本地链接到 node 全局 node_modules 下，并解析 bin 配置可执行文件。

所以，如果 cli 用到了其他本地包，可以这样调试：

1. 本地包内执行 npm link。（假如这个包叫 xxx）
2. cli 内执行 npm link xxx

## cli 命令注册 和 参数解析

解析原理：

```javascript
const argv = require('process').argv; // 以 空格 分割

const command = argv[2]; // 命令
const options = argv.slice(3); // 参数
```

## lerna

基于 git + npm 的多 package 项目管理工具

* 大幅减少重复操作。例如多 package 互相依赖，link ；依赖安装；单元测试；代码提交；代码发布。
* 提升操作的标准化。发布统一版本，方便管理。

使用 lerna 的知名包：

* babel
* vue-cli
* create-react-app

### lerna 开发过程

1. 项目初始化： npm init -> 安装 lerna -> lerna init
2. 创建 package ：lerna create -> lerna add -> lerna link
3. 脚手架开发和测试：lerna exec ; lerna run ; lerna clean ; lerna bootstrap
4. 脚手架发布上线：lerna version ; lerna changed ; lerna diff ; lerna publish


