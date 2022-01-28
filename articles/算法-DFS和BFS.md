# 算法 —— 深度遍历（DFS）和广度便利（BFS）

## 深度遍历

### 方法一：递归

* callbacks.allowTraversal 是否允许遍历
* callbacks.enterNode 进入节点
* callbacks.leaveNode 离开节点

缺点：深度过大会栈溢出。（例如 chrome 我本地测试栈溢出 13000+）

```javascript
var dfs = function(node, callbacks) {
  // Call the "enterNode" callback to notify that the node is going to be entered.
  callbacks.enterNode(node)

  // Traverse left branch only if case if traversal of the left node is allowed.
  if (node.left && callbacks.allowTraversal(node, node.left)) {
    dfs(node.left, callbacks)
  }

  // Traverse right branch only if case if traversal of the right node is allowed.
  if (node.right && callbacks.allowTraversal(node, node.right)) {
    dfs(node.right, callbacks)
  }

  // Call the "leaveNode" callback to notify that traversal
  // of the current node and its children is finished.
  callbacks.leaveNode(node)
}
```

### 方法二：栈

从栈中拿出第一项，按 right - left 入栈，循环。

缺点：无法实现 leaveNode 事件。

```javascript
var dfs = function(node) {
  var stack = [node]

  while (stack.length) {
    var currentNode = stack.pop()
    if (!currentNode.left && !currentNode.right) {
      // 叶子节点
    } else {
      if (currentNode.right) {
        stack.push(currentNode.right)
      }
      if (currentNode.left) {
        stack.push(currentNode.left)
      }
    }
  }
}
```

### 方法三：栈

用 step 变量记录当前节点的状态。

缺点：循环次数较多，一个节点最多会循环 3 次。

```javascript
var dfs = function(node) {
  var stack = [node]
  var step = Symbol('step') // curr[step] 记录当前节点走到了哪一步  0: 初始, 1: left, 2: right

  while (stack.length) {
    var curr = stack[stack.length - 1]

    if (!curr.left && !curr.right) {
      // 叶子节点
      stack.pop()
      continue
    }

    if (curr[step] === undefined) {
      curr[step] = 0
    }

    if (curr[step] === 0) {
      curr[step]++
      if (curr.left) {
        stack.push(curr.left)
        continue
      }
    }
    if (curr[step] === 1) {
      curr[step]++
      if (curr.right) {
        stack.push(curr.right)
        continue
      }
    }
    if (curr[step] === 2) {
      stack.pop()
      delete curr[step]
    }
  }
}
```

## 广度遍历

队列

* callbacks.allowTraversal 是否允许遍历
* callbacks.enterNode 进入节点
* callbacks.leaveNode 离开节点

```javascript
breadthFirstSearch(rootNode, callbacks) {
  const nodeQueue = [];

  // Do initial queue setup.
  nodeQueue.push(rootNode);

  while (!nodeQueue.length) {
    const currentNode = nodeQueue.shift();

    callbacks.enterNode(currentNode);

    // Add all children to the queue for future traversals.

    // Traverse left branch.
    if (currentNode.left && callbacks.allowTraversal(currentNode, currentNode.left)) {
      nodeQueue.push(currentNode.left);
    }

    // Traverse right branch.
    if (currentNode.right && callbacks.allowTraversal(currentNode, currentNode.right)) {
      nodeQueue.push(currentNode.right);
    }

    callbacks.leaveNode(currentNode);
  }
}
```
