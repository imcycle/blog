# es6 class 内函数的编译

编译前：

```js
class A {
  constructor() {
    this.a = () => {
      console.log(this)
    }
    this.b = function() {
      console.log(this)
    }
  }

  static c = () => {
    console.log(this)
  }

  static d() {
    console.log(this)
  }

  e = () => {
    console.log(this)
  }

  f() {
    console.log(this)
  }
}
```

编译后（babel 编译，按照编译结果整理如下）：

```js
function A() {
  const _this = this

  this.a = function() {
    console.log(_this)
  }

  this.b = function() {
    console.log(this)
  }

  this.e = function() {
    console.log(_this)
  }
}

A.c = function() {
  console.log(A)
}

A.d = function d() {
  console.log(this)
}

Object.defineProperty(A.prototype, 'f', {
  value: function f() {
    console.log(this)
  },
  enumerable: false,
  configurable: true,
  writable: true
})
```

**e 可便利， f 不可便利。**
