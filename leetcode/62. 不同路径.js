/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 递归超时
// var uniquePaths = function (m, n) {
//   if (m === 1 || n === 1) {
//     return 1;
//   }

//   return uniquePaths(m - 1, n) + uniquePaths(m, n - 1);
// };

// dp
var uniquePaths = function (m, n) {
  var dp = new Array(n).fill(0).map(() => new Array(m).fill(1));

  for (var i = 1; i < n; i++) {
    for (var j = 1; j < m; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[n - 1][m - 1];
};

var res = uniquePaths(3, 7);
console.log(res);
