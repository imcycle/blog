[备注]:
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array

## Array
Array 对象是用于构造数组的全局对象

<br /> 

---

### 属性

__Array.length__<br/>
Array 构造函数的 length 属性，其值为1（注意该属性为静态属性，不是数组实例的 length 属性）。

__get Array[@@species]__<br/>
返回 Array 构造函数。

__Array.prototype__<br/>
通过数组的原型对象可以为所有数组对象添加属性。

### 方法
Array.from()
从类数组对象或者可迭代对象中创建一个新的数组实例。
Array.isArray()
用来判断某个变量是否是一个数组对象。
Array.of()
根据一组参数来创建新的数组实例，支持任意的参数数量和类型。

<br />

---

### Array.prototype
所有数组实例都会从 Array.prototype 继承属性和方法。修改 Array 的原型会影响到所有的数组实例。

__constructor__<br />
__length__<br />


#### 修改器方法

__copyWithin(target: number, start: number, end?: number): this;__<br/>
浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。<br/>
__fill(value: T, start?: number, end?: number): this;__<br/>
用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。<br/>
__pop(): T | undefined;__<br/>
后删，返回被删元素。<br/>
__push(...items: T[]): number;__<br/>
后加，返回length。<br/>
__shift(): T | undefined;__<br/>
前删，返回被删元素。<br/>
__unshift(...items: T[]): number;__<br/>
前加，返回length。<br/>
__splice(start: number, deleteCount?: number): T[];__<br/>
在任意的位置给数组添加或删除任意个元素。<br/>
__reverse(): T[];__<br/>
反转。<br/>
__sort(compareFn?: (a: T, b: T) => number): this;__<br/>
排序。<br/>

<br />

#### 访问方法

__flat()__<br />
方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

__flatMap()__<br/>
方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 和 深度值1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。

__concat(...items: ConcatArray<T>[]): T[];__<br/>
返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。

__slice(start?: number, end?: number): T[];__<br/>
抽取当前数组中的一段元素组合成一个新数组。

__join(separator?: string): string;__<br/>
连接所有数组元素组成一个字符串。

__toString(): string;__<br/>
返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。

__toLocaleString(): string;__<br/>
返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 Object.prototype.toLocaleString() 方法。

__indexOf(searchElement: T, fromIndex?: number): number;__<br/>
返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 - 1。

__lastIndexOf(searchElement: T, fromIndex?: number): number;__<br/>
返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 - 1。

__includes(searchElement: T, fromIndex?: number): boolean;__<br/>
判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。

__toSource()__<br/>standardized.  
返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 Object.prototype.toSource() 方法。


<br />

#### 迭代方法

```
forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
```
为数组中的每个元素执行一次回调函数。

```
map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
```
返回一个由回调函数的返回值组成的新数组。

```
filter<S extends T>(callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
```
将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。

```every(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
```
如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。

```
some(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
```
如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。

```
reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
```
从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

```
reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
```
从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。

```
find<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined;
find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;
```
找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。

```
findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;
```
找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 - 1。

```
entries(): IterableIterator<[number, T]>;
```
返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。

```
keys(): IterableIterator<number>;
```
返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。

```
values(): IterableIterator<T>;
```
返回一个数组迭代器对象，该迭代器会包含所有数组元素的值。
