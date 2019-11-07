/**
* Array
* JavaScript的 Array 对象是用于构造数组的全局对象，数组是类似于列表的高阶对象。
* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
*/


/**
* 属性
*/
// Array.length
// get Array[@@species]
// Array.prototype  通过数组的原型对象可以为所有数组对象添加属性。


/**
* 方法
*/
Array.from()     // 从类数组对象或者可迭代对象中创建一个新的数组实例。 Array.from(arrayLike[, mapFn[, thisArg]])
Array.isArray()  // 用来判断某个变量是否是一个数组对象。
Array.of()       // 根据一组参数来创建新的数组实例，支持任意的参数数量和类型。  Array.of(element0[, element1[, ...[, elementN]]])

// 合并去重
// function aa() {
//   return [...[...arguments].flat()];
// }
// aa([1, 2], [2, 3])

// function aa() {
//   let arr = [...arguments].flat();
//   return Array.form(new Set(arr));
// }
// aa([1, 2], [2, 3])


/**
* 修改器方法  9
* 下面的这些方法会改变调用它们的对象自身的值
*/
Array.prototype.copyWithin()  // 实验性API
// 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。  arr.copyWithin(target[, start[, end]])
Array.prototype.fill()  // 实验性API
// 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。  arr.fill(value[, start[, end]])
Array.prototype.pop()
// 删除数组的最后一个元素，并返回这个元素。
Array.prototype.push()
// 在数组的末尾增加一个或多个元素，并返回数组的新长度。
Array.prototype.shift()
// 删除数组的第一个元素，并返回这个元素。
Array.prototype.unshift()
// 在数组的开头增加一个或多个元素，并返回数组的新长度。
Array.prototype.splice()
// 在任意的位置给数组添加或删除任意个元素。
Array.prototype.reverse()
// 颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。
Array.prototype.sort()
// 对数组元素进行排序，并返回当前数组。


/**
* 访问方法  10
* 下面的这些方法绝对不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值。
*/
Array.prototype.flat()
// 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
Array.prototype.flatMap()
// 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 和 深度值1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。
Array.prototype.concat()
// 返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。
Array.prototype.slice()
// 抽取当前数组中的一段元素组合成一个新数组。
Array.prototype.join()
// 连接所有数组元素组成一个字符串。
Array.prototype.toString()
// 返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。
Array.prototype.toLocaleString()
// 返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 Object.prototype.toLocaleString() 方法。
Array.prototype.indexOf()
// 返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 - 1。
Array.prototype.lastIndexOf()
// 返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 - 1。
Array.prototype.includes()  // 实验性API
// 判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。
Array.prototype.toSource()  // This API has not been standardized.
// 返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 Object.prototype.toSource() 方法。


/**
* 迭代方法  12
* 在每一个数组元素都分别执行完回调函数之前，数组的length属性会被缓存在某个地方
*/
Array.prototype.forEach()
// 为数组中的每个元素执行一次回调函数。
Array.prototype.map()
// 返回一个由回调函数的返回值组成的新数组。
Array.prototype.filter()
// 将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。
Array.prototype.every()
// 如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。
Array.prototype.some()
// 如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。
Array.prototype.reduce()
// 从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
Array.prototype.reduceRight()
// 从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

Array.prototype.find()  // 实验性API
// 找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。
Array.prototype.findIndex()  // 实验性API
// 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 - 1。
Array.prototype.entries()  // 实验性API
// 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。
Array.prototype.keys()  // 实验性API
// 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。
Array.prototype.values()  // 实验性API
// 返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。
// Array.prototype[@@iterator]()  // 实验性API
// 和上面的 values() 方法是同一个函数。




// var arr = [
//   { id: 1, value: 'a' },
//   { id: 2, value: 'b' },
//   { id: 3, value: 'c' },
//   { id: 4, value: 'd' },
//   { id: 5, value: 'e' },
//   { id: 6, value: 'e' },
//   { id: 7, value: 'f' },
// ]

// // 1： 删除value为e的 
// arr = arr.filter(d => d.value !== 'e');

// // 2： 删除第一个value为e的
// let index = arr.findIndex(d => d.value === 'e');
// arr.splice(index, 1)
// // 3： 删除最后一个value为e的
// let index = arr.reverse().findIndex(d => d.value === 'e');
// arr.splice(index, 1);
// arr.reverse();
// // 4： 找出所有value为e的
// let newArr = arr.filter(d => d.value === 'e');
// // 5： 找出第一个value为e的
// let newArr = arr.find(d => d.value === 'e');
// // 6： 找出最后一个value为e的
// let newArr = arr.reverse().find(d => d.value === 'e').reverse();





/**
 * 检测数组
 */
// ECMAScript 3
if (value instanceof Array) {
  //对数组执行某些操作
}
// instanceof 操作符的问题在于，它假定只有一个全局执行环境。如果网页中包含多个框架，那实
// 际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的 Array 构造函数。如果你从
// 一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自
// 不同的构造函数。

// ECMAScript 5
if (Array.isArray(value)) {
  //对数组执行某些操作
}


/**
 * 归并方法  reduce()和 reduceRight()
 */
// 这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。
// 两个参数：在每一项上调用的函数 和（可选的）作为归并基础的初始值
// reduce()方法从数组的第一项开始，逐个遍历到最后。
// reduceRight()则从数组的最后一项开始，向前遍历到第一项。
// 支持这两个归并函数的浏览器有 IE9 +、Firefox 3 +、Safari 4 +、Opera 10.5 和 Chrome。

// var values = [1, 2, 3, 4, 5];
// var sum = values.reduce(function (prev, cur, index, array) {
//   return prev + cur;
// });
// alert(sum); //15 