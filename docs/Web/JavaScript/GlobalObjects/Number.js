
/**
 * 文档
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number
 */


// JavaScript 的 Number 对象是经过封装的能让你处理数字值的对象。Number 对象由 Number() 构造器创建。

// JavaScript的Number类型为IEEE 754 64位浮点类型。

// 最近出了stage3BigInt 任意精度数字类型，已经进入stage3规范


/**
* 属性  9
*/
Number.EPSILON
// 两个可表示(representable)数之间的最小间隔。
Number.MAX_SAFE_INTEGER
// JavaScript 中最大的安全整数(2^53 - 1) 。
Number.MAX_VALUE
// 能表示的最大正数。最小的负数是 - MAX_VALUE。
Number.MIN_SAFE_INTEGER
// JavaScript 中最小的安全整数(-(2^53 - 1)).
Number.MIN_VALUE
// 能表示的最小正数即最接近 0 的正数(实际上不会变成 0) 。最大的负数是 - MIN_VALUE。
Number.NaN
// 特殊的“非数字”值。
Number.NEGATIVE_INFINITY
// 特殊的负无穷大值，在溢出时返回该值。
Number.POSITIVE_INFINITY
// 特殊的正无穷大值，在溢出时返回该值。
Number.prototype
// Number 对象上允许的额外属性。


/**
* 方法   7
*/

Number.isNaN()
// 确定传递的值是否是 NaN。
Number.isFinite()
// 确定传递的值类型及本身是否是有限数。
Number.isInteger()
// 确定传递的值类型是“number”，且是整数。
Number.isSafeInteger()
// 确定传递的值是否为安全整数(-(253 - 1) 至 253 - 1之间) 。
Number.toInteger()
// 计算传递的值并将其转换为整数(或无穷大) 。
Number.parseFloat()
// 和全局对象 parseFloat() 一样。
Number.parseInt()
// 和全局对象 parseInt() 一样。


/**
* Number 实例  7
* 所有 Number 实例都继承自 Number.prototype。被修改的 Number 构造器的原型对象对全部 Number 实例都生效。
*/

Number.prototype.toExponential()
// Returns a string representing the number in exponential notation.
Number.prototype.toFixed()
// Returns a string representing the number in fixed - point notation.
Number.prototype.toPrecision()
// Returns a string representing the number to a specified precision in fixed - point or exponential notation.
Number.prototype.toLocaleString()
// Returns a string with a language sensitive representation of this number.Overrides the Object.prototype.toLocaleString() method.
Number.prototype.toString()
// Returns a string representing the specified object in the specified radix(base).Overrides the Object.prototype.toString() method.
Number.prototype.toSource()  // This API has not been standardized.
// Returns an object literal representing the specified Number object; you can use this value to create a new object.Overrides the Object.prototype.toSource() method.
Number.prototype.valueOf()
// Returns the primitive value of the specified object.Overrides the Object.prototype.valueOf() method.



// 转换数字字符串为数字
Number('123')     // 123
Number('12.3')    // 12.3
Number('12.00')   // 12
Number('123e-1')  // 12.3
Number('0x11')    // 17
Number('0b11')    // 3
Number('0o11')    // 9
Number('')        // 0
Number('foo')     // NaN
Number('100a')    // NaN
Number('-Infinity') //-Infinity
Number(null)      // 0
Number(undefined) // NaN
Number(false)     // 0
Number(true)      // 1
Number(NaN)       // NaN
Number([])        // 0
Number([1])       // 1
Number(['1'])     // 1
Number([1, ,])    // NaN
Number([1, 2])    // NaN
Number({})        // NaN
Number(new Set([1]))       // NaN
Number(new Map([[1, 2]]))  // NaN
Number(Symbol())  // Uncaught TypeError: Cannot convert a Symbol value to a number