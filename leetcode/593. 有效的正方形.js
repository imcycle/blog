/**
 * @param {number[]} p1
 * @param {number[]} p2
 * @param {number[]} p3
 * @param {number[]} p4
 * @return {boolean}
 */
var validSquare = function(p1, p2, p3, p4) {
  var arr = [p1, p2, p3, p4]
  var s = []

  for (var i = 0; i < 3; i++) {
    for (var j = i + 1; j < 4; j++) {
      s.push((arr[i][0] - arr[j][0]) ** 2 + (arr[i][1] - arr[j][1]) ** 2)
    }
  }

  // 如果是正方形，只有两个，且 2 倍
  s = [...new Set(s)].sort((a, b) => b - a)

  return s.length === 2 && s[0] / s[1] === 2
};