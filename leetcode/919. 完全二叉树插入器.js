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
 */
var CBTInserter = function(root) {
  this.root = root
  this.queue = [root]

  while (this.queue[0].left && this.queue[0].right) {
    var node = this.queue.shift()
    this.queue.push(node.left, node.right)
  }
};

/** 
 * @param {number} val
 * @return {number}
 */
CBTInserter.prototype.insert = function(val) {
  var parent = this.queue[0]
  var newNode = new TreeNode(val, null, null)
  if (!parent.left) {
    parent.left = newNode
  } else {
    parent.right = newNode
    this.queue.shift()
    this.queue.push(parent.left, parent.right)
  }
  
  return parent.val
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function() {
  return this.root
};

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(val)
 * var param_2 = obj.get_root()
 */