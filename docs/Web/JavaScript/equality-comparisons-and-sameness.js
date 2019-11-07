/**
 * JavaScript 中的相等性判断
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness
 */

/**
 * ES2015中有四种相等算法：
 */
// 非严格相等比较(==)
// 严格相等比较 (===): 用于  Array.prototype.indexOf, Array.prototype.lastIndexOf, 和 case-matching
// 同值零: 用于 %TypedArray% 和 ArrayBuffer 构造函数、以及Map和Set操作, 并将用于 ES2016/ES7 中的String.prototype.includes
// 同值: 用于所有其他地方



/**
 * JavaScript提供三种不同的值比较操作：
 */
// 严格相等 ("triple equals" 或 "identity")，使用 === ,
// 宽松相等 ("double equals") ，使用 ==
// 以及 Object.is （ECMAScript 2015/ ES6 新特性）


// 简而言之，在比较两件事情时，
// 双等号将执行类型转换; 
// 三等号将进行相同的比较，而不进行类型转换 (如果类型不同, 只是总会返回 false ); 
// 而Object.is的行为方式与三等号相同，但是对于NaN和-0和+0进行特殊处理，所以最后两个不相同，而Object.is（NaN，NaN）将为 true。




/**
 * 严格相等 ===
 * 全等操作符比较两个值是否相等，两个被比较的值在比较前都不进行隐式转换。
 * 如果两个被比较的值具有不同的类型，这两个值是不全等的。
 * 否则，如果两个被比较的值类型相同，值也相同，并且都不是 number 类型时，两个值全等。
 * 最后，如果两个值都是 number 类型，当两个都不是 NaN，并且数值相同，或是两个值分别为 +0 和 -0 时，两个值被认为是全等的。
 */

// 两个特殊情况：
// 浮点数 0 是不分正负的。
// NaN



/**
 * 非严格相等 ==
 * 相等操作符比较两个值是否相等，在比较前将两个被比较的值转换为相同类型。
 * 在转换后（等式的一边或两边都可能被转换），最终的比较方式等同于全等操作符 === 的比较方式。
 * 相等操作符满足交换律。
 */

/**
                                                B
                Undefined   Null    Number                 String                         Boolean                          Object
    Undefined   true        true    false                  false                          false                            IsFalsy(B)
A   Null        true        true    false                  false                          false                            IsFalsy(B)
    Number      false       false   A === B                A === ToNumber(B)              A === ToNumber(B)                A == ToPrimitive(B)
    String      false       false   ToNumber(A) === B      A === B                        ToNumber(A) === ToNumber(B)      ToPrimitive(B) == A
    Boolean     false       false   ToNumber(A) === B      ToNumber(A) === ToNumber(B)    A === B                          ToNumber(A) == ToPrimitive(B)
    Object      false       false   ToPrimitive(A) == B    ToPrimitive(A) == B            ToPrimitive(A) == ToNumber(B)    A === B
 */
// ToNumber(A) 尝试在比较前将参数 A 转换为数字，这与 +A（单目运算符+）的效果相同。
// ToPrimitive(A)通过尝试调用 A 的A.toString() 和 A.valueOf() 方法，将参数 A 转换为原始值（Primitive）。





// 一般而言，根据 ECMAScript 规范，所有的对象都与 undefined 和 null 不相等。
// 但是大部分浏览器允许非常窄的一类对象（即，所有页面中的 document.all 对象），在某些情况下，充当效仿 undefined 的角色。
// 相等操作符就是在这样的一个背景下。因此，IsFalsy(A) 方法的值为 true ，当且仅当 A 效仿 undefined。
// 在其他所有情况下，一个对象都不会等于 undefined 或 null。

var num = 0;
var obj = new String("0");
var str = "0";
var b = false;

console.log(num == num); // true
console.log(obj == obj); // true
console.log(str == str); // true

console.log(num == obj); // true
console.log(num == str); // true
console.log(obj == str); // true
console.log(null == undefined); // true

// both false, except in rare cases
console.log(obj == null);
console.log(obj == undefined);

console.log(document.all == undefined);  // true



/**
 * 同值相等
 */
// 同值相等解决了最后一个用例：确定两个值是否在任何情况下功能上是相同的。
// （这个用例演示了里氏替换原则的实例。）
// 当试图对不可变（immutable）属性修改时发生出现的情况：

// 向 Nmuber 构造函数添加一个不可变的属性 NEGATIVE_ZERO
Object.defineProperty(Number, "NEGATIVE_ZERO",
  { value: -0, writable: false, configurable: false, enumerable: false });

function attemptMutation(v) {
  Object.defineProperty(Number, "NEGATIVE_ZERO", { value: v });
}

// 同值相等由 Object.is 方法提供。



/**
 * 零值相等
 * 与同值相等类似，不过会认为 +0 与 -0 相等。
 */




/**
 * Object.is
 * Object.is(NaN, NaN)  // true
 * Object.is(+0, -0)    // false
 */






/**
x                    y                    ==     ===    Object.is
undefined            undefined            true   true   true
null                 null                 true   true   true
true                 true                 true   true   true
false                false                true   true   true
"foo"                "foo"                true   true   true
0                    0                    true   true   true
+0                   -0                   true   true   false
0                    false                true   false  false
""                   false                true   false  false
""                   0                    true   false  false
"0"                  0                    true   false  false
"17"                 17                   true   false  false
[1,2]                "1,2"                true   false  false
new String("foo")    "foo"                true   false  false
null                 undefined            true   false  false
null                 false                false  false  false
undefined            false                false  false  false
{ foo: "bar" }       { foo: "bar" }       false  false  false
new String("foo")    new String("foo")    false  false  false
0                    null                 false  false  false
0                    NaN                  false  false  false
"foo"                NaN                  false  false  false
NaN                  NaN                  false  false  true
 */

