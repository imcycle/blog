/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react */ \"./src/react.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\nvar A =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(A, _React$Component);\n\n  function A() {\n    _classCallCheck(this, A);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(A).apply(this, arguments));\n  }\n\n  _createClass(A, [{\n    key: \"render\",\n    value: function render() {\n      return _react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"div\", null, \"Hello world!\");\n    }\n  }]);\n\n  return A;\n}(_react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Component);\n\n;\n_react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].render(_react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(A, null), document.getElementById('root'));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/react.js":
/*!**********************!*\
  !*** ./src/react.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction importFromBelow() {\n  var TEXT_ELEMENT = 'TEXT_ELEMENT';\n\n  function updateDomProperties(dom, prevProps, nextProps) {\n    var isEvent = function isEvent(name) {\n      return name.startsWith(\"on\");\n    };\n\n    var isAttribute = function isAttribute(name) {\n      return !isEvent(name) && name != \"children\";\n    }; // Remove event listeners\n\n\n    Object.keys(prevProps).filter(isEvent).forEach(function (name) {\n      var eventType = name.toLowerCase().substring(2);\n      dom.removeEventListener(eventType, prevProps[name]);\n    }); // Remove attributes\n\n    Object.keys(prevProps).filter(isAttribute).forEach(function (name) {\n      dom[name] = null;\n    }); // Set attributes\n\n    Object.keys(nextProps).filter(isAttribute).forEach(function (name) {\n      dom[name] = nextProps[name];\n    }); // Add event listeners\n\n    Object.keys(nextProps).filter(isEvent).forEach(function (name) {\n      var eventType = name.toLowerCase().substring(2);\n      dom.addEventListener(eventType, nextProps[name]);\n    });\n  }\n\n  var rootInstance = null;\n\n  function render(element, parentDom) {\n    var prevInstance = rootInstance;\n    var nextInstance = reconcile(parentDom, prevInstance, element);\n    rootInstance = nextInstance;\n  }\n\n  function reconcile(parentDom, instance, element) {\n    if (instance === null) {\n      var newInstance = instantiate(element); // componentWillMount\n\n      newInstance.publicInstance && newInstance.publicInstance.componentWillMount && newInstance.publicInstance.componentWillMount();\n      parentDom.appendChild(newInstance.dom); // componentDidMount\n\n      newInstance.publicInstance && newInstance.publicInstance.componentDidMount && newInstance.publicInstance.componentDidMount();\n      return newInstance;\n    } else if (element === null) {\n      // componentWillUnmount\n      instance.publicInstance && instance.publicInstance.componentWillUnmount && instance.publicInstance.componentWillUnmount();\n      parentDom.removeChild(instance.dom);\n      return null;\n    } else if (instance.element.type !== element.type) {\n      var _newInstance = instantiate(element); // componentDidMount\n\n\n      _newInstance.publicInstance && _newInstance.publicInstance.componentDidMount && _newInstance.publicInstance.componentDidMount();\n      parentDom.replaceChild(_newInstance.dom, instance.dom);\n      return _newInstance;\n    } else if (typeof element.type === 'string') {\n      updateDomProperties(instance.dom, instance.element.props, element.props);\n      instance.childInstances = reconcileChildren(instance, element);\n      instance.element = element;\n      return instance;\n    } else {\n      if (instance.publicInstance && instance.publicInstance.shouldcomponentUpdate) {\n        if (!instance.publicInstance.shouldcomponentUpdate()) {\n          return;\n        }\n      } // componentWillUpdate\n\n\n      instance.publicInstance && instance.publicInstance.componentWillUpdate && instance.publicInstance.componentWillUpdate();\n      var newChildElement;\n\n      if (instance.publicInstance) {\n        // 类组件\n        instance.publicInstance.props = element.props;\n        newChildElement = instance.publicInstance.render();\n      } else {\n        // 函数式组件\n        newChildElement = instance.fn(element.props);\n      }\n\n      var oldChildInstance = instance.childInstance;\n      var newChildInstance = reconcile(parentDom, oldChildInstance, newChildElement); // componentDidUpdate\n\n      instance.publicInstance && instance.publicInstance.componentDidUpdate && instance.publicInstance.componentDidUpdate();\n      instance.dom = newChildInstance.dom;\n      instance.childInstance = newChildInstance;\n      instance.element = element;\n      return instance;\n    }\n  }\n\n  function reconcileChildren(instance, element) {\n    var dom = instance.dom,\n        childInstances = instance.childInstances;\n    var newChildElements = element.props.children || [];\n    var count = Math.max(childInstances.length, newChildElements.length);\n    var newChildInstances = [];\n\n    for (var i = 0; i < count; i++) {\n      newChildInstances[i] = reconcile(dom, childInstances[i], newChildElements[i]);\n    }\n\n    return newChildInstances.filter(function (instance) {\n      return instance !== null;\n    });\n  }\n\n  function instantiate(element) {\n    var type = element.type,\n        _element$props = element.props,\n        props = _element$props === void 0 ? {} : _element$props;\n    var isDomElement = typeof type === 'string';\n    var isClassElement = !!(type.prototype && type.prototype.isReactComponent);\n\n    if (isDomElement) {\n      // 创建dom\n      var isTextElement = type === TEXT_ELEMENT;\n      var dom = isTextElement ? document.createTextNode('') : document.createElement(type); // 设置dom的事件、数据属性\n\n      updateDomProperties(dom, [], element.props);\n      var children = props.children || [];\n      var childInstances = children.map(instantiate);\n      var childDoms = childInstances.map(function (childInstance) {\n        return childInstance.dom;\n      });\n      childDoms.forEach(function (childDom) {\n        return dom.appendChild(childDom);\n      });\n      var instance = {\n        element: element,\n        dom: dom,\n        childInstances: childInstances\n      };\n      return instance;\n    } else if (isClassElement) {\n      var _instance = {};\n      var publicInstance = createPublicInstance(element, _instance);\n      var childElement = publicInstance.render();\n      var childInstance = instantiate(childElement);\n      Object.assign(_instance, {\n        dom: childInstance.dom,\n        element: element,\n        childInstance: childInstance,\n        publicInstance: publicInstance\n      });\n      return _instance;\n    } else {\n      var _childElement = type(element.props);\n\n      var _childInstance = instantiate(_childElement);\n\n      var _instance2 = {\n        dom: _childInstance.dom,\n        element: element,\n        childInstance: _childInstance,\n        fn: type\n      };\n      return _instance2;\n    }\n  }\n\n  function createTextElement(value) {\n    return createElement(TEXT_ELEMENT, {\n      nodeValue: value\n    });\n  }\n\n  function createElement(type, props) {\n    var _ref;\n\n    props = Object.assign({}, props);\n\n    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n      children[_key - 2] = arguments[_key];\n    }\n\n    props.children = (_ref = []).concat.apply(_ref, children).filter(function (child) {\n      return child != null && child !== false;\n    }).map(function (child) {\n      return child instanceof Object ? child : createTextElement(child);\n    });\n    return {\n      type: type,\n      props: props\n    };\n  }\n\n  function createPublicInstance(element, instance) {\n    var type = element.type,\n        props = element.props;\n    var publicInstance = new type(props);\n    publicInstance.__internalInstance = instance;\n    return publicInstance;\n  }\n\n  var Component =\n  /*#__PURE__*/\n  function () {\n    function Component(props) {\n      _classCallCheck(this, Component);\n\n      this.props = props;\n      this.state = this.state || {};\n    }\n\n    _createClass(Component, [{\n      key: \"setState\",\n      value: function setState(partialState) {\n        this.state = Object.assign({}, this.state, partialState); // update instance\n\n        var parentDom = this.__internalInstance.dom.parentNode;\n        var element = this.__internalInstance.element;\n        reconcile(parentDom, this.__internalInstance, element);\n      }\n    }]);\n\n    return Component;\n  }();\n\n  Component.prototype.isReactComponent = {};\n  return {\n    render: render,\n    createElement: createElement,\n    Component: Component\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (importFromBelow());\n\n//# sourceURL=webpack:///./src/react.js?");

/***/ })

/******/ });