/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
 var shiftGrid = function(grid, k) {
  var m = grid.length
  var n = grid[0].length
  for (var i = 0; i < k; i++) {
    // 右移
    for (var j = 0; j < m; j++) {
      grid[j].unshift(grid[j].pop())
    }
    // 下移
    var temp = grid[m - 1][0]
    for (var x = 0; x < m; x++) {
      [grid[x][0], temp] = [temp, grid[x][0]]
    }
  }

  return grid
};

shiftGrid(
  [[1,2,3],[4,5,6],[7,8,9]],
1
)
