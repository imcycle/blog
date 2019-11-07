// https://developer.mozilla.org/zh-CN/docs/Web/API/Location
/**
 * Location
 * Location 接口表示其链接到的对象的位置（URL）。
 * 所做的修改反映在与之相关的对象上。
 * Document 和 Window 接口都有这样一个链接的Location，分别通过 Document.location和Window.location 访问。
 */



/**
 * 属性
 * Location 接口不继承任何属性，但是实现了那些来自 URLUtils 的属性。
 */

Location.href
// 包含整个URL的一个DOMString
Location.protocol
// 包含URL对应协议的一个DOMString，最后有一个":"。
Location.host
// 包含了域名的一个DOMString，可能在该串最后带有一个":"并跟上URL的端口号。
Location.hostname
// 包含URL域名的一个DOMString。
Location.port
// 包含端口号的一个DOMString。
Location.pathname
// 包含URL中路径部分的一个DOMString，开头有一个“/"。
Location.search
// 包含URL参数的一个DOMString，开头有一个“?”。
Location.hash
// 包含块标识符的DOMString，开头有一个“#”。
Location.username
// 包含URL中域名前的用户名的一个DOMString。
Location.password
// 包含URL域名前的密码的一个 DOMString。
Location.origin // 只读
// 包含页面来源的域名的标准形式DOMString。


/**
 * 方法
 * Location没有继承任何方法，但实现了来自URLUtils的方法。
 */

Location.assign()
// 加载给定URL的内容资源到这个Location对象所关联的对象上。
// 	document.location.assign('https://developer.mozilla.org/zh-CN/docs/Web/API/Location/reload');

Location.reload()
// 重新加载来自当前 URL的资源。他有一个特殊的可选参数，类型为 Boolean，该参数为true时会导致该方法引发的刷新一定会从服务器上加载数据。如果是 false或没有制定这个参数，浏览器可能从缓存当中加载页面。

Location.replace()
// 用给定的URL替换掉当前的资源。与 assign() 方法不同的是用 replace()替换的新页面不会被保存在会话的历史 History中，这意味着用户将不能用后退按钮转到该页面。
// document.location.replace('https://developer.mozilla.org/en-US/docs/Web/API/Location/reload');

Location.toString()
// 返回一个DOMString，包含整个URL。 它和读取URLUtils.href的效果相同。但是用它是不能够修改Location的值的。