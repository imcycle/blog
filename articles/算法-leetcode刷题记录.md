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
