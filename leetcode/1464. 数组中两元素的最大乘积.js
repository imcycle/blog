/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  var n = nums.length
  nums.sort((a, b) => a - b)
  return (nums[n - 1] - 1) * (nums[n - 2] - 1)
};