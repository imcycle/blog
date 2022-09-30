/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  var m = obstacleGrid[0].length
  var n = obstacleGrid.length

  var dp = new Array(n).fill(0).map(() => new Array(m).fill(1))

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0
        continue
      }

      if (i === 0 && j === 0) {
        // nothing to do
      }else if (i === 0) {
        dp[i][j] = dp[i][j - 1]
      } else if (j === 0) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = dp[i][j - 1] + dp[i - 1][j]
      }
    }
  }

  return dp[n - 1][m - 1]
};

uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]])
