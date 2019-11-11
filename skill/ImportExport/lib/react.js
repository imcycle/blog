"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function react() {
  var TEXT_ELEMENT = 'TEXT_ELEMENT';

  function updateDomProperties(dom, prevProps, nextProps) {
    var isEvent = function isEvent(name) {
      return name.startsWith("on");
    };

    var isAttribute = function isAttribute(name) {
      return !isEvent(name) && name != "children";
    }; // Remove event listeners


    Object.keys(prevProps).filter(isEvent).forEach(function (name) {
      var eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    }); // Remove attributes

    Object.keys(prevProps).filter(isAttribute).forEach(function (name) {
      dom[name] = null;
    }); // Set attributes

    Object.keys(nextProps).filter(isAttribute).forEach(function (name) {
      dom[name] = nextProps[name];
    }); // Add event listeners

    Object.keys(nextProps).filter(isEvent).forEach(function (name) {
      var eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
  }

  var rootInstance = null;

  function render(element, parentDom) {
    var prevInstance = rootInstance;
    var nextInstance = reconcile(parentDom, prevInstance, element);
    rootInstance = nextInstance;
  }

  function reconcile(parentDom, instance, element) {
    if (instance === null) {
      var newInstance = instantiate(element); // componentWillMount

      newInstance.publicInstance && newInstance.publicInstance.componentWillMount && newInstance.publicInstance.componentWillMount();
      parentDom.appendChild(newInstance.dom); // componentDidMount

      newInstance.publicInstance && newInstance.publicInstance.componentDidMount && newInstance.publicInstance.componentDidMount();
      return newInstance;
    } else if (element === null) {
      // componentWillUnmount
      instance.publicInstance && instance.publicInstance.componentWillUnmount && instance.publicInstance.componentWillUnmount();
      parentDom.removeChild(instance.dom);
      return null;
    } else if (instance.element.type !== element.type) {
      var _newInstance = instantiate(element); // componentDidMount


      _newInstance.publicInstance && _newInstance.publicInstance.componentDidMount && _newInstance.publicInstance.componentDidMount();
      parentDom.replaceChild(_newInstance.dom, instance.dom);
      return _newInstance;
    } else if (typeof element.type === 'string') {
      updateDomProperties(instance.dom, instance.element.props, element.props);
      instance.childInstances = reconcileChildren(instance, element);
      instance.element = element;
      return instance;
    } else {
      if (instance.publicInstance && instance.publicInstance.shouldcomponentUpdate) {
        if (!instance.publicInstance.shouldcomponentUpdate()) {
          return;
        }
      } // componentWillUpdate


      instance.publicInstance && instance.publicInstance.componentWillUpdate && instance.publicInstance.componentWillUpdate();
      var newChildElement;

      if (instance.publicInstance) {
        // 类组件
        instance.publicInstance.props = element.props;
        newChildElement = instance.publicInstance.render();
      } else {
        // 函数式组件
        newChildElement = instance.fn(element.props);
      }

      var oldChildInstance = instance.childInstance;
      var newChildInstance = reconcile(parentDom, oldChildInstance, newChildElement); // componentDidUpdate

      instance.publicInstance && instance.publicInstance.componentDidUpdate && instance.publicInstance.componentDidUpdate();
      instance.dom = newChildInstance.dom;
      instance.childInstance = newChildInstance;
      instance.element = element;
      return instance;
    }
  }

  function reconcileChildren(instance, element) {
    var dom = instance.dom,
        childInstances = instance.childInstances;
    var newChildElements = element.props.children || [];
    var count = Math.max(childInstances.length, newChildElements.length);
    var newChildInstances = [];

    for (var i = 0; i < count; i++) {
      newChildInstances[i] = reconcile(dom, childInstances[i], newChildElements[i]);
    }

    return newChildInstances.filter(function (instance) {
      return instance !== null;
    });
  }

  function instantiate(element) {
    var type = element.type,
        _element$props = element.props,
        props = _element$props === void 0 ? {} : _element$props;
    var isDomElement = typeof type === 'string';
    var isClassElement = !!(type.prototype && type.prototype.isReactComponent);

    if (isDomElement) {
      // 创建dom
      var isTextElement = type === TEXT_ELEMENT;
      var dom = isTextElement ? document.createTextNode('') : document.createElement(type); // 设置dom的事件、数据属性

      updateDomProperties(dom, [], element.props);
      var children = props.children || [];
      var childInstances = children.map(instantiate);
      var childDoms = childInstances.map(function (childInstance) {
        return childInstance.dom;
      });
      childDoms.forEach(function (childDom) {
        return dom.appendChild(childDom);
      });
      var instance = {
        element: element,
        dom: dom,
        childInstances: childInstances
      };
      return instance;
    } else if (isClassElement) {
      var _instance = {};
      var publicInstance = createPublicInstance(element, _instance);
      var childElement = publicInstance.render();
      var childInstance = instantiate(childElement);
      Object.assign(_instance, {
        dom: childInstance.dom,
        element: element,
        childInstance: childInstance,
        publicInstance: publicInstance
      });
      return _instance;
    } else {
      var _childElement = type(element.props);

      var _childInstance = instantiate(_childElement);

      var _instance2 = {
        dom: _childInstance.dom,
        element: element,
        childInstance: _childInstance,
        fn: type
      };
      return _instance2;
    }
  }

  function createTextElement(value) {
    return createElement(TEXT_ELEMENT, {
      nodeValue: value
    });
  }

  function createElement(type, props) {
    var _ref;

    props = Object.assign({}, props);

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    props.children = (_ref = []).concat.apply(_ref, children).filter(function (child) {
      return child != null && child !== false;
    }).map(function (child) {
      return child instanceof Object ? child : createTextElement(child);
    });
    return {
      type: type,
      props: props
    };
  }

  function createPublicInstance(element, instance) {
    var type = element.type,
        props = element.props;
    var publicInstance = new type(props);
    publicInstance.__internalInstance = instance;
    return publicInstance;
  }

  var Component =
  /*#__PURE__*/
  function () {
    function Component(props) {
      _classCallCheck(this, Component);

      this.props = props;
      this.state = this.state || {};
    }

    _createClass(Component, [{
      key: "setState",
      value: function setState(partialState) {
        this.state = Object.assign({}, this.state, partialState); // update instance

        var parentDom = this.__internalInstance.dom.parentNode;
        var element = this.__internalInstance.element;
        reconcile(parentDom, this.__internalInstance, element);
      }
    }]);

    return Component;
  }();

  Component.prototype.isReactComponent = {};
  return {
    render: render,
    createElement: createElement,
    Component: Component
  };
}

var _default = react();

exports["default"] = _default;