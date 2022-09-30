/**
 * @param {number[]} nums
 * @return {number}
 */
// 哈希表记录数字出现的次数
// 反向循环 nums ，每一次判断 
//    出现次数是否为只有 1 和 \d* 两种
//    或，出现次数是否为只有 \d+1 和 \d* 两种
//    满足则返回
var maxEqualFreq = function(nums) {
  var map = new Map()
  for (var i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1)
  }

  for (var i = nums.length - 1; i >= 0; i--) {
    if (check(map)) {
      return i + 1
    }
    if (map.get(nums[i]) === 1) {
      map.delete(nums[i])
    } else {
      map.set(nums[i], map.get(nums[i]) - 1)
    }
  }

  return 0
};

var check = function (map) {
  var counts = [...map.values()] // 次数
  var countType = [...new Set(map.values())].sort((a, b) => a - b) // 次数种类
  if (countType.length === 1) {
    if (counts.length === 1 || countType[0] === 1) {
      return true
    }
  } else if (countType.length === 2) {
    if (countType[0] === 1 && counts.filter(v => v === 1).length === 1) { // 仅有一个 1
      return true
    }
    
    if (countType[0] + 1 === countType[1] && counts.filter(v => v === countType[1]).length === 1) { // 仅有一个 \d+1
      return true
    }
  }

  return false
}

// [1,1,1,2,2,2,3,3,3,4,4,4,5]