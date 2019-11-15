function proxy(fn) {
  let instance;
  let handler = {
    constructor(target, args) {
      if (!instance) {
        instance = Reflect.constructor(fn, args);
      }
      return instance;
    }
  }
  return new Proxy(fn, handler);
}