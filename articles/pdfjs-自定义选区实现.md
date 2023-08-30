# pdfjs 实现自定义选区选中

version 3.9.179

## 效果

![效果图](http://storage.icyc.cc/p/20230829/rc-upload-1693303486918-2.jpeg)

## pdfjs 项目打包

```bash
$ git clone git@github.com:mozilla/pdf.js.git

$ npm install -g gulp-cli

$ npm install # 如果 mac m1 芯片打包报错，查看 https://github.com/mozilla/pdf.js/issues/14402

# 打包
$ gulp generic
```

目录 build/generic 即打包目录。

将 build/generic/* 放到自己项目目录 /public/pdfjs/（public 是静态资源目录）

然后启动项目，打开 http://localhost:3000/pdfjs/web/viewer.html 即可访问。

## pdfjs 源码修改

### 移除 url 源检测

将 pdfjs/web/viewer.js 下面代码注释，移除源检测。

```diff
  var validateFileURL = function (file) {
    ...
-   if (fileOrigin !== viewerOrigin) {
-     throw new Error("file origin does not match viewer's");
-   }
+   // if (fileOrigin !== viewerOrigin) {
+   //   throw new Error("file origin does not match viewer's");
+   // }
    ...
  }
```

然后，自定义的 url 就可以打开了。

`http://localhost:3000/pdfjs/web/viewer.html?file=${url}`

### 开发选区功能

pdfjs/web/viewer.js

添加选区事件，在 PDFViewerApplication 中添加如下方法。

```javascript
const PDFViewerApplication = {
  ...
  selectionInfo: null,
  ...
  renderSelection(data) {
    this.removeSelection();

    if (!data) return;
    this.selectionInfo = data;
    const pages = Object.keys(this.selectionInfo);
    pages.forEach(page => {
      this.renderSelectionPage(page);
    })
  },
  renderSelectionPage(page) {
    const pageTextLayer = document.querySelector(`.page[data-page-number="${page}"]`).querySelector('.textLayer');
      if (!pageTextLayer) return;
    
      const pos = this.selectionInfo[page];
      pos.forEach(v => {
        const span = document.createElement('span');
        span.classList.add('custom-selected');
        span.style.left = `calc(var(--scale-factor) *  ${v[0]/2}px)`;
        span.style.top = `calc(var(--scale-factor) *  ${v[1]/2}px)`;
        span.style.width = `calc(var(--scale-factor) *  ${v[2]/2}px)`;
        span.style.height = `calc(var(--scale-factor) *  ${v[3]/2}px)`;
    
        pageTextLayer.appendChild(span);
      })
  },
  removeSelection() {
    if (!this.selectionInfo) return;

    const pages = Object.keys(this.selectionInfo);
    // const renderedPages = this.pdfViewer.getCachedPageViews()

    pages.forEach(page => {
      const pageTextLayer = document.querySelector(`.page[data-page-number="${page}"]`).querySelector('.textLayer');
      if (!pageTextLayer) return;

      const spanList = pageTextLayer.querySelectorAll('.custom-selected');
      if (spanList) {
        for (let i = 0; i < spanList.length; i++) {
          spanList[i]?.remove();
        }
      }
    })

    this.selectionInfo = null;
  }
}
```

实现懒加载下渲染选区，在 webViewerPageRendered 下添加三行。

```javascript
function webViewerPageRendered({
  pageNumber,
  error
}) {
  ...
  if (!!PDFViewerApplication.selectionInfo?.[pageNumber]) {
    PDFViewerApplication.renderSelectionPage(pageNumber);
  }
}
```

样式调整。pdfjs/web/viewer.css 添加样式

```css
.custom-selected {
  position: absolute;
  background-color: rgb(85, 165, 255);
  /* opacity: 0.3; */
  z-index: 2;
  pointer-events: none;
}
```

## 使用方式

pdf 加载

```vue
<template>
  <iframe id="PDFViewerIframe" :src="'/pdfjs/web/viewer.html?file=' + props.url" class="h-full w-full"></iframe>
</template>
```

```javascript
const pdf = document?.getElementById('PDFViewerIframe')?.contentWindow?.PDFViewerApplication;
if (!pdf) return;


// 后端请求数据 page: [left, top, width, height][]
const map = {
  '4': [
    [105, 1124, 969, 23],
    [106, 1168, 974, 22],
    [106, 1210, 966, 22],
    [106, 1252, 968, 22],
    [106, 1295, 536, 22],
    [148, 1337, 925, 22],
    [106, 1380, 966, 22],
    [106, 1422, 966, 22],
    [107, 1464, 965, 22],
    [107, 1506, 965, 22],
    [529, 1561, 166, 21],
  ],
  '5': [
    [256, 97, 711, 21],
    [107, 153, 965, 22],
  ],
};
pdf.renderSelection(map); // 选区
pdf.page = Number(Object.keys(map)[0]); // 跳转
```
