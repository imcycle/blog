/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function(arr, k, x) {
  var res = []
  var vals = []

  for (var i = 0; i < arr.length; i++) {
    var abs = Math.abs(arr[i] - x)
    if (res.length < k) {
      res.push(arr[i])
      vals.push(abs)
    } else if (arr[i] === res[0] || vals[0] > abs) {
      res.shift()
      res.push(arr[i])
      vals.shift()
      vals.push(abs)
    } else {
      return res
    }
  }

  return res
};

var findClosestElements = function(arr, k, x) {
  arr.sort((a, b) => {
    if (Math.abs(a - x) !== Math.abs(b - x)) {
      return Math.abs(a - x) - Math.abs(b - x)
    } else {
      return a - b
    }
  })

  return arr.slice(0, k).sort((a, b) => a - b)
};