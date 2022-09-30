/**
 * @param {number} n
 * @return {string}
 */
// var generateTheString = function(n) {
//   if (n & 1) {
//     return new Array(n).fill('a').join('')
//   } else {
//     return new Array(n - 1).fill('a').join('') + 'b'
//   }
// };

var generateTheString = function(n) {
  if (n & 1) {
    return 'a'.repeat(n)
  }

  return 'a'.repeat(n - 1) + 'b'
};