# LeetCode 刷题笔记

## 单调栈

单调递增，单调递减。

一次 for 循环中， while 循环删除之前不符合的元素，插入当前元素。

[496. 下一个更大元素 I](https://leetcode-cn.com/problems/next-greater-element-i/)

## 摩尔投票

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

对拼。

```javascript
var majorityElement = function(nums) {
  var res = null
  var num = 0
  for (var i = 0; i < nums.length; i++) {
    if (num === 0) {
      res = [nums[i]]
    }
    nums[i] == res ? num++ : num--
  }
  return res
};
```

## DFS & BFS

http://icyc.cc/article/61f3b83d147c724fbabd5f24

## 动态规划

https://blog.csdn.net/qq_40778406/article/details/80581238

## 滑动窗口

思路是：外层 for 循环让 right ++，for 循环内部判断 left++ 。

例如：滑块儿区间不能超过 5 ，代码如下

```javascript
for (var left = 0, right = 0; right < 20; right++) {
  if (right - left > 5) {
    left++
  }
}
```

## 往返来回遍历数组

```javascript
var arr = [1, 2, 3] // 遍历效果：1 2 3 2 1 2 3 ...
var n = arr.length
var m = (n - 1) * 2 // 一轮次数

var index = 0
for (var i = 0; i < 100; i++) {
  console.log(arr[index])
  if (i % m < n - 1) {
    index++
  } else {
    index--
  }
}
```

## 线段树

http://icyc.cc/article/624bfbe6147c724fbabd5f2d

## 质数判断

暴力

```javascript
var isPrime = function (n) {
  if (n < 2) {
    return false
  }

  for (var i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false
    }
  }

  return true
}
```

## 水塘抽样

在一堆样品中，找到随机一个符合要求的样品。不占用额外空间。

思路是 (1/1)*(1 - 1/2)*(1 - 1/3)*(1 - 1/k) = 1/k

[398. 随机数索引](https://leetcode-cn.com/problems/random-pick-index/solution/sui-ji-shu-suo-yin-by-leetcode-solution-ofsq/)

## 凸包

在一堆点中，找到连线最大的一圈点。

[587. 安装栅栏](https://leetcode-cn.com/problems/erect-the-fence/)

详解可以看官方解法，不过官方解法 JavaScript 方法一有错误，应该改正两点：1.以左上点为原点，2.同以直线的点，应该用距离 p 最远的点作为下一个 q 。

### Jarvis 算法

思路是：以左顶点为原点 p ，找到下一个点 q，满足其余的点 r 均在向量 pq 的左边，然后 p=q ，下一轮寻找。

可以使用 「向量叉积」 来判断：

```javascript
// 返回值大于0，表示夹脚小于180度；
// 等于0，表示在一条直线；
// 小于0，表示大于180度。
const cross = (p, q, r) => {
    return (q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0]);
};
```

## 二维前缀和

计算二维数组中，[0,0] -> [r,c] 区域和 nums。

用于快速计算 [r0,c0] -> [r1,c1] 的区域和。

```javascript
var grid = [[1,2], [2,3]]
var r = grid.length
var c = grid[0].length
var sums = new Array(r + 1).fill(0).map(() => new Array(c + 1).fill(0))
for (var i = 0; i < r; i++) {
    for (var j = 0; j < c; j++) {
        sums[i + 1][j + 1] = sums[i + 1][j] + sums[i][j + 1] - sums[i][j] + grid[i][j]
    }
}
```

* [427. 建立四叉树](https://leetcode-cn.com/problems/construct-quad-tree/solution/jian-li-si-cha-shu-by-leetcode-solution-gcru/)
* [304. 二维区域和检索 - 矩阵不可变](https://leetcode-cn.com/problems/range-sum-query-2d-immutable/)

## 贪心算法

在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，算法得到的是在某种意义上的局部最优解。

以迭代的方法做出相继的贪心选择，每做一次贪心选择，就将所求问题简化为一个规模更小的子问题，通过每一步贪心选择，可得到问题的一个最优解。

* [942. 增减字符串匹配](https://leetcode-cn.com/problems/di-string-match/)

## 字典树

又称单词查找树，Trie树，是一种树形结构，是一种哈希树的变种。

```typescript
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/trie
// github javascript-algorithms 实现的 trie 结构如下：
type TrieNode = {
  character: string;
  isCompleteWord: boolean;
  children: HashTable; // HashTable 类似 Map ，有 get set has delete getKeys getValues 方法
}
```

* [745. 前缀和后缀搜索](https://leetcode.cn/problems/prefix-and-suffix-search/)
