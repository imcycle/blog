// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions
/**
 * Function
 * 调用函数时，传递给函数的值被称为函数的实参（值传递），对应位置的函数参数名叫作形参。
 */
// 传递给函数的参数的名称，一个函数最多可以有255个参数.

// 函数声明(函数语句)
// function name([param[, param[, ...param]]]) { statements }

// 函数表达式(function expression)
// var myFunction = function name([param[, param[, ... param]]]) { statements }

// 函数生成器声明 (function* 语句)
// function* name([param[, param[, ...param]]]) { statements }

// 函数生成器表达式 (function*表达式)
// function* [name]([param] [, param] [..., param]) { statements }

// 箭头函数表达式 (=>)
// ([param] [, param]) => { statements } param => expression

// Function构造函数
// new Function (arg1, arg2, ... argN, functionBody)

// 生成器函数的构造函数
// new GeneratorFunction (arg1, arg2, ... argN, functionBody)


/**
 * 方法函数定义
 */
// 1. Getter 和 setter 函数
const obj = {
  log: ['example', 'test'],
  get latest() {
    if (this.log.length === 0) return undefined;
    return this.log[this.log.length - 1];
  }
}
console.log(obj.latest); // "test".

var language = {
  set current(name) {
    this.log.push(name);
  },
  log: []
}

language.current = 'EN';
language.current = 'FA';

console.log(language.log);
// expected output: Array ["EN", "FA"]

// 2. 方法定义语法
// 从ECMAScript 6开始, 你可以用更短的语法定义自己的方法，类似于getters和setters。
var obj = {
  foo() { },
  bar() { }
};






/**
 * 默认参数
 * 函数默认参数允许在没有值或undefined被传入时使用默认形参。
 */

// 语法
// function [name]([param1[ = defaultValue1][, ..., paramN[ = defaultValueN]]]) {
//   statements
// }

function test(x = 1) {
  return x;
}
test();           // 1
test(undefined);  // 1



/**
 * 剩余参数
 * 剩余参数语法允许我们将一个不定数量的参数表示为一个数组。
 */

// 语法
// function f(a, b, ...theArgs) {
//   // ...
// }

// 解构剩余参数
// function f(...[a, b, c]) {
//   return a + b + c;
// }




/**
 * 剩余参数和 arguments对象的区别
 */

// 剩余参数和 arguments对象之间的区别主要有三个：

// 剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。
// arguments对象不是一个真正的数组，而剩余参数是真正的 Array实例，也就是说你能够在它上面直接使用所有的数组方法，比如 sort，map，forEach或pop。
// arguments对象还有一些附加的属性 （如callee属性）。


/**
 * 检测函数是否存在
 */
typeof foo === 'function'