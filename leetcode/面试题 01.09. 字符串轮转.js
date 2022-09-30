/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isFlipedString = function (s1, s2) {
  if (s1.length !== s2.length) return false;
  if (s1 === s2) return true;

  for (var i = 1; i < s1.length; i++) {
    if (s1.slice(i) + s1.slice(0, i) === s2) return true;
  }

  return false;
};
