/**
 * @param {number[]} nums
 * @return {number}
 */
// var jump = function (nums) {
//   var arr = [0]
//   for (var i = 1; i < nums.length; i++) {
//     var minStep = Infinity
//     for (var j = 0; j < i; j++) {
//       if (nums[j] + j >= i) {
//         minStep = Math.min(minStep, arr[j])
//       }
//     }
//     arr[i] = minStep + 1
//   }

//   return arr[arr.length - 1]
// };

var jump = function (nums) {
  // 贪心
  // 从后往前，找到可以跳到 position 的最远距离，及最小下标，替换 position
  var step = 0
  var position = nums.length - 1
  label : while (position > 0) {
    // 转换为 从前往后，找到跳出
    for (var i = 0; i < position; i++) {
      if (i + nums[i] >= position) {
        position = i
        step++
        continue label
      }
    }
  }

  return step
};

jump([2,3,1,1,4])
