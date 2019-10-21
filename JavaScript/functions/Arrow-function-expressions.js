/**
 * Arrow function expressions
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 * 箭头函数表达式的语法比函数表达式更简洁，并且没有自己的this，arguments，super或 new.target。
 * 这些函数表达式更适用于那些本来需要匿名函数的地方，并且它们不能用作构造函数。
 */

/**
 * 箭头函数和普通function的区别
 * 1: 语法
   2: this
   3: arguments
   4: super或 new.target
 */




/**
 * 通过 call 或 apply 调用
 * 由于 箭头函数没有自己的this指针，通过 call() 或 apply() 方法调用一个函数时，只能传递参数（不能绑定this），他们的第一个参数会被忽略。（这种现象对于bind方法同样成立）
 */
var adder = {
  base: 1,

  add: function (a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function (a) {
    var f = v => v + this.base;
    var b = {
      base: 2
    };

    return f.call(b, a);
  }
};

console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3 ——译者注）




/**
 * 不绑定this
 * 不绑定arguments
 * 箭头函数不能用作构造器，和 new一起用会抛出错误。
 * 箭头函数没有prototype属性。
 *  yield 关键字通常不能在箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数不能用作生成器。
 */

