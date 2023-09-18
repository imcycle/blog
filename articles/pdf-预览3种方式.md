# PDF 预览与编辑功能的前端实现策略

整理了 3 种方式。

## 使用浏览器自带功能实现

利用各个厂家浏览器支持 pdf 预览的特性，通过 iframe 实现。

优点：浏览器自带的预览功能，性能好。

缺点：1.不能自定义需求；2.不能统一样式，不同厂家的浏览器 UI 不统一。

```html
<iframe src="http://xx.com/xx.pdf" frameborder="0"></iframe>
```

## 使用 pdfjs

pdfjs 分两种实现方式

1. pdfjs 静态包
2. pdfjs-dist npm 包

pdfjs 的官方介绍： **PDF.js is a Portable Document Format (PDF) library that is built with HTML5.**。

是火狐开源的 js 库。 github 地址： https://github.com/mozilla/pdf.js 。

pdfjs 包含 搜索、翻页、缩略图、注释、翻转等功能。

pdf-dist 是火狐的 npm 包，只包含了 pdf 渲染的功能。

### 使用 pdfjs 静态包

需要去 github 拉源码自己打包，放到项目 public 目录下，相当于启动了一个静态资源服务器。或者作为单独项目部署，作为公司内部统一预览 pdf 的入口使用。

二开的例子： [PDF.js 实现自定义选区选中功能](http://icyc.cc/article/64eea5304da68911bee176c9) 。文章前半部分讲了如何打包。

使用方式：

```html
<iframe src="http://localhost:3000/pdfjs/web/viewer.html?file=${url}" frameborder="0"></iframe>
```

优点：自定义 UI ，自定义功能。

### 使用 pdfjs-dist npm 包

https://www.npmjs.com/package/pdfjs-dist

实现代码我问了下 ChatGPT ，它的代码如下：

```bash
npm install pdfjs-dist --save
```

```html
<div id="pdf-container">
  <!-- PDF内容将被嵌入到这里 -->
</div>

```

```javascript
// 导入pdfjs-dist库
const pdfjsLib = require('pdfjs-dist');

// 获取PDF容器元素
const container = document.getElementById('pdf-container');

// PDF文件路径
const pdfUrl = '/path/to/your.pdf'; // 替换为您的PDF文件路径

// 异步加载PDF文档
pdfjsLib.getDocument(pdfUrl).promise.then(function(pdfDoc) {
  // 获取第一页
  return pdfDoc.getPage(1);
}).then(function(page) {
  // 设置缩放比例
  const scale = 1.5;
  const viewport = page.getViewport({ scale: scale });

  // 创建一个Canvas元素用于渲染
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  container.appendChild(canvas);

  // 渲染PDF页面到Canvas
  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  page.render(renderContext);
}).catch(function(err) {
  console.error('Error loading PDF:', err);
});
```

优点：使用方便。

## 前后端协作实现

|功能|实现方式|
|-|-|
|上传|上传pdf后，后端 pdf2image ，提供接口查询进度。完成前前端过度页面 loading|
|预览&缩略图导航|后端返回图片，前端虚拟列表|
|框选区域文字识别|前端传四个位置坐标给后端，后端 ocr 识别，返回文本|
|搜索功能|点击搜索按钮，进入loading，后端进行 orc 提取文字。输入搜索，调后端接口，返回每个字的坐标 left top width height|
|pdf 拆分、旋转、换位|后端提供接口，操作原文件，并保存新文件|
|pdf 划线、框选批注|后端存位置坐标，前端渲染|
|下载（带标注信息）|后端添加 annotationLayer 注释层（待验证）|

eg: https://icase.alphalawyer.cn/
