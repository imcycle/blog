/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 感觉属于脑筋急转弯题

// 主导思路：
// 下一个必然是，从后往前看，升序继续往前；降序时，在后面找到比这个数字大一点的数字，放在这个位置，其他的后面数字排序

// 实现思路：
// 从后往前循环，比较最后一个与当前位置。当前位置大，则放在最后；当前位置小，与后面第一个比它大的数换位。
var nextPermutation = function(nums) {
  if (nums.length === 1) return
  var n = nums.length

  // 最后一个和当前对比
  for (var i = n - 2; i >= 0; i--) {
    if (nums[i] >= nums[n - 1]) {
      nums.push(...nums.splice(i, 1))
    } else {
      var index = nums.slice(i + 1).findIndex(v => v > nums[i]);
      [nums[i], nums[index + i + 1]] = [nums[index + i + 1], nums[i]]
      return
    }
  }
};