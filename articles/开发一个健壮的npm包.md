# 开发一个健壮的npm包

项目地址：[loan-calculate-utils](https://www.npmjs.com/package/loan-calculate-utils)

npm包的发布、更新查看上一篇文章 [开发一个基础的npm包](https://www.cnblogs.com/whosmeya/p/12607533.html)

目前我们的目录是这个样子：

```txt
.
├── source  源代码目录
│   └── index.js
├── package.json
└── README.md
```

接下来给项目配置 打包，忽视文件，ts声明文件，单元测试，eslint，README。

## 打包

参考 [ramda](https://www.npmjs.com/package/ramda) 打包思路，我们将要编译成三种包，以及它们的压缩版。

### 打包目标

1. umi：  babel source -> src
2. iife： webpack 立即调用的函数包，用于浏览器
3. cjs：  webpack CommonJS包，用于modejs

### 配置 Babel，编译 umi

安装babel相关依赖

```shell
npm install --save-dev @babel/cli @babel/core @babel/preset-env
```

新建 <code>.babelrc.json</code> 文件

```json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": []
}
```

修改 <code>package.json</code>

```diff
"scripts": {
+ "build:cjs": "babel source --out-dir src"
},
```

### 配置 webpack，编译 iife，cjs

安装webpack相关依赖

```shell
npm install --save-dev webpack webpack-cli babel-loader cross-env
```

新建 <code>webpack.config.js</code>

```js
const path = require('path');
const isMin = !!~process.env.NODE_ENV.indexOf('min');
const type = process.env.NODE_ENV.replace(/:.*/g, '');
const libraryTarget = type === 'iife' ? 'window' : type;

const config = {
  mode: isMin ? 'production' : 'development',
  entry: './source/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `index.${type}${isMin ? '.min' : ''}.js`,
    library: 'loanCalculateUtils',  // 整个库对外暴露的变量名
    libraryTarget,  // 变量名添加到哪个上 browser
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  plugins: [],
};

module.exports = config;
```

添加运行命令，修改 <code>package.json</code>

```diff
"scripts": {
  "build:cjs": "babel source --out-dir src",
+ "build:umd": "cross-env NODE_ENV=umd webpack",
+ "build:umd:min": "cross-env NODE_ENV=umd:min webpack",
+ "build:iife": "cross-env NODE_ENV=iife webpack",
+ "build:iife:min": "cross-env NODE_ENV=iife:min webpack",
  # 整合打包命令
+ "build": "npm run build:cjs && npm run build:umd && npm run build:umd:min && npm run build:iife && npm run build:iife:min"
},
```

## 添加 忽视文件

### .gitignore

打包文件不需要上传GitHub

新建文件 <code>.gitignore</code>

```txt
node_modules
package-lock.json

# umi打包目录
/dist

# mjs打包目录
/src
```

### .npmignore

忽略npm无关文件

新建文件 <code>.npmignore</code>

```txt
node_modules
package-lock.json

# 源文件目录
source

# 测试文件目录
test

# 忽视文件
.gitignore
.npmignore

# babel配置文件
.babelrc.json

# eslint配置文件
.eslintrc.js

# webpack配置文件
webpack.config.js
```

## 添加 TypeScript 声明文件

[TypeScript](https://www.typescriptlang.org/index.html)

发布声明文件到npm，有两种方式：

1. 与你的npm包捆绑在一起，或
2. 发布到npm上的@types organization。

下面我们来使用第一种方式。

新建 <code>types/index.d.ts</code>

```ts
/**
 * Average Capital Plus Interest（等额本息）
 */
export function calcAverageCapitalPlusInterest({ amount, term, rate }: {
  amount: number;  // 贷款金额
  term: number;    // 贷款期数（月数）
  rate: number;    // 年利率
}): {
  totalPayment: string;       // 总还款
  totalInterest: string;      // 总利息
  list: {
    period: number;           // 第几期
    monthlyPayment: string;   // 月供
    beginningBalance: string; // 当月还款前剩余本金
    interest: string;         // 月供利息
    principal: string;        // 月供本金
    endingBalance: string;    // 当月还款后剩余本金
  }[]
};
```

修改 <code>package.json</code>, 设置 types属性指向捆绑在一起的声明文件。[Including declarations in your npm package](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#including-declarations-in-your-npm-package)

```json
"types": "types/index.d.ts",
```

发布后使用时效果：

<img style="width: 500px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200331122800463-142641260.png" />

## 添加单元测试 jest

[jest](https://jestjs.io/) 是facebook推出的一款测试框架。运行命令 jest 后会自动运行项目下所有.test.js和.spec.js这种格式的文件。

install

```shell
npm install --save-dev jest
```

加入测试命令，修改 <code>package.json</code>

```diff
"scripts": {
  ···
+ "test": "jest"
},
```

新建 <code>test/index.test.js</code>

```js
import { calcAverageCapitalPlusInterest, calcAverageCapital } from '../source/index';

test('average capital plus interest term: 1', () => {
  expect(calcAverageCapitalPlusInterest({
    amount: 1000000,
    term: 1,
    rate: 4.9,
  })).toStrictEqual({
    totalPayment: "1004083.33",
    totalInterest: "4083.33",
    list: [
      {
        period: 1,
        monthlyPayment: "1004083.33",
        beginningBalance: "1000000.00",
        interest: "4083.33",
        principal: "1000000.00",
        endingBalance: "0.00",
      }
    ]
  });
});
```

运行 <code>npm run test</code>

<img style="width: 600px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200331114909691-1691733958.png" />

## 添加 ESLint

你可以使用 npm 安装 ESLint：

```shell
npm install eslint --save-dev
```

紧接着你应该设置一个配置文件：

```shell
./node_modules/.bin/eslint --init
```

会生成一个 <code>.eslintrc</code> 配置文件，配置查看文档 [Configuring ESLint
](https://cn.eslint.org/docs/user-guide/configuring)

之后，你可以在任何文件或目录上运行ESLint如下：

```shell
./node_modules/.bin/eslint yourfile.js
```

加入检查命令，修改 <code>package.json</code>

```diff
"scripts": {
  ···
+ "lint": "eslint source/*"
},
```

执行 <code>npm run lint</code>

<img style="width: 600px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200331160346244-1311642854.png" />

* extends 使用的规则
* parserOptions.sourceType = "module" 使用模块
* rules 看不惯哪些规则可以关了

## README

### 徽标

GitHub徽标官网是 [shields.io](https://shields.io/)

可以使用 <>

https://zhuanlan.zhihu.com/p/85370228

## 完善 package.json 基本信息

```diff
# 项目名称
"name": "loan-calculate-utils",
# 作者
"author": "whosmeya",
# 版本号
"version": "1.1.2",
# 项目表述
"description": "loan calculate utils",
# 项目入口文件（node_modules中引入的入口文件）
"main": "src/index.js",
# TypeScript 生命文件入口（编辑器中会看到方法提示）
"types": "types/index.d.ts",
# 代码仓库
"repository": {
  "type": "git",
  "url": "git+https://github.com/whosmeya/loan-calculate-utils.git"
},
# issues地址
"bugs": {
  "url": "https://github.com/whosmeya/loan-calculate-utils/issues"
},
# 主页地址
"homepage": "https://github.com/whosmeya/loan-calculate-utils#readme",
# 开源许可证（更多查看：https://www.cnblogs.com/whosmeya/p/12564815.html）
"license": "MIT",
# 运行脚本
"scripts": {},
# 依赖（作为npm包被install时，依赖会被下载进node_modules）
"dependencies": {},
# 开发依赖（作为npm包被install时，开发依赖不会被下载进node_modules）
"devDependencies": {},
```
