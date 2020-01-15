# link 和 @import 4个区别

1. 种类，link时HTML的标签，@import时CSS提供的方式
2. 加载顺序，link在页面加载时被加载，@import在页面全下载完之后在加载
3. 兼容性，@import是css2.1提供的方法,老版本不支持
4. 使用DOM控制元素的不同，JS控制页面样式时只能用link，@import不是DOM可以控制的
