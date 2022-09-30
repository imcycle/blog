/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var deepestLeavesSum = function(root) {
  var arr = [root]
  while (arr.length) {
    var newArr = []
    for (var v of arr) {
      if (v.left) newArr.push(v.left)
      if (v.right) newArr.push(v.right)
    }

    if (!newArr.length) {
      return arr.reduce((prev, curr) => prev + curr.val, 0)
    }

    arr = newArr
  }

  return 0
};

// deepestLeavesSum([1,2,3,4,5,null,6,7,null,null,null,null,8])