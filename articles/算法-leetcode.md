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


## 二分法和分治法

二分算法是比较一次，直接扔掉不符合要求的那一半。（如果中间的不行，则某一边一定不行）

分治不能这么做，它只是做了划分，并没有减小问题规模。（两边分别做，然后整体做一次，其中对整体的操作要求为O(n)复杂度才可以，一般要求两边都要有序，可以在归并排序的思路上更改）
