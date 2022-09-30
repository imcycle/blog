/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
// 未完成，不会
var orderlyQueue = function(s, k) {
  var right = s.split('')
  var left = right.splice(0, k)

  while (left.find(v => v > arr[k])) {
    var index = findNextIndex(left, right[right.length - 1])
  }

  return left.concat(right).join('')
};

var findNextIndex = function (arr, target) {
  var temp = Infinity
  var res = null
  arr.forEach((v, i) => {
    if (v > value) {
      var ua = v.charCodeAt() - value.charCodeAt()
      if (ua > 0 && ua < temp) {
        temp = ua
        res = i
      }
    }
  })

  return res
}