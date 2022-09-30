/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  nums.sort((a, b) => a - b)
  var n = nums.length
  var res = Infinity

  for (var first = 0; first < n - 2; first++) {
    // 和上一个相同，跳过
    if (first > 0 && nums[first] === nums[first - 1]) {
      continue
    }

    var left = first + 1
    var right = n - 1
    while (left < right) {
      // 和上一个相同，跳过
      if (left > first + 1 && nums[left] === nums[left - 1]) {
        left++
        continue
      }

      var sum = nums[first] + nums[left] + nums[right]
      if (sum === target) {
        return sum
      }
      
      // 计算最接近
      if (Math.abs(sum - target) - Math.abs(res - target) < 0) {
        res = sum
      }
      
      if (sum > target) {
        right--
      } else {
        left++
      }
    }
  }

  return res
};