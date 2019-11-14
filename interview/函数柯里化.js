// 在一个函数中，首先填充几个参数，然后再返回一个新的函数的技术，称为函数的柯里化。通常可用于在不侵入函数的前提下，为函数 预置通用参数，供多次重复调用。
const add = function add(x) {
  return function (y) {
    return x + y
  }
}

const add1 = add(1)

add1(2) === 3
add1(20) === 21
