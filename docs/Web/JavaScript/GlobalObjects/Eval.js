/**
 * eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval
 * 缺点：
 * eval() 是一个危险的函数， 它使用与调用者相同的权限执行代码。 容易被攻击
 * eval() 通常比其他替代方法更慢，因为它必须调用 JS 解释器，而许多其他结构则可被现代 JS 引擎进行优化。
 */

console.log(eval('2 + 2'));
// expected output: 4

console.log(eval(new String('2 + 2')));
// expected output: 2 + 2

console.log(eval('2 + 2') === eval('4'));
// expected output: true

console.log(eval('2 + 2') === eval(new String('2 + 2')));
// expected output: false

eval(new String("2 + 2")); // 返回了包含"2 + 2"的字符串对象
eval("2 + 2");             // returns 4

function test() {
  var x = 2, y = 4;
  console.log(eval('x + y'));  // 直接调用，使用本地作用域，结果是 6
  var geval = eval; // 等价于在全局作用域调用
  console.log(geval('x + y')); // 间接调用，使用全局作用域，throws ReferenceError 因为`x`未定义
  (0, eval)('x + y'); // 另一个间接调用的例子
}



