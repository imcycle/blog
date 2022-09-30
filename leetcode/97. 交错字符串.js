// 给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。

// 两个字符串 s 和 t 交错 的定义与过程如下，其中每个字符串都会被分割成若干 非空 子字符串：

// s = s1 + s2 + ... + sn
// t = t1 + t2 + ... + tm
// |n - m| <= 1
// 交错 是 s1 + t1 + s2 + t2 + s3 + t3 + ... 或者 t1 + s1 + t2 + s2 + t3 + s3 + ...
// 注意：a + b 意味着字符串 a 和 b 连接。

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  // f(i,j) 表示 s1 的"前" i 个元素，与 s2 的"前" j 个元素， s3 的"前" i+j 个元素，是否满足需求
  // s1(x) s2(x) s3(x) 表示"第" x 个元素

  // 可得到动态规划转移方程
  // f(i,j)=(f(i-1,j)&&s1(i)===s3(i+j)) || (f(i,j-1)&&s2(j)===s3(i+j))
  // s1(i) 是第i个，实际写法 s1[i-1]，注意，“第”和下标相差1

  if (s1.length + s2.length !== s3.length) return false;

  // 前0个到前n个，长度是n+1
  var dp = new Array(s1.length + 1)
    .fill(0)
    .map(() => new Array(s2.length + 1).fill(0));

  for (var i = 0; i <= s1.length; i++) {
    for (var j = 0; j <= s2.length; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = true;
      } else if (
        (dp[i - 1]?.[j] && s1[i - 1] === s3[i + j - 1]) ||
        (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1])
      ) {
        dp[i][j] = true;
      } else {
        dp[i][j] = false;
      }
    }
  }

  return dp[s1.length][s2.length];
};

isInterleave("aabcc", "dbbca", "aadbbcbcac");
