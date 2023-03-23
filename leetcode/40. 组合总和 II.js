/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  const n = candidates.length;
  const res = [];
  const resSet = new Set();
  candidates.sort((a, b) => a - b);

  const fn = (index, sum, arr) => {
      const newSum = sum + candidates[index];

      if (newSum > target) {
          return;
      }

      if (newSum === target) {
          const newArr = [...arr, candidates[index]]
          if (!resSet.has(JSON.stringify(newArr))) {
              res.push(newArr);
              resSet.add(JSON.stringify(newArr));
          }
          return;
      }

      fn(index + 1, sum, arr);
      fn(index + 1, newSum, [...arr, candidates[index]]);
  }

  fn(0, 0, []);

  return res;
};

combinationSum2([10,1,2,7,6,1,5],
  8)