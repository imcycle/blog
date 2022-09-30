/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function(expression) {
  var tail = expression
  if (tail[0] !== '-') {
    tail = '+' + tail
  }
  var re = /^([+-]\d+)\/(\d+)/

  var fz = 0
  var fm = 1
  while (tail.length) {
    var match = tail.match(re)
    tail = tail.substring(match[0].length)

    var fz1 = Number(match[1])
    var fm1 = Number(match[2])
  
    // 计算
    fz = fz * fm1 + fz1 * fm
    fm = fm * fm1

    // 化简
    var gys = fn(Math.abs(fz), fm)
    fz /= gys
    fm /= gys
  }

  return `${fz}/${fm}`
};

// 最大公约数（辗转相除法）
var fn = function(a, b) {
  while (a % b) {
    [a, b] = [b, a % b]
  }

  return b
}

// 最小公倍数（a * b / 最大公约数）
var fn1 = function(a, b) {
  return a * b / fn(a, b)
}


fractionAddition("-5/2+10/3+7/9")