# Vue3 —— 手写响应式 API

Vue3 使用 Proxy 代理，Reflect 反射。下面手写仅仅处理了重要功能，源码里的封装更加完美。

为什么使用 Reflect ：

1. 某些返回值更加合理。（Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。）
2. 让 Object 操作都变成函数行为。统一操作格式。（delete obj[name] -> Reflect.deleteProperty(obj, name)）
3. Reflect 与 Proxy API 一一对应。对 receiver 的处理。

## 响应式 handlers 实现

```javascript
const isObject = (val) => val !== null && typeof val === "object";

// 生成 get 方法
function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_isShallow") {
      return shallow;
    }
    const res = Reflect.get(target, key, receiver);
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return res.value;
    }
    // 注意：get 的时候，才进行深层次的响应式处理。对比初始化递归处理的方式，性能更佳
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }
    return res;
  };
}

const reactiveHandlers = {
  get: createGetter(),
  set(target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver);
  },
  deleteProperty(target, key) {
    return Reflect.deleteProperty(target, key);
  },
};

const shallowReactiveHandlers = {
  ...reactiveHandler,
  // shallow 只处理第一层
  get: createGetter(false, true),
};

const readonlyHandlers = {
  get: createGetter(true),
  set(target, key) {
    console.warn("只读！");
    return true;
  },
  deleteProperty(target, key) {
    console.warn("只读！");
    return true;
  },
};

const shallowReadonlyHandlers = {
  ...readonlyHandlers,
  // shallow 只处理第一层
  get: createGetter(true, true),
};
```

## reactive shallowReactive readonly shallowReadonly API 实现

```javascript
// 记录响应式处理过的数据
// 使用 WeakMap 性能更好，因为 target 没有引用时候，会自动回收
const reactiveMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();

// reactive API 实现
function reactive(target) {
  return createReactiveObject(target, reactiveHandler, reactiveMap);
}

// shallowReactive API 实现
function shallowReactive(target) {
  return createReactiveObject(
    target,
    shallowReactiveHandlers,
    shallowReactiveMap
  );
}

// readonly API 实现
function readonly(target) {
  return createReactiveObject(target, readonlyHandlers, readonlyMap);
}

// shallowReadonly API 实现
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    shallowReadonlyHandlers,
    shallowReadonlyMap
  );
}

function createReactiveObject(target, handlers, proxyMap) {
  if (!isObject(target)) {
    console.warn("目标不能被响应式处理！");
    return target;
  }

  // 如果已经被响应式处理过，则直接返回
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }

  const proxy = new Proxy(target, handlers);
  proxyMap.set(target, proxy); // 记录被响应式处理过的数据
  return proxy;
}
```

## ref shallow API 实现

```javascript
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}

function createRef(value, shallow) {
  if (isRef(value)) {
    return value;
  }

  return {
    __v_isShallow: shallow,
    __v_isRef: true,
    _value: !shallow && isObject(value) ? reactive(value) : value,
    get value() {
      return this._value;
    },
    set value(newVal) {
      this._value = !shallow && isObject(newVal) ? reactive(newVal) : newVal;
    },
  };
}
```

## isReactive isReadonly isShallow isProxy isRef API 实现

```javascript
function isReactive(value) {
  return !!(value && value.__v_isReactive);
}
function isReadonly(value) {
  return !!(value && value.__v_isReadonly);
}
function isShallow(value) {
  return !!(value && value.__v_isShallow);
}
function isRef(value) {
  return !!(value && value.__v_isRef);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
```
