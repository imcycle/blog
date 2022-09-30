// 给你一个整数数组 arr ，请你删除最小 5% 的数字和最大 5% 的数字后，剩余数字的平均值。
// 与 标准答案 误差在 10-5 的结果都被视为正确结果。
// 20 <= arr.length <= 1000
// arr.length 是 20 的 倍数 
// 0 <= arr[i] <= 105
/**
 * @param {number[]} arr
 * @return {number}
 */
var trimMean = function(arr) {
  var b5 = arr.length / 100 * 5
  arr.sort((a, b) => a - b);

  arr.splice(0, b5)
  arr.splice(arr.length - b5, b5)

  return arr.reduce((prev, curr) => prev + curr) / arr.length
};

var trimMean = function(arr) {
  return arr.sort((a, b) => a - b).slice(arr.length * 0.05, arr.length * 0.95).reduce((prev, curr) => prev + curr) / (arr.length * 0.9);
};