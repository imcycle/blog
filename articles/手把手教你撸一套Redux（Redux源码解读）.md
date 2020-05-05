# 手把手教你撸一套Redux（Redux源码解读）

版本：3.7.2

> Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

说白了Redux就是一个数据存储工具，所以数据基础模型有get方法，set方法以及数据改变后通知的对象subscribe订阅者。

* getState： getter（取）
* dispatch： setter（存）
* subscribe： 订阅

Redux 提供了五个方法 <a href="#createStore">createStore</a>, <a href="#">combineReducers</a>, <a href="#">bindActionCreators</a>, <a href="#">applyMiddleware</a>, <a href="#">compose</a>。接下来我们来一一解析。

## <span id="createStore">createStore</span>

> 创建一个 Redux store 来以存放应用中所有的 state。应用中应有且仅有一个 store。

参数：

* reducer (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。
* [ reloadedState ] (any)：初始时的 state。
* enhancer (Function)：后面再讲。

返回值：

* getState：获取store方法
* dispatch：修改store方法
* subscribe：订阅store变化方法
* replaceReducer：重置reducer方法

先来写一个基础的 createStore 如下：

```js
function createStore() {
  function getState() { }              // 取
  function dispatch() { }              // 存
  function subscribe() { }             // 订阅
  function replaceReducer() { }        // 重置reducer
  return { getState, dispatch, subscribe, replaceReducer }
}
```

### getState

getState 实现很简单，直接返回 currentState。

```js
function createStore() {
  let currentState = {};               // 数据
  function getState() {                // 取
    return currentState;
  }
  function dispatch() { }              // 存
  function subscribe() { }             // 订阅
  function replaceReducer() { }        // 重置reducer
  return { getState, dispatch, subscribe, replaceReducer }
}
```

### dispatch

dispatch 传入 action，通过 action.type 区别操作。

```js
function createStore() {
  let currentState = {};
  function getState() {                // 取
    return currentState;
  }
  function dispatch(action) {          // 存
    switch (action.type) {
      case 'PLUS':
        currentState = {
          ...currentState,
          count: currentState.count + 1,
        };
    }
    return action;
  }
  function subscribe() { }             // 订阅
  function replaceReducer() { }        // 重置reducer
  return { getState, dispatch, subscribe, replaceReducer }
}
```

因为 Redux 要通用，所以 dispatch 内和业务相关的代码要提取出来，Redux 给它起了个名字，叫 reducer。

提取reducer，

```js
const initialState = {
  count: 0,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'PLUS':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'MINUS':
      return {
        ...state,
        count: state.count - 1,
      }
    default:
      return state
  }
}
```

给 createStore 添加两个参数 reducer, preloadedState。 preloadedState选传，不传 currentState 默认值就是 undefined。

在 createStore 中添加初始化方法 <code>dispatch({ type: '@@redux/INIT' })</code> ; 初始化的 action.type 必须是 reducer 中没有使用过的，Redux 源码中使用了 <code>'@@redux/INIT'</code>。初始化方法会执行一次 dispatch。

初始化时，如果 currentState 是 undefined, 那么在 reducer 中， <code>state = initialState</code> 会把 initialState 赋值给 state，然后通过 default return 出去, 最后修改 currentState。相当于 currentState = initialState。

最后 createStore 如下

```js
function createStore(reducer, preloadedState) {
  let currentState = preloadedState;
  function getState() {                // 取
    return currentState;
  }
  function dispatch(action) {          // 存
    currentState = reducer(currentState, action);
    return action;
  }
  function subscribe() { }             // 订阅
  function replaceReducer() { }        // 重置reducer
  dispatch({ type: '@@redux/INIT' });  // 初始化
  return { getState, dispatch, subscribe, replaceReducer }
}
```

根据代码可以看出，reducer 和 action 都是开发者自定义的，Redux 只是把 reducer 返回的 state 赋值给了 currentState，那么开发者自定义其他格式的action ，并且在 reducer 中作出对应的解析，然后返回 state，当然也是完全可以的。只是 Redux 统一了这种写法，降低了个性化带来的开发成本。

实际上 createStore 有三个参数，最后一个参数目前用不到，后面再讲。

### subscribe

subscribe 有一个参数 listener (Function): 每当 dispatch action 的时候都会执行的回调。

subscribe 使用了设计模式中的 发布-订阅模式，又叫 观察者模式。

实现：

* 在 createStore 中添加一个储存 变化监听器 的数组 currentListeners；
* subscribe 将 变化监听器 放入 currentListeners；
* 每次 dispatch 时, 循环执行 currentListeners 中的 变化监听器。

```js
function createStore(reducer, preloadedState) {
  let currentState = preloadedState;
  let currentListeners = [];
  function getState() {                // 取
    return currentState;
  }
  function dispatch(action) {          // 存
    currentState = reducer(currentState, action);
    currentListeners.forEach(fn => fn());
    return action;
  }
  function subscribe(listener) {       // 订阅
    currentListeners.push(listener);
  }
  function replaceReducer() { }        // 重置reducer
  dispatch({ type: '@@redux/INIT' });  // 初始化
  return { getState, dispatch, subscribe, replaceReducer }
}
```

### replaceReducer

重置 reducer, 并不会重置 currentState。

实现：

* 添加变量 currentReducer；
* dispatch 使用 currentReducer；
* replaceReducer 方法将 nextReducer 赋值给 replaceReducer， 然后执行 <code>dispatch({ type: '@@redux/INIT' })</code>。

注意：实际上，replaceReducer 中的 <code>dispatch({ type: '@@redux/INIT' })</code>，只有此时 currentState 是 undefined 时，才有作用，会把新的 initialState 赋值给 currentState。

```js
function createStore(reducer, preloadedState) {
  let currentReducer = reducer
  let currentState = preloadedState;
  let currentListeners = [];
  function getState() {  // 取
    return currentState;
  }
  function dispatch(action) {  // 存
    currentState = currentReducer(currentState, action);
    currentListeners.forEach(fn => fn());
    return action;
  }
  function subscribe(listener) {  // 发布订阅
    currentListeners.push(listener);
  }
  function replaceReducer(nextReducer) {  // 重置reducer
    currentReducer = nextReducer;
    dispatch({ type: '@@redux/INIT' });  // 重置
  }
  dispatch({ type: '@@redux/INIT' });  // 初始化
  return { getState, dispatch, subscribe, replaceReducer }
}
```

createStore 的实现思路大概就是这样子，Redux 源码中又做了大量的错误校验。

## combineReducers

随着项目越来越大，把 reducer 放在一个文件里写会越来越臃肿，于是 Redux 提供了 combineReducers 方法。

combineReducers 参数是 reducers 对象，返回一个合成后的 reducer。

实现逻辑比较简单，循环把 reducers 里的每一个 reducer 都执行， 执行结果放在 nextState 里，如果数据改变了就返回 nextState，如果数据没有改变就返回传入的 state。

注意：如果数据没有改变，返回的是传入的 state，虽然此时和 nextState 数据是一样的，但是实际地址并不一样。为了区分，Redux 特意用了 hasChanged 变量来记录。

```js
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  return function combination(state = {}, action) {
    let hasChanged = false;
    const nextState = {};
    reducerKeys.forEach(key => {
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    })
    return hasChanged ? nextState : state;
  }
}
```

## bindActionCreators

action 生成器名字叫做叫 action creator, 如下

```js
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text,
  };
}
```

修改数据需要这样写

```js
dispatch(addTodo('Use Redux'))
```

如果我们多个 action creator，写起来会比较繁琐，所以 Redux 提供了 bindActionCreators 函数，传入 action creators 和 dispatch, 返回绑定了 dispatch 的 action creators。

实现也很简单，遍历 actionCreators, 把每个元素用 dispatch 处理后生成新的函数，返回新函数的集合。

actionCreators 参数是 action creator 的集合对象，如 <code>{ addTodo, addTodo1 }</code>。实现代码如下：

```js
function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {};
  Object.keys(actionCreators).forEach(key => {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = (...args) => dispatch(actionCreator(...args));
    }
  })
  return boundActionCreators;
}
```

Redux 支持 actionCreators 是一个单个 action creator 的函数，所以提取公共方法。改造如下：

```js
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  const boundActionCreators = {};
  Object.keys(actionCreators).forEach(key => {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  })
  return boundActionCreators;
}
```

## applyMiddleware

## compose
