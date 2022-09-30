/**
 * @param {number[]} nums
 * @return {number[]}
 */
var minSubsequence = function(nums) {
  nums.sort((a, b) => b - a)
  var total2 = nums.reduce((prev, curr) => prev + curr, 0) / 2

  var res = []
  var temp = 0

  for (var i = 0; i < nums.length; i++) {
    res.push(nums[i]);
    temp += nums[i];
    if (temp > total2) {
      return res
    }
  }
};