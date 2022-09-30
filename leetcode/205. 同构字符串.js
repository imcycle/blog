/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 思路都是互相映射


// map set
var isIsomorphic = function(s, t) {
  var map = new Map() // s[i] -> t[i]
  var set = new Set() // t[i]
  for (var i = 0; i < s.length; i++) {
    if (map.get(s[i])) {
      if (map.get(s[i]) !== t[i]) {
        return false
      }
    } else {
      if (set.has(t[i])) {
        return false
      }

      map.set(s[i], t[i])
      set.add(t[i])
    }
  }

  return true
};


// arr arr
var isIsomorphic = function(s, t) {
  var arr1 = []
  var arr2 = []
  for (var i = 0; i < s.length; i++) {
    if (arr1.indexOf(s[i]) !== arr2.indexOf(t[i])) {
      return false
    }
    arr1.push(s[i])
    arr2.push(t[i])
  }

  return true
};


var isIsomorphic = function(s, t) {
  var map1 = new Map()
  var map2 = new Map()

  for (var i = 0; i < s.length; i++) {
    if ((map1.has(s[i]) && map1.get(s[i]) !== t[i]) || (map2.has(t[i]) && map2.get(t[i]) !== s[i])) {
      return false
    }
    map1.set(s[i], t[i])
    map2.set(t[i], s[i])
  }
  return true
};
