// 'A' -> "1"
// 'B' -> "2"
// ...
// 'Z' -> "26"
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  if (s[0] == '0') return 0;

  var dfs = function (str) {
    if (str.length === 0) {
      return
    }
    if (str[0] > 2 && str[1] == '0') {
      throw new Error('error')
    }
    
    return dfs(str.slice(1))
  }

  
  try {
    return dfs(s)
  } catch (error) {
    return 0
  }

  // todo
};