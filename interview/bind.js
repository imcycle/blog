
Function.prototype.bind = Function.prototype.bind || function bind(thisArg) {
  if (typeof this !== 'function') {
    throw new TypeError(this + ' must be a function');
  }
  var self = this;
  var args = [].slice.call(arguments, 1);
  var bound = function () {
    var boundArgs = [].slice.call(arguments);
    var finalArgs = args.concat(boundArgs);
    if (this instanceof bound) {
      if (self.prototype) {
        function Empty() { }
        Empty.prototype = self.prototype;
        bound.prototype = new Empty();
      }
      var result = self.apply(this, finalArgs);
      var isObject = typeof result === 'object' && result !== null;
      var isFunction = typeof result === 'function';
      if (isObject || isFunction) {
        return result;
      }
      return this;
    }
    else {
      return self.apply(thisArg, finalArgs);
    }
  };
  return bound;
}
