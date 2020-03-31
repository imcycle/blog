# 开发一个基础的npm包

## 初始化项目

```shell
# 新建文件夹
mkdir whosmeya-npm-package-test

# 进入
cd whosmeya-npm-package-test/

# 初始化 package.json, -y 表示 使用默认配置
npm init -y

# 新建文件
touch index.js
```

在 <code>index.js</code> 中写入如下代码

```js
exports.test = 'Hello world!';
```

目录如下

<img style="width: 240px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200331175739222-752146331.png" />

## 注册npm账号

注册npm账号 地址 [https://www.npmjs.com/login](https://www.npmjs.com/login)

注册完成后记得去邮箱验证（如果验证失败，就把验证地址复制到注册账号的浏览器打开），如果不验证，发布时候会403。

登陆

```shell
npm login
```

<img style="width: 440px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200331180221699-626333824.png" />

## 发布

```shell
npm publish
```

<img style="width: 480px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200331180804174-621918820.png" />

发布成功，npm官网查看

<img style="width: 800px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200331181056490-2110922649.png" />

## 使用

```shell
npm install whosmeya-npm-package-test
```

```js
import { test } from 'whosmeya-npm-package-test';

console.log(test);
// Hello world!
```

## 更新版本

修改 <code>package.json</code>

```diff
- "version": "1.0.0",
+ "version": "1.0.1",
```

发布

```shell
npm publish
```

<img style="width: 480px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200331183616547-450999217.png" />

同样npm官网上包的版本号也变成了1.0.1

## 关联GitHub发布

```shell
npm version patch && git push --follow-tags && npm publish
npm version minor && git push --follow-tags && npm publish
npm version major && git push --follow-tags && npm publish
```

这样将递增包版本号，提交变更，然后创建一个本地 tag 标签，并推送到 github 和发布到 npm package。

之后就可以到 github 的发布页面上为新的标签编写 Changelog。
