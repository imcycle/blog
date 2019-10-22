// https://developer.mozilla.org/zh-CN/docs/Web/API/History
/**
 * History
 * History 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。
 */


/**
 * 属性
 * History 接口不继承于任何属性。
 */

History.length  // 只读
// 返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页。例如，在一个新的选项卡加载的一个页面中，这个属性返回1。

History.scrollRestoration  // 实验性
// 允许Web应用程序在历史导航上显式地设置默认滚动恢复行为。此属性可以是自动的（auto）或者手动的（manual）。

History.state  // 只读
// 返回一个表示历史堆栈顶部的状态的值。这是一种可以不必等待popstate 事件而查看状态而的方式。


/**
 * 方法
 */
History.back()
// 前往上一页, 用户可点击浏览器左上角的返回按钮模拟此方法.等价于 history.go(-1).

History.forward()
// 在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进按钮模拟此方法.等价于 history.go(1).

History.go()
// 通过当前页面的相对位置从浏览器历史记录(会话记录)加载页面。
// 参数超过界限，没有任何效果也不会报错。

History.pushState()
// 将数据push进会话历史栈，数据被DOM进行不透明处理；
// 你可以指定任何可以被序列化的javascript对象。
// pushState() 需要三个参数: 一个状态对象, 一个标题(目前被忽略), 和(可选的) 一个URL. 

History.replaceState()
// 按指定的数据，名称和URL(如果提供该参数) ，更新历史栈上最新的入口。
// 这个数据被DOM 进行了不透明处理。你可以指定任何可以被序列化的javascript对象。
// 注意到Firefox现在忽略了这个title参数，更多的信息，请看manipulating the browser history。



let stateObj = {
  foo: "bar",
};

history.pushState(stateObj, "page 2", "bar.html");

history.replaceState(stateObj, "page 3", "bar2.html");