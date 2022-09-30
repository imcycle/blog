/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
// 规律
// k = 1         [1,2,3,4,...,n]
// k = n - 1    [1,n,2,n-1,3,n-2,...]
// 
// test
// n=5 k=2 [1,2,3,4,5] 
// res [1,2,3,5,4]  or [2,1,3,4,5]
// [1,2,3,4,5,6] 3 [1,2,3,6,4,5]
var constructArray = function(n, k) {
  var arr = new Array(n).fill(0).map((_, i) => i + 1);
  var left = arr.slice(0, n - k - 1)
  var right = arr.slice(n - k - 1)
  for (var i = 0; i < Math.ceil(right.length / 2) - 1; i++) {
    var v = right.pop()
    right.splice(i * 2 + 1, 0, v)
  }

  return left.concat(right)
};

constructArray(6, 3)