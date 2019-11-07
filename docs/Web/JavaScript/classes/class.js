// https://es6.ruanyifeng.com/#docs/class
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Class_elements


// class A {
//   static s = 's';        // 静态

//   constructor() {
//     this.a = 1;          // 实例
//     this.b = () => { };  // 实例
//   }
//   x = 2;                 // 实例
//   y = () => { };         // 实例
//   z() { };               // 原型
// }

// console.log(A.s)  // 's'

// class B extends A {
//   constructor() {
//     super();
//     this.a = 2;
//   }

//   componentDidMount() { }
// }

// console.log(new B())


class Component {
  constructor(props) {
    this.props = props;
    console.log(this.state)
    this.state = this.state || {};
  }

  setState(partialState) {
    console.log(partialState)
  }
}

class Page extends Component {
  constructor(props) {
    super(props);  // 调用父类的constructor(props)
    // this.state = {
    //   a: 1,
    // }
  }

  click = () => {
    this.setState({ a: 2 });
  }
}
var o = new Page({ p: 1 });
console.log(o)





