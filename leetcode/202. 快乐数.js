/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
  var arr = [] // 计算过的数

  var curr = String(n)
  while (curr) {
    if (arr.includes(curr)) {
      return false
    }

    var next = 0
    for (var i = 0; i < curr.length; i++) {
      next += Math.pow(curr[i], 2)
    }
    if (next === 1) return true

    arr.push(curr)
    curr = String(next)
  }

  return false
};

// 哈希表记录
var isHappy = function(n) {
  var map = new Map()

  var curr = String(n)
  while (curr) {
    if (map.get(curr)) {
      return false
    }

    var next = 0
    for (var i = 0; i < curr.length; i++) {
      next += Math.pow(curr[i], 2)
    }
    if (next === 1) return true

    map.set(curr, true)
    curr = String(next)
  }

  return false
};

// 快慢指针
var isHappy = function(n) {
  var map = new Map()

  var curr = String(n)
  while (curr) {
    if (map.get(curr)) {
      return false
    }

    var next = 0
    for (var i = 0; i < curr.length; i++) {
      next += Math.pow(curr[i], 2)
    }
    if (next === 1) return true

    map.set(curr, true)
    curr = String(next)
  }

  return false
};