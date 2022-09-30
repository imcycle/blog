/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  var fn = function (str, left, right) {
    if (left === 0 && right === 0) {
      return [str]
    } else if (left === 0) {
      var suffix = new Array(right).fill(')').join('')
      return [str + suffix]
    } else if (right === 0) {
      return [...fn(str + '(', left - 1, right + 1)]
    }

    return [...fn(str + '(', left - 1, right + 1), ...fn(str + ')', left, right - 1)]
  }

  return fn('', n, 0)
};

var res = generateParenthesis(3)
console.log(res)