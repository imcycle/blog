# 常用 CSS 样式整理

## 文字超出部分显示省略号

单行文本的溢出显示省略号

```css
.ellipsis-1 {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

多行文本溢出显示省略号

```css
.ellipsis-more {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

## 超长单词换行

* [white-space](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space) 用来设置如何处理元素中的 空白。
* [word-break](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break) 指定了怎样在单词内断行。<code>word-break: break-word;</code> 不推荐使用，将要废弃。
* word-wrap 在 CSS3 规范中重命名为 [overflow-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap)。

对比 <code>word-break: break-word;</code> 与 <code>overflow-wrap: break-word;</code> ：效果相同，但前者 MDN 显示废弃，所以推荐使用后者。

溢出时换行

```css
.break-word {
  overflow-wrap: break-word;
}
```

任意字符间换行

```css
.break-all {
  word-break: break-all;
}
```

## 设置 placeholder 样式

```css
input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: red;
}

input::-moz-placeholder {
  /* Firefox 19+ */
  color: red;
}

input:-ms-input-placeholder {
  /* IE 10+ */
  color: red;
}

input:-moz-placeholder {
  /* Firefox 18- */
  color: red;
}
```

## 设置 input 聚焦时的样式

```css
input:focus {
  background-color: red;
}
```

## 隐藏滚动条并滚动

```css
.demo::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.demo {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
```

## 使元素鼠标事件失效

```css
.wrap {
  pointer-events: none;
}
```

## 禁止用户选择

```css
.wrap {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

## 识别换行符

[white-space](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space) 用来设置如何处理元素中的 空白。

```css
white-space: pre-line;
```

## 移除 a 标签默认样式

```css
a {
  /* 取消边框 或者 outline: 0 */
  outline: none;
  /* 取消默认下划线 */
  text-decoration: none;
}
```

## 图片自适应

```css
img {
  object-fit: cover;
}
```

## 行内标签元素出现间隙问题

```css
/* 方式一：父级font-size设置为0 */
.father {
  font-size: 0;
}
/* 方式二：父元素上设置word-spacing的值为合适的负值 */
.father {
  word-spacing: -2px;
}
/* 方法三：将行内元素写为1行 */

/* 方法四：使用浮动样式 */

```

## 卡券效果

![](http://storage.icyc.cc/p/20211025/rc-upload-1635130175401-3.png)

```css
.coupon {
  width: 300px;
  height: 100px;
  line-height: 100px;
  margin: 50px auto;
  text-align: center;
  position: relative;
  background: radial-gradient(circle at right bottom, transparent 10px, #ffffff 0) top right / calc(50% + 1px) calc(50% + 1px) no-repeat,
    radial-gradient(circle at left bottom, transparent 10px, #ffffff 0) top left / calc(50% + 1px) calc(50% + 1px) no-repeat,
    radial-gradient(circle at right top, transparent 10px, #ffffff 0) bottom right / calc(50% + 1px) calc(50% + 1px) no-repeat,
    radial-gradient(circle at left top, transparent 10px, #ffffff 0) bottom left / calc(50% + 1px) calc(50% + 1px) no-repeat;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, .2));
}

.coupon span {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  color: red;
  font-size: 50px;
  font-weight: 400;
}
```

```html
<p class="coupon">
  <span>200</span>优惠券
</p>
```

## 纯 CSS 绘制三角形

![](http://storage.icyc.cc/p/20211025/rc-upload-1635130175401-7.png)

```css
/* 正三角 */
.up-triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 25px 40px 25px;
  border-color: transparent transparent rgb(245, 129, 127) transparent;
}

/* 倒三角 */
.down-triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 40px 25px 0 25px;
  border-color: rgb(245, 129, 127) transparent transparent transparent;
}

/* 对比 */
.test {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 25px 40px 25px;
  border-color: green yellow red blue;
}
```

## ps png 透明效果

```css
.bg {
  background-color: #fff;
  background-image: linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc);
  background-position: 0 0,8px 8px;
  background-size: 16px 16px;
}
```

## 磨砂背景效果

```css
.bg {
  backdrop-filter: saturate(50%) blur(8px);
  -webkit-backdrop-filter: saturate(50%) blur(8px);
}
```




