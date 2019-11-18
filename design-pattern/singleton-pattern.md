### 单例模式
定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

```javascript
var Singleton = function (name) {
  this.name = name;
}

Singleton.prototype.getName = function () {
  console.log(this.name);
}

Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);  // Singleton静态属性
  }
  return this.instance;
}

var a = Singleton.getInstance('s1');
var b = Singleton.getInstance('s2');
console.log(a === b)  // true
```
或
```javascript
var Singleton = function (name) {
  this.name = name;
}

Singleton.prototype.getName = function () {
  console.log(this.name);
}

Singleton.getInstance = (function (name) {
  var instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  }
})()

var a = Singleton.getInstance('s1');
var b = Singleton.getInstance('s2');
console.log(a === b)  // true
```

---

#### JavaScript特色单例模式
eg：QQ登录浮窗
```javascript
var createLoginLayer = (function () {
  var div;
  return function () {
    if (!div) {
      div = document.createElement('div');
      div.innerHTML = '我是登录浮窗';
      div.style.display = 'none';
      document.body.appendChild(div);
    }
    return div;
  }
})();

document.getElementById('loginBtn').onclick = function () {
  var loginLayer = createLoginLayer();
  loginLayer.style.display = 'block';
}
```
