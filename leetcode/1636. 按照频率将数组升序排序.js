// 给你一个整数数组 nums ，请你将数组按照每个值的频率 升序 排序。如果有多个值的频率相同，请你按照数值本身将它们 降序 排序。
// 请你返回排序后的数组。
// 1 <= nums.length <= 100
// -100 <= nums[i] <= 100
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var frequencySort = function (nums) {
  var map = new Map();
  for (var num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  var keys = [...map.keys()];
  keys.sort((a, b) => {
    var valA = map.get(a);
    var valB = map.get(b);
    if (valA !== valB) {
      return valA - valB;
    } else {
      return b - a;
    }
  });

  return keys.reduce(
    (prev, curr) => prev.concat(new Array(map.get(curr)).fill(curr)),
    []
  );
};
