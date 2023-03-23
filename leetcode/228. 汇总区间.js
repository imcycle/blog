/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  const res = [];
  let start = null;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] + 1 !== nums[i + 1]) {
      if (start == null || start === nums[i]) {
        res.push(`${nums[i]}`);
      } else {
        res.push(`${start}->${nums[i]}`);
      }
      start = null;
    } else {
      start = start ?? nums[i];
    }
  }

  return res;
};

summaryRanges([0,1,2,4,5,7])