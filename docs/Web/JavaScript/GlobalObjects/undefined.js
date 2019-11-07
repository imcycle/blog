/**
 * undefined
 * 全局属性undefined表示原始值undefined。它是一个JavaScript的 原始数据类型 。
 * undefined是全局对象的一个属性。也就是说，它是全局作用域的一个变量。undefined的最初值就是原始数据类型undefined。
 * 
 * A variable that has not been assigned a value is of type undefined. 
 * A method or statement also returns undefined if the variable that is being evaluated does not have an assigned value. 
 * A function returns undefined if a value was not returned.
 */

// 判断是否为undefined （三种）

x === undefined

typeof x === 'undefined' // x不声明也不报错

x === void 0