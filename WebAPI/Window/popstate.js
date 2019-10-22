// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onpopstate
/**
 * popstate
 * window.onpopstate是popstate事件在window对象上的事件处理程序.
 *
 * 每当处于激活状态的历史记录条目发生变化时,popstate事件就会在对应window对象上触发.
 * 如果当前处于激活状态的历史记录条目是由history.pushState()方法创建,或者由history.replaceState()方法修改过的,
 * 则popstate事件对象的state属性包含了这个历史记录条目的state对象的一个拷贝.
 *
 * 调用history.pushState()或者history.replaceState()不会触发popstate事件.
 * popstate事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法).
 *
 * 当网页加载时,各浏览器对popstate事件是否触发有不同的表现,Chrome 和 Safari会触发popstate事件, 而Firefox不会.
 */


window.onpopstate = function (event) {
  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};
//绑定事件处理函数. 
history.pushState({ page: 1 }, "title 1", "?page=1");    //添加并激活一个历史记录条目 http://example.com/example.html?page=1,条目索引为1
history.pushState({ page: 2 }, "title 2", "?page=2");    //添加并激活一个历史记录条目 http://example.com/example.html?page=2,条目索引为2
history.replaceState({ page: 3 }, "title 3", "?page=3"); //修改当前激活的历史记录条目 http://ex..?page=2 变为 http://ex..?page=3,条目索引为3
history.back(); // 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // 弹出 "location: http://example.com/example.html, state: null
history.go(2);  // 弹出 "location: http://example.com/example.html?page=3, state: {"page":3}


