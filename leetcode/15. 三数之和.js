
/**
 * 解析
 * 
 * 先分析两数之和，我们可以用 排序+双指针 时间复杂度 O(1) 实现
 * 理由是：
 * 我们从两端 left right 开始找，
 * 当第一次 nums[left] + nums[right] === target 时，
 * 下一次等于 target 必然在区间 (left, right) 内，
 * 所以我们 双指针 只需要便利一次。
 * 另外两段逻辑：
 * 当 nums[left] + nums[right] < target 时，只有 left++ 才可能等于 target
 * 当 nums[left] + nums[right] > target 时，只有 right-- 才可能等于 target
 *
 * 在两数之和基础上，第一个数 for 循环 first 依次往后，双指针区间 [first + 1, n - 1] 即可
 *
 * 另外，优化非常重要，js 会超时。
 * 优化如下：
 * first 和 left 相同数字不需要重复计算。
 */
var threeSum = function(nums) {
  nums.sort((a, b) => a - b)
  var n = nums.length
  var res = []

  // i, left ->  , <- right
  for (var i = 0; i < n; i++) {
    // 最左 > 0, 终止
    if (nums[i] > 0) {
      return res
    }

    // 和上一次相同，则不需要重复计算
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }

    var left = i + 1  // 最左
    var right = n - 1; // 最右
    while (left < right) {
      // 和上一次相同，则不需要重复计算
      if (left > i + 1 && nums[left] === nums[left - 1]) {
        left++
        continue
      }
      
      var r = nums[i] + nums[left] + nums[right]
      if (r > 0) {
        right--
      } else if (r === 0) {
        res.push([nums[i], nums[left], nums[right]])
        left++
      } else {
        left++
      }
    }
  }

  return res
};

// [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]
threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4])