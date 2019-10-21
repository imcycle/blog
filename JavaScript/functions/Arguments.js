/**
 * arguments
 * arguments 是一个对应于传递给函数的参数的类数组对象。
 */

/**
 * 描述
 */
// arguments对象是所有（非箭头）函数中都可用的局部变量。
// 你可以使用arguments对象在函数中引用函数的参数。
// 此对象包含传递给函数的每个参数，第一个参数在索引0处。
// 例如，如果一个函数传递了三个参数，你可以以如下方式引用他们：
arguments[0]
arguments[1]
arguments[2]
// 参数也可以被设置：
arguments[1] = 'new value';

// arguments对象不是一个 Array 。
// 它类似于Array，但除了length属性和索引元素之外没有任何Array属性。
// 例如，它没有 pop 方法。但是它可以被转换为一个真正的Array：
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);
// ES2015
const args = Array.from(arguments);
const args = [...arguments];


/**
 * 属性
 */
arguments.callee
// 指向当前执行的函数。
// callee 是 arguments 对象的一个属性。它可以用于引用该函数的函数体内当前正在执行的函数。这在函数的名称是未知时很有用，例如在没有名称的函数表达式(也称为“匿名函数”)内。

arguments.length
// 指向传递给当前函数的参数数量。

// arguments[@@iterator]
// 返回一个新的Array迭代器对象，该对象包含参数中每个索引的值。



var i = 0;
(function () {
  if (i < 5) {
    console.log(i);
    i++;
    arguments.callee();
  }
})()