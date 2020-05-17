# JavaScript设计模式学习

* <a href="#Singleton">单例模式</a>
* <a href="#Strategy">策略模式</a>
* <a href="#Proxy">代理模式</a>
* <a href="#Iterator">迭代器模式</a>
* <a href="#Observer">发布-订阅模式</a>
* <a href="#Command">命令模式</a>
* <a href="#Composite">组合模式</a>
* <a href="#Template">模板方法模式</a>
* <a href="#Flyweight">享元模式</a>
* <a href="#ChainOfResponsibility">职责链模式</a>
* <a href="#Mediator">中介者模式</a>
* <a href="#Decorator">装饰者模式</a>
* <a href="#State">状态模式</a>
* <a href="#Adapter">适配器模式</a>

## <span id="Singleton">单例模式</span>

保证一个类仅有一个实例，并提供一个全局访问点。

```js
// 构造函数
var Singleton = function (name) {
  this.name = name;
}
Singleton.prototype.getName = function () {
  alert(this.name);
}

// 方案1 绑定到构造函数上
Singleton.instance = null;
Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
}

// 方案2 闭包
Singleton.getInstance = (function () {
  var instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  }
})()
```

### 惰性单例

需要的时候才创建对象实例

```js
var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  }
}
```

例如一个Modal弹框，页面加载时不需要创建，按钮点击后才会被创建。以后再点击按钮不需要创建新的Modal。

```js
var createModal = function () {
  var div = document.createElement('div');
  div.style.display = 'none';
  document.body.append(div);
  return div;
}

createSingleModal = getSingle(createModal);

btn.click = function () {
  var modal = createSingleModal();
  modal.style.display = 'block';
}
```

<br />

## <span id="Strategy">策略模式</span>

定义一系列算法，把它们一个个封装起来，并且使它们可以互相替换。在实际开发中，我们通常会把算法的含义扩散开来，使用策略模式也可以用来封装一系列目标一致的‘业务规则’。

例如计算年终奖：

```js
var strategies = {
  "S": function (salary) {
    return salary * 4;
  },
  "A": function (salary) {
    return salary * 3;
  },
  "B": function (salary) {
    return salary * 2;
  },
}
var calculateBonus = function (level, salary) {
  return strategies[level](salary);
}

calculateBonus('S', 20000);  // 80000
calculateBonus('A', 10000);  // 30000
```

<br />

## <span id="Proxy">代理模式</span>

顾名思义，代理。

虚拟代理吧一些开销很大的对象，延迟到真正需要他的时候才去创建。

虚拟代理实现图片预加载

```js
var myImage = (function () {
  var imgNode = document.createElement('img');
  document.body.append(imgNode);

  return function (src) {
    imgNode.src = src;
  }
})()

// 代理 myImage，实现预加载
var proxyImage = (function () {
  var img = new Image();

  img.onload = function () {
    myImage(this.src);
  }

  return function (src) {
    myImage('./loading.gif');
    img.src = src;
  }
})()

proxyImage('http://xxx.10M.png');

```

JavaScript 开发中最常用的是虚拟代理和缓存代理。

<br />

## <span id="Iterator">迭代器模式</span>

实现迭代器(内部迭代器)

```js
var each = function (arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    if (callback.call(arr[i], arr[i], i) === false) {
      break;
    }
  }
}

each([1, 2, 3, 4, 5], function (item, index) {
  if (index > 3) {
    return false;
  }
  console.log(item, index);
})
```

外部迭代器

```js
var Iterator = function (obj) {
  var current = 0;
  var next = function () {
    current += 1;
  };

  var isDone = function () {
    return current >= obj.length;
  };

  var getCurrItem = function () {
    return obj[current];
  };

  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem,
    length: obj.length,
  }
}
```

<br />

## <span id="Observer">发布-订阅模式</span>

定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

```js
var event = {
  clientList: {},
  listen: function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }

    clientList[key].push(fn);
  },
  trigger: function () {
    var key = Array.prototype.shift.apply(arguments),
      fns = this.clientList[key];

    if (!fns || fns.length === 0) {
      return false;
    }

    for (var i = 0; i < fns.length; i++) {
      fns[i].apply(this, arguments);
    }
  },
  remove: function (key, fn) {
    var fns = this.clientList[key];

    if (!fns || fns.length === 0) {
      return false;
    }

    if (!fn) {
      this.clientList = [];
    } else {
      for (var i = 0; i < fns.length; i++) {
        if (fn === fns[i]) {
          fns.splice(i, 1);
        }
      }
    }

  },
}
```

DOM事件也是发布-订阅模式。

<br />

## <span id="Command">命令模式</span>

<br />

## <span id="Composite">组合模式</span>

<br />

## <span id="Template">模板方法模式</span>

<br />

## <span id="Flyweight">享元模式</span>

<br />

## <span id="ChainOfResponsibility">职责链模式</span>

<br />

## <span id="Mediator">中介者模式</span>

<br />

## <span id="Decorator">装饰者模式</span>

<br />

## <span id="State">状态模式</span>

<br />

## <span id="Adapter">适配器模式</span>

<br />
