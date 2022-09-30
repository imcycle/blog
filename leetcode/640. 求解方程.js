/**
 * @param {string} equation
 * @return {string}
 */

// 正则分割+模拟
var solveEquation = function(equation) {
  var [left, right] = equation.split('=')
  var re = /[+-]?\d*x?/g
  var re1 = /^([+-]?)(\d*)(x?)$/

  var num = 0
  var xCount = 0
  left.match(re).forEach(v => {
    var match = v.match(re1) // [+1x, +, 1, x]
    if (match[3] === 'x') {
      if (match[1] === '-') {
        xCount -= Number(match[2] || 1)
      } else {
        xCount += Number(match[2] || 1)
      }
    } else {
      if (match[1] === '-') {
        num -= Number(match[2] || 1)
      } else {
        num += Number(match[2] || 1)
      }
    }
  })

  right.match(re).forEach(v => {
    var match = v.match(re1) // [+1x, +, 1, x]
    if (match[3] === 'x') {
      if (match[1] === '-') {
        xCount += Number(match[2] || 1)
      } else {
        xCount -= Number(match[2] || 1)
      }
    } else {
      if (match[1] === '-') {
        num += Number(match[2] || 1)
      } else {
        num -= Number(match[2] || 1)
      }
    }
  })

  if (xCount !== 0) {
    return 'x=' + (-num / xCount)
  } else if (num === 0) {
    return 'Infinite solutions'
  } else {
    return 'No solution'
  }
};



// 更好的方法，可以一次扫描，记录等号前还是等号后
