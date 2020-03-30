# 前端模块化:AMD,CMD,CommonJS,ES6Module

## AMD

AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。

AMD 推崇依赖前置。

```js
define(['./a', './b'], function (a, b) { // 依赖必须一开始就写好
  a.doSomething()
  // 此处略去 100 行
  b.doSomething()
  // ...
})
```

## CMD

CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。

CMD 推崇依赖就近。

```js
define(function (require, exports, module) {
  var a = require('./a')
  a.doSomething()
  // 此处略去 100 行
  var b = require('./b') // 依赖可以就近书写
  b.doSomething()
  // ...
})
```

## CommonJS

为服务器提供的一种模块形式的优化。

Node 应用由模块组成，采用 CommonJS 模块规范。

```js
// 暴露模块
module.exports = {
  plus,
  minus,
}
// 或使用exports, 相当于var exports = module.exports;
// 注意：不能直接给exports赋值；如果给module.exports赋值后，exports也会失效。
exports.plus = plus;
exports.minus = minus;

// 引用模块
var a = require('./a');
```

## ES6 Module

ES6 在语言标准的层面上，实现了模块功能。

```js
// 暴露模块
export var a = 1;
export var b = 2;
// or
export { a, b };
// or
export default { a, b }

// 引用模块
import { a, b } from './a';
```

**参考**

* [AMD 和 CMD 的区别有哪些？(玉伯)](https://www.zhihu.com/question/20351507/answer/14859415)
* [CommonJS规范(阮一峰)](https://javascript.ruanyifeng.com/nodejs/module.html)
* [ES6 Module(阮一峰)](https://es6.ruanyifeng.com/#docs/module)
