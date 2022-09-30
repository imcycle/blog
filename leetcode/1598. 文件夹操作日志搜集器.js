/**
 * @param {string[]} logs
 * @return {number}
 */
var minOperations = function(logs) {
  var deep = 0

  logs.forEach(v => {
    if (v === './') {
      // nothing to do
    } else if (v === '../') {
      deep--
      if (deep < 0) deep = 0
    } else {
      deep++
    }
  })

  return deep
};
