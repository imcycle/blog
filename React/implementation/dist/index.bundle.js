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
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/caoyucong/Desktop/code/whosmeya/React/implementation/src/index.js: Support for the experimental syntax 'classProperties' isn't currently enabled (11:21):\\n\\n\\u001b[0m \\u001b[90m  9 | \\u001b[39m  }\\u001b[0m\\n\\u001b[0m \\u001b[90m 10 | \\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 11 | \\u001b[39m  handleButtonClick \\u001b[33m=\\u001b[39m () \\u001b[33m=>\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m                    \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 12 | \\u001b[39m    \\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39msetState({ num\\u001b[33m:\\u001b[39m \\u001b[33m++\\u001b[39m\\u001b[36mthis\\u001b[39m\\u001b[33m.\\u001b[39mstate\\u001b[33m.\\u001b[39mnum })\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 13 | \\u001b[39m  }\\u001b[0m\\n\\u001b[0m \\u001b[90m 14 | \\u001b[39m\\u001b[0m\\n\\nAdd @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.\\n    at Object.raise (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:6420:17)\\n    at Object.expectPlugin (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:7778:18)\\n    at Object.parseClassProperty (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:11013:12)\\n    at Object.pushClassProperty (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:10978:30)\\n    at Object.parseClassMemberWithIsStatic (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:10917:14)\\n    at Object.parseClassMember (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:10851:10)\\n    at /Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:10806:14\\n    at Object.withTopicForbiddingContext (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:9884:14)\\n    at Object.parseClassBody (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:10783:10)\\n    at Object.parseClass (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:10757:22)\\n    at Object.parseStatementContent (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:10051:21)\\n    at Object.parseStatement (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:10009:17)\\n    at Object.parseBlockOrModuleBlockBody (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:10585:25)\\n    at Object.parseBlockBody (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:10572:10)\\n    at Object.parseTopLevel (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:9940:10)\\n    at Object.parse (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:11447:17)\\n    at parse (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/parser/lib/index.js:11483:38)\\n    at parser (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/core/lib/transformation/normalize-file.js:168:34)\\n    at normalizeFile (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/core/lib/transformation/normalize-file.js:102:11)\\n    at runSync (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/core/lib/transformation/index.js:44:43)\\n    at runAsync (/Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/core/lib/transformation/index.js:35:14)\\n    at /Users/caoyucong/Desktop/code/whosmeya/React/implementation/node_modules/@babel/core/lib/transform.js:34:34\\n    at processTicksAndRejections (internal/process/task_queues.js:75:11)\");\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });