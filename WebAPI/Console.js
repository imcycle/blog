// https://developer.mozilla.org/zh-CN/docs/Web/API/Console
/**
 * Console
 */

Console.assert()
// 判断第一个参数是否为真，false 的话抛出异常并且在控制台输出相应信息。
Console.clear()
// 清空控制台，并输出 Console was cleared。  不清除数据
Console.count()
// 以参数为标识记录调用的次数，调用时在控制台打印标识以及调用次数。
Console.countReset()
// 重置指定标签的计数器值。
Console.debug()
// 在控制台打印一条 "debug" 级别的消息。
// 提示: 从 Chromium 58 开始，Chromium 浏览器打印的debug消息仅在日志级别为 “Verbose” 时可见。
Console.dir()
// 打印一条以三角形符号开头的语句，可以点击三角展开查看对象的属性。
Console.dirxml()
// 打印 XML / HTML 元素表示的指定对象，否则显示 JavaScript 对象视图。
Console.error()
// 打印一条错误信息，使用方法可以参考 string substitution。
Console.group()
// Creates a new inline group, indenting all following output by another level.To move back out a level, call groupEnd().
Console.groupCollapsed()
// 创建一个新的内联 group。使用方法和 group() 相同，不同的是，groupCollapsed() 方法打印出来的内容默认是折叠的。To move back out a level, call groupEnd().
Console.groupEnd()
// Exits the current inline group.
Console.info()
// Informative logging of information.You may use string substitution and additional arguments with this method.
Console.log()
// For general output of logging information.You may use string substitution and additional arguments with this method.
Console.profile()
// Starts the browser's built-in profiler (for example, the Firefox performance tool). You can specify an optional name for the profile.
Console.profileEnd()
// Stops the profiler.You can see the resulting profile in the browser's performance tool (for example, the Firefox performance tool).
Console.table()
// 将列表型的数据打印成表格。
Console.time()
// Starts a timer with a name specified as an input parameter.Up to 10, 000 simultaneous timers can run on a given page.
Console.timeEnd()
// 结束特定的计时器 and logs the elapsed time in seconds since it started。
Console.timeLog()
// Logs the value of the specified timer to the console.
Console.timeStamp()
// 添加一个标记到浏览器的 Timeline 或 Waterfall 工具。
Console.trace()
// 输出一个 stack trace。
Console.warn()
// 打印一个警告信息，可以使用 string substitution 和额外的参数。






// console.log() 和 console.info() 区别
// console.info前面有个小图标