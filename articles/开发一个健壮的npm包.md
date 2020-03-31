# 开发一个健壮的npm包

[loan-calculate-utils](https://www.npmjs.com/package/loan-calculate-utils)

npm包的发布、更新查看上一篇文章 [开发一个基础的npm包](https://www.cnblogs.com/whosmeya/p/12607533.html)

## 打包

原始目录

```txt
.
├── source  源代码目录
│   └── index.js
├── package.json
└── README.md
```

### 打包目标

1. umi： source 使用babel打包到 src
2. iife： 立即调用的函数包，用于浏览器，webpack打包
3. cjs： CommonJS包，用于modejs，webpack打包

### 配置 Babel

### 配置 webpack

### 配置 package.json

## 添加 TypeScript 声明文件

[TypeScript](https://www.typescriptlang.org/index.html)

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

修改 <code>package.json</code>

```json
"scripts": {
  "test": "jest"
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

配置package.json

```json
"scripts": {
  "lint": "eslint source/*"
},
```

执行 <code>npm run lint</code>

<img style="width: 600px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200331160346244-1311642854.png" />

* extends 使用的规则
* parserOptions.sourceType = "module" 使用模块
* rules 看不惯哪些规则可以关了
