# 为什么 slice 方法可以转换伪数组

我们经常会看到这样的代码：

```js
function fn(a, b, c) {
  console.log(Array.prototype.slice.call(arguments)) // [1, 2, 3]
}
fn(1, 2, 3)
```

或者面试题中也能看到这样：

```js
var obj = {
  '0': 1,
  '1': 2,
  '2': 3,
  'length', 3
}
Array.prototype.slice.call(obj) // [1, 2, 3]
```

这是为什么呢？

## ECMAScript Array.prototype.slice 规范

为了快速找到答案，我们直接查看 ECMAScript 规范。

![](http://storage.icyc.cc/p/20220210/rc-upload-1644473581897-2.png)

文档可以看出：取数组长度，然后循环截取的地方，生成新数组并返回。

第一步用 ToObject 方法处理了原数据，所以一起看看这个方法：

![](http://storage.icyc.cc/p/20220210/rc-upload-1644474257654-2.png)

如果不是 Object 类型，会用自己类型的构造函数处理。

## 尝试其他数据类型

```javascript
// 对象
var o = { '0': 1, '1': 2, '2': 3, length: 3 }
Array.prototype.slice.call(o)  // [1, 2, 3]

// 函数（函数的 length 是 arguments 个数）
var fn = function (a, b, c) {}
fn['0'] = 1
fn['1'] = 2
fn['2'] = 3
Array.prototype.slice.call(fn)  // [1, 2, 3]

// 字符串
Array.prototype.slice.call('123')  // [1, 2, 3]
// 等价于，new String('123') 会返回 { '0': 1, '1': 2, '2': 3, length: 3 }
Array.prototype.slice.call(new String('123'))  // [1, 2, 3]


// Number BigInt Boolean Symbol
Array.prototype.slice.call(123)  // []
Array.prototype.slice.call(BigInt(123))  // []
Array.prototype.slice.call(true)  // []
Array.prototype.slice.call(Symble())  // []

// undefined null
Array.prototype.slice.call(undefined)  // Uncaught TypeError
Array.prototype.slice.call(null)  // Uncaught TypeError
```

## 总结

* Object : 按照 length 截取，按照下标取值
* String : 等价于 split('')
* Undefined Null : 报错
* Number BigInt Boolean Symble : [] 
