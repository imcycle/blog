/**
 * @param {number[]} arr
 * @param {number[][]} pieces
 * @return {boolean}
 */
var canFormArray = function (arr, pieces) {
  var index = 0;
  while (index < arr.length) {
    var piece = pieces.find((v) => v[0] === arr[index]);
    if (piece) {
      for (var j = 1; j < piece.length; j++) {
        if (piece[j] !== arr[index + j]) {
          return false;
        }
      }

      index += piece.length;
    } else {
      return false;
    }
  }

  return true;
};




// 哈希表记录
var canFormArray = function (arr, pieces) {
  var map = new Map();  // 哈希表记录 pieces[i][0] 位置
  pieces.forEach((v, i) => map.set(v[0], i));

  var index = 0;
  while (index < arr.length) {
    var piece = pieces[map.get(arr[index])]
    if (piece) {
      for (var j = 1; j < piece.length; j++) {
        if (piece[j] !== arr[index + j]) {
          return false;
        }
      }

      index += piece.length;
    } else {
      return false;
    }
  }

  return true;
};
