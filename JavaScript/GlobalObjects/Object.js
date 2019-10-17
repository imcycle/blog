

/**
  * Object 构造函数创建一个对象包装器。
  * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object
  */

/**
* 属性
*/
Object.length
// 值为 1。
Object.prototype
// 可以为所有 Object 类型的对象添加属性。

/**
* 方法  20
*/
Object.assign()
// 通过复制一个或多个对象来创建一个新的对象。
Object.create()
// 使用指定的原型对象和属性创建一个新对象。
Object.is()
// 比较两个值是否相同。所有 NaN 值都相等（这与 == 和 === 不同）。

Object.setPrototypeOf()
// 设置对象的原型（即内部[[Prototype]] 属性）。
Object.getPrototypeOf()
// 返回指定对象的原型对象。

Object.defineProperty()
// 给对象添加一个属性并指定该属性的配置。
Object.defineProperties()
// 给对象添加多个属性并分别指定它们的配置。
Object.getOwnPropertyDescriptor()
// 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
Object.getOwnPropertyDescriptors()
// 方法用来获取一个对象的所有自身属性的描述符。
Object.getOwnPropertyNames()
// 返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。
Object.getOwnPropertySymbols()
// 返回一个数组，它包含了指定对象自身所有的符号属性。

Object.preventExtensions()
// 防止对象的任何扩展。
Object.isExtensible()
// 判断对象是否可扩展。
Object.seal()
// 方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。
Object.isSealed()
// 判断对象是否已经密封。
Object.freeze()
// 冻结对象：其他代码不能删除或更改任何属性。
Object.isFrozen()
// 判断对象是否已经冻结。

Object.keys()
// 返回一个包含所有给定对象自身可枚举属性名称的数组。
Object.values()
// 返回给定对象自身可枚举值的数组。
Object.entries()
// 返回给定对象自身可枚举属性的[key, value] 数组。





/**
* Object 实例和 Object 原型对象
*/

/** 属性 */
Object.prototype.constructor
// 特定的函数，用于创建一个对象的原型。
Object.prototype.__proto__
// 指向当对象被实例化的时候，用作原型的对象。
Object.prototype.__noSuchMethod__
// 当未定义的对象成员被调用作方法的时候，允许定义并执行的函数。


/** 方法 */
Object.prototype.__defineGetter__()
// 关联一个函数到一个属性。访问该函数时，执行该函数并返回其返回值。
Object.prototype.__defineSetter__()
// 关联一个函数到一个属性。设置该函数时，执行该修改属性的函数。
Object.prototype.__lookupGetter__()
// 返回使用 __defineGetter__ 定义的方法函数 。
Object.prototype.__lookupSetter__()
// 返回使用 __defineSetter__ 定义的方法函数。
Object.prototype.hasOwnProperty()
// 返回一个布尔值 ，表示某个对象是否含有指定的属性，而且此属性非原型链继承的。
Object.prototype.isPrototypeOf()
// 返回一个布尔值，表示指定的对象是否在本对象的原型链中。
Object.prototype.propertyIsEnumerable()
// 判断指定属性是否可枚举，内部属性设置参见 ECMAScript[[Enumerable]] attribute 。
Object.prototype.toSource()
// 返回字符串表示此对象的源代码形式，可以使用此字符串生成一个新的相同的对象。
Object.prototype.toLocaleString()
// 直接调用 toString()方法。
Object.prototype.toString()
// 返回对象的字符串表示。
Object.prototype.unwatch()
// 移除对象某个属性的监听。
Object.prototype.valueOf()
// 返回指定对象的原始值。
Object.prototype.watch()
// 给对象的某个属性增加监听。




// +0 === -0            // true
// Object.is(+0, -0)    // false
// Object.is(-0, 0)     // false
// Object.is(+0, 0)     // true
// Object.is(-0, -0)    // true
// Object.is(NaN, NaN)  // false



/**
  * 属性 getter 和 setter
  * 由 getter 和 setter 定义的属性 称作‘存取器属性’(accessor property)
  */
var o = {
  // 普通的数据属性
  data_prop: value,

  // 存取器属性都是成对定义的函数
  get accessor_prop() { },
  set accessor_prop() { }
}


/**
 * 属性的特征
 */
  // 数据属性特征
  // value
  // writable
  // enumerable
  // configurable

  // 存取器属性特征
  // get
  // set
  // enumerable
  // configurable

  // 属性描述符（property descriptor）




/**
 * Object.defineProperty()
 * 文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 *
 * Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
 *  Object.defineProperty(obj, prop, descriptor)
 *  参数
 *    obj 要在其上定义属性的对象。
 *    prop 要定义或修改的属性的名称。
 *    descriptor 将被定义或修改的属性描述符。
 *      configurable  默认为 false。
 *      enumerable    默认为 false
 *      value         默认为 undefined。
 *      writable      默认为 false。
 *      get           默认为 undefined。
 *      set           默认为 undefined。
 *  返回值
 *    被传递给函数的对象。
 */
