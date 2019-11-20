/**
 * Promise
 * Promise 是异步编程的一种解决方案。
 * Promise 对象用于表示一个异步操作的最终完成 (或失败), 及其结果值.
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * 三种状态：
   pending: 初始状态，既不是成功，也不是失败状态。
   fulfilled: 意味着操作成功完成。(resoloved)
   rejected: 意味着操作失败。
 */


/**
 * 属性
 */
Promise.length
// length属性，其值总是为 1(构造器参数的数目).
Promise.prototype
// 表示 Promise 构造器的原型.


/**
 * 方法
 */
Promise.all(iterable)   // 所有成功触发成功  任何失败触发失败
Promise.race(iterable)  // 任意一个成功或失败后触发
Promise.reject(reason)
Promise.resolve(value)


/**
 * 原型
 */
// 属性
Promise.prototype.constructor
// 返回被创建的实例函数.默认为 Promise 函数.

//方法
Promise.prototype.catch(onRejected)
Promise.prototype.then(onFulfilled, onRejected)
Promise.prototype.finally(onFinally)




/**
 * Promise
 * .then第二个参数 和 .catch相似
 */
let promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    if (false) {
      resolve('success')
    } else {
      reject('err')
    }
  }, 2000)
})

promise
  .then(function (value) {
    console.log(value)
    return 'then1'
  })
  .then(function (value) {
    console.log(value)
    return 'then2'
  }, function (err) {
    console.log(err)
    return 'err1'
  })
  .then(function (value) {
    console.log(value)
  })
  .catch(function (err) {
    console.log(err)
  })
  .finally(function () {
    console.log('end')
  })





/**
 * Promise.race(iterable)
 * 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
 */
var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, 'one');
});
var promise2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 400, 'two');
});
Promise.race([promise1, promise2]).then(function (value) {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"



/**
 * Promise.all(iterable)
 * 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。
 */
var promise1 = Promise.resolve(3);
var promise2 = 42;
var promise3 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function (values) {
  console.log(values);
});
// expected output: Array[3, 42, "foo"]


/**
 * Promise.resolve(value);
 * Promise.resolve(promise);
 * Promise.resolve(thenable);
 * 返回一个以给定值解析后的Promise 对象。
 */
Promise.resolve(33);

/**
 * Promise.reject(reason)
 * 一个给定原因了的被拒绝的 Promise。
 */
Promise.reject(new Error('fail'));


