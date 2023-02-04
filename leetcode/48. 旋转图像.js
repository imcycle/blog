/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var rotate = function(matrix) {
    var n = matrix.length;
    var res = new Array(n).fill(0).map(v => [])
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            res[i][j] = matrix[n - i - 1][j]
        }
    }

    return res;
};

rotate([[1,2,3],[4,5,6],[7,8,9]])