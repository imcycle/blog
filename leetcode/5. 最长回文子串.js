/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  var n = s.length;
  var dp = new Array(n).fill(0).map(() => new Array(n).fill(false))
  var maxs = [0, 0]

  for (var len = 0; len < n; len++) {
    for (var index = 0; index < n - len; index++) {
      var i = index
      var j = index + len

      if (i === j) {
        dp[i][j] = true
      } else if (i === j - 1) {
        dp[i][j] = s[i] === s[j]
      } else {
        dp[i][j] = dp[i+1][j-1] && (s[i] === s[j])
      }

      if (dp[i][j]) {
        // 比较大小
        if (j - i + 1 > maxs[1] - maxs[0] + 1) {
          maxs = [i, j]
        }
      }
    }
  }

  return s.slice(maxs[0], maxs[1] + 1)
};
longestPalindrome('abb')
// P(i,j): true / false(1.不是回文 2.i>j不成立)

// 动态规划的状态转移方程
// P(i,j) = P(i-1,j+1) && (Si === Sj)

// res:
// j-i+1




