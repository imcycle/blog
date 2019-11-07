/**
 * https://developer.mozilla.org/zh-CN/docs/Web/Reference/API
 * Web 提供了各种各样的 API 来完成各种的任务。
 * 这些 API 可以用 JavaScript 来访问，令你可以做很多事儿，小到对任意 window 或者 element做小幅调整，大到使用诸如 WebGL 和 Web Audio 的 API 来生成复杂的图形和音效。
 */



/**
 * 文档对象模型（Document Object Model）
 * DOM 是一个 可以访问和修改当前文档的  API。
 * 通过它可以操作文档里的Node和Element。
 * HTML，XML 和 SVG 都扩展了基本的 DOM 接口来操作它们各自私有的元素类型。
 */




/**
 * 设备 API（Device APIs）
 * 这一组 API 可以让网页和应用程序使用各种硬件资源。
 * 如：环境光感应器API、电池状态 API、地理位置 API、指针锁定 API、距离感应 API、设备定向 API、屏幕定向 API、震动 API。
 */



/**
 * 通信 API（Communication APIs）
 * 这些 API 可以让网页或应用程序和其它的网页或设备进行通信。
 * 如：网络信息 API、Web 通知、简单推送 API。
 */



/**
 * 数据管理 APIs（Data management APIs）
 * 这套 API 可以用来存储和管理用户的数据。
 * 如：文件处理 API、IndexedDB。
 * 除了上面这些公开的，所有网页和应用程序都可以使用的 API 以外，还有一类更强大的，但只有特权应用程序和已认证应用程序能够使用的，非标准的 Mozilla 私有 API。
 */



/**
 * 特权 API（Privileged APIs）
 * 特权应用程序是那些由用户给予了特定权限的应用程序。
 * 特权 API 包括：TCP Socket API、联系人 API、设备存储 API、浏览器 API、相机 API。
 */





/**
 * 已认证应用程序的私有 API（Certified APIs）
 * 已认证的应用程序是那些直接与操作系统（比如 Firefox OS）打交道，执行核心操作的底层应用程序。
 * 较低特权的应用程序可以通过 Web Activities 调用这些底层应用程序。
 * 这些 API 包括：蓝牙 API、手机连接 API、网络状态 API、通话 API、短信/彩信 API、WiFi 信息 API、电源管理 API、设置 API、空闲状态 API、权限 API、时间/时钟 API。
 */