[备注]:
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array

## Array

<br /> 

---

### 属性

__Array.length__<br/>
Array 构造函数的 length 属性，其值为1（注意该属性为静态属性，不是数组实例的 length 属性）。



get Array[@@species]

返回 Array 构造函数。


__Array.prototype__<br/>
通过数组的原型对象可以为所有数组对象添加属性。


<br />

---


#### 修改器方法

__Array.prototype.copyWithin()__<br/>
浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。  arr.copyWithin(target[, start[, end]])

__Array.prototype.fill()__<br/>
用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。  arr.fill(value[, start[, end]])

__Array.prototype.pop()__<br/>
删除数组的最后一个元素，并返回这个元素。

__Array.prototype.push()__<br/>
在数组的末尾增加一个或多个元素，并返回数组的新长度。

__Array.prototype.shift()__<br/>
删除数组的第一个元素，并返回这个元素。

__Array.prototype.unshift()__<br/>
在数组的开头增加一个或多个元素，并返回数组的新长度。

__Array.prototype.splice()__<br/>
在任意的位置给数组添加或删除任意个元素。

__Array.prototype.reverse()__<br/>
颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。

__Array.prototype.sort()__<br/>
对数组元素进行排序，并返回当前数组。

<br />

#### 访问方法

__Array.prototype.flat()__<br />
方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

__Array.prototype.flatMap()__<br/>
方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 和 深度值1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。

__Array.prototype.concat()__<br/>
返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。

__Array.prototype.slice()__<br/>
抽取当前数组中的一段元素组合成一个新数组。

__Array.prototype.join()__<br/>
连接所有数组元素组成一个字符串。

__Array.prototype.toString()__<br/>
返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。

__Array.prototype.toLocaleString()__<br/>
返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 Object.prototype.toLocaleString() 方法。

__Array.prototype.indexOf()__<br/>
返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 - 1。

__Array.prototype.lastIndexOf()__<br/>
返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 - 1。

__Array.prototype.includes()__<br/>
判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。

__Array.prototype.toSource()__<br/>standardized.  
返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 Object.prototype.toSource() 方法。


<br />

#### 迭代方法

__Array.prototype.forEach()__<br/>
为数组中的每个元素执行一次回调函数。

__Array.prototype.map()__<br/>
返回一个由回调函数的返回值组成的新数组。

__Array.prototype.filter()__<br/>
将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。

__Array.prototype.every()__<br/>
如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。

__Array.prototype.some()__<br/>
如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。

__Array.prototype.reduce()__<br/>
从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

__Array.prototype.reduceRight()__<br/>
从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

__Array.prototype.find()__<br/>
找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。

__Array.prototype.findIndex()__<br/>
找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 - 1。

__Array.prototype.entries()__<br/>
返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。

__Array.prototype.keys()__<br/>
返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。

__Array.prototype.values()__<br/>
返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。
