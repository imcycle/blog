# webpack cli 运行原理

我们以 vue 脚手架 @vue/cli 为例。

全局安装的 @vue/cli 配置了 vue 环境变量，当 vue 指令运行时，会使用 node 执行对应的 js 脚本，js 脚本内可以获取到运行时的参数，然后与控制台进行交互。

## 全局安装 @vue/cli 干了什么

1. 下载 @vue/cli 到全局环境
2. 根据 package.json 中的 bin 字段，配置环境变量（@vue/cli 即配置 vue 环境变量）

![](http://storage.icyc.cc/p/20220324/rc-upload-1648098983729-5.png)

## vue 命令最终运行的是 js 文件，我们写的 js 为什么不能执行呢？

bin 目录里的 vue.js 的第一行指定了如何运行它。

如果我们的 js 文件里加上这一行，也可以直接运行。

![](http://storage.icyc.cc/p/20220324/rc-upload-1648098983729-7.png)

## 如何查看环境变量中的 vue 指令

which 指令查看环境变量目录，进入目录即可看到指令以及对应的软链接。

![](http://storage.icyc.cc/p/20220324/rc-upload-1648098983729-3.png)
