"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var A =
  /*#__PURE__*/
  function () {
    function A() {
      _classCallCheck(this, A);

      _defineProperty(this, "handleClick", function () {
        console.log('handleClick');
      });

      this.state = {
        a: 1,
        b: 2
      };
    }

    _createClass(A, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        console.log('componentWillMount');
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.setState({
          a: 2
        });
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement("div", {
          style: {
            width: '100px'
          }
        }, React.createElement("h1", null, this.state.a), React.createElement("p", {
          onClick: this.handleClick
        }, "123"), React.createElement("p", null, "234"));
      }
    }]);

    return A;
  }();

var _default = A;
exports["default"] = _default;