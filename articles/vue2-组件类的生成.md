# Vue2 源码解析 —— 组件类的生成

Vue.js v2.6.14

我们的组件暴露出去的是对象，是如何实例化的呢？

除了文件入口的 new Vue() ，其他组件的实例化是在 componentVNodeHooks.init -> createComponentInstanceForVnode -> new vnode.componentOptions.Ctor(options) 调用的。

vnode 的生成是在 vnode = createComponent(Ctor, data, context, children, tag); ，这里的 Ctor 是个对象， createComponent 又有这么一段代码：

```js
var baseCtor = context.$options._base;

// plain options object: turn it into a constructor
if (isObject(Ctor)) {
  Ctor = baseCtor.extend(Ctor);
}
```

我们知道了， Ctor 是通过继承的方式生成的。

继续往下找，会找到 Vue.extend 方法：

```js

/**
 * Class inheritance
 */
Vue.extend = function (extendOptions) {
  extendOptions = extendOptions || {};  // 是暴露的组件对象，会放在 Sub.options 上，在 _init 时候调用 initInternalComponent 生成 $options
  var Super = this;  // this 是 Vue
  var SuperId = Super.cid;
  var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
  if (cachedCtors[SuperId]) {
    return cachedCtors[SuperId]
  }

  var name = extendOptions.name || Super.options.name;

  var Sub = function VueComponent (options) {
    this._init(options);
  };
  Sub.prototype = Object.create(Super.prototype);
  Sub.prototype.constructor = Sub;  // _init 时候 var opts = vm.$options = Object.create(vm.constructor.options);
  Sub.cid = cid++;
  Sub.options = mergeOptions(
    Super.options,
    extendOptions
  );
  Sub['super'] = Super;

  // For props and computed properties, we define the proxy getters on
  // the Vue instances at extension time, on the extended prototype. This
  // avoids Object.defineProperty calls for each instance created.
  if (Sub.options.props) {
    initProps$1(Sub);
  }
  if (Sub.options.computed) {
    initComputed$1(Sub);
  }

  // allow further extension/mixin/plugin usage
  Sub.extend = Super.extend;
  Sub.mixin = Super.mixin;
  Sub.use = Super.use;

  // create asset registers, so extended classes
  // can have their private assets too.
  ASSET_TYPES.forEach(function (type) {
    Sub[type] = Super[type];
  });
  // enable recursive self-lookup
  if (name) {
    Sub.options.components[name] = Sub;
  }

  // keep a reference to the super options at extension time.
  // later at instantiation we can check if Super's options have
  // been updated.
  Sub.superOptions = Super.options;
  Sub.extendOptions = extendOptions;
  Sub.sealedOptions = extend({}, Sub.options);

  // cache constructor
  cachedCtors[SuperId] = Sub;
  return Sub
};
```
