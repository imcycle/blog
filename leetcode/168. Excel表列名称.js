/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function(columnNumber) {
  // 26进制
  // 0-9  48-57
  // a-z  97-122
  // A-Z  65-
  return columnNumber.toString(26).split('').map(v => {
    var code = v.charCodeAt()
    if (code < 97) {
      return String.fromCharCode(code + 16)
    } else {
      return String.fromCharCode(code - 32)
    }
  }).join('')
};
