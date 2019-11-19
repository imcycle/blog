### 观察者模式
发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状 态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们一般用事件模型 来替代传统的发布—订阅模式。

> DOM事件
```javascript
document.body.addEventListener('click', function () {
  alert(2);
}, false);

document.body.addEventListener('click', function () {
  alert(3);
}, false);

document.body.addEventListener('click', function () {
  alert(4);
}, false);
```

> 发布-订阅模式的通用实现
```javascript
var event = {
  clientList: [],
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);  // 订阅的消息添加进缓存列表
  },
  remove: function (key, fn) {
    var fns = this.clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {  // 如果没有传入具体的函数， 表示需要取消key对应消息的所有订阅
      fns && fns.length = 0;
    } else {
      for(var l = fns.length -1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);  // 删除
        }
      }
    }
  },
  trigger: function () {
    var key = Array.prototype.shift.call(arguments),  // (1);
        fns = this.clientList[key];
    
    if (!fns || fns.length === 0) {
      return false;
    }

    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);  // (2)  // arguments 是 tarigger 时带上的参数
    }
  },
  
}

// 再定义一个 installEvent 函数，这个函数可以给所有的对象都动态安装发布—订阅功能:
var installEvent = function (obj) {
  for (var k in event) {
    obj[k] = event[k];
  }
}
```
测试
```javascript
var o = {};
installEvent(o);

o.listen('pd1', function () {
  console.log('pd1: ' + Array.prototype.slice.apply(arguments).toString());
})
o.listen('pd2', function () {
  console.log('pd2: ', Array.prototype.slice.apply(arguments).toString());
})

o.trigger('pd1', 'pd1msgmsgmsg');
o.trigger('pd2', 'pd2msgmsgmsg');
```
