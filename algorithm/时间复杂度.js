// 1. 找到基本语句，通常是循环；
// 2. 保留最高次幂且忽略系数；
// 3. 放入大O中。

function fun(n) {
  console.log('Hello, World!');
}
// O(1)


function fun(n) {
  for (var i = 0; i < n; i++) {  // 循环次数为 n
    console.log('Hello, World!');  // 循环体复杂度为 O(1)
  }
}
// O(n*1) -> O(n)

function fun(n) {
  for (var i = 0; i < n; i++) {  // 循环次数为 n
    for (var j = 0; j < n; j++) {  // 循环次数为 n
      console.log('Hello, World!');  // 循环体复杂度为 O(1)
    }
  }
}
// O(n*n*1) -> O(n^2)


// 保留最高次幂且忽略系数
function fun(n) {
  for (var i = 0; i < n; i++) {  // 循环次数为 n
    console.log('Hello, World!');  // 循环体复杂度为 O(1)
  }

  for (var i = 0; i < n; i++) {  // 循环次数为 n
    for (var j = 0; j < n; j++) {  // 循环次数为 n
      console.log('Hello, World!');  // 循环体复杂度为 O(1)
    }
  }

  for (var i = 0; i < n; i++) {  // 循环次数为 n
    for (var j = 0; j < n; j++) {  // 循环次数为 n
      console.log('Hello, World!');  // 循环体复杂度为 O(1)
    }
  }
}
// O(n, 2n^2) -> O(n^2)



function fun() {
  while (Math.random() < 0.5) {  // Math.rendom [0,1)   期望值为2
    console.log('Hello, World!');  // 循环体复杂度为 O(1)
  }
  return true;
}
// O(2*1) -> 忽略1的系数 -> O(1)



// 冒泡排序
var bubbleSort = function (originalArray) {
  var arr = [...originalArray];

  for (let i = 1; i < arr.length; i += 1) {
    for (let j = 1; j < arr.length - i; j += 1) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}




var res = 0;
var n = 100000;
for (var i = 0; i < n; i++) {
  res += i * (0.1 ** i)
}
console.log(res)



