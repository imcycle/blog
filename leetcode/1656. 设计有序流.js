/**
 * @param {number} n
 */
var OrderedStream = function(n) {
  this.arr = []
  this.ptr = 1
};

/** 
 * @param {number} idKey 
 * @param {string} value
 * @return {string[]}
 */
OrderedStream.prototype.insert = function(idKey, value) {
  this.arr[idKey] = value
  var res = []
  while (this.arr[this.ptr] !== undefined) {
    res.push(this.arr[this.ptr++])
  }
  return res
};

/**
 * Your OrderedStream object will be instantiated and called as such:
 * var obj = new OrderedStream(n)
 * var param_1 = obj.insert(idKey,value)
 */