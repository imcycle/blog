/**
 * @param {number[]} nums
 * @param {number[]} l
 * @param {number[]} r
 * @return {boolean[]}
 */
var checkArithmeticSubarrays = function (nums, l, r) {
  const n = l.length;
  const res = [];
  for (let i = 0; i < n; i++) {
    const arr = nums.slice(l[i], r[i] + 1).sort((a, b) => a - b);
    let pass = true; 
    if (arr.length > 2) {
      const temp = (arr[1] - arr[0]);
      for (let j = 1; j < arr.length; j++) {
        if (arr[j] - arr[j - 1] !== temp) {
          pass = false;
          break;
        }
      }
    }
    res.push(pass)
  }

  return res;
};

checkArithmeticSubarrays([4,6,5,9,3,7],
  [0,0,2],
  [2,3,5])
