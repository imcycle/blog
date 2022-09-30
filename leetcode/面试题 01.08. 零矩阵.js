// 编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  var n = matrix.length;
  var m = matrix[0].length;
  var has0 = new Array(m)
    .fill(0)
    .map((_, i) => matrix.map((v) => v[i]).includes(0));

  for (var i = 0; i < n; i++) {
    if (matrix[i].includes(0)) {
      matrix[i].splice(0, m, ...new Array(m).fill(0));
      continue;
    }
    for (var j = 0; j < m; j++) {
      if (has0[j]) {
        matrix[i][j] = 0;
      }
    }
  }
};
