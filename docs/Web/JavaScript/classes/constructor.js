// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/constructor
/**
 *  constructor 是一种用于创建和初始化class创建的对象的特殊方法。
 */
class Polygon {
  constructor() {
    this.name = "Polygon";
  }
}

var poly1 = new Polygon();

console.log(poly1.name);
// expected output: "Polygon"