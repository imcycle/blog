/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
  const n = s.length;

  // 如果切成2份不行，那么，4份必然也不行，6份也不行；同理，如果3份不行，那么 6 9 12 都不行。
  // 使用used记录用过的份数
  const used = [];

  // 切分的份数
  let splitNum = 2;

  // 最小2份，最大 n/2份
  label: while (splitNum <= n) {
    if (n % splitNum !== 0 || used.some(v => v % splitNum === 0)) {
      splitNum++;
      continue;
    }
    used.push(splitNum)

    const length = n / splitNum; // 每段长度
    const temp = s.slice(0, length); // 第一段内容
    let pos = length; // 当前检测第几段
    while (pos < n) {
      // 当前段内容
      const cur = s.slice(pos, pos + length);
      if (temp !== cur) {
        continue label;
      }
      pos += length;
    }

    return true;
  }

  return false;
};

repeatedSubstringPattern("ababab")