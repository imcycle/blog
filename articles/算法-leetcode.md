# 算法 —— LeetCode 刷题记录

## 单调栈

https://leetcode-cn.com/problems/next-greater-element-i/


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
