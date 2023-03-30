// /**
//  * @param {number} n
//  * @return {number}
//  */
// var countVowelStrings = function(n) {
//   let res = 0;

//   // idx 当前字母
//   // num 当前位置
//   const fn = (idx, num) => {
//     if (idx === 4 || num === n) {
//       res++;
//       return;
//     }

//     for (let i = idx; i <= 4; i++) {
//       fn(i, num + 1);
//     }
//   };

//   fn(0, 1);
//   fn(1, 1);
//   fn(2, 1);
//   fn(3, 1);
//   fn(4, 1);

//   return res;
// };

/**
 * @param {number} n
 * @return {number}
 */
var countVowelStrings = function(n) {
  const dp = new Array(n).fill(1);

  for (let i = 0; i < 5; i++) {
    
  }
};

countVowelStrings(1)