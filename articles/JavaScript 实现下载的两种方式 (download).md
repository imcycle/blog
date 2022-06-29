# JavaScript 实现下载的两种方式 (download)

## 方法一： window.open

特点：浏览器先尝试打开资源，如果能打开，就用新 tab 页面打开资源；如果打不开，就下载。

```javascript
// 能打开：新 tab 展示
window.open('http://storage.icyc.cc/avatar/fe5c41e74c316188d95768a837996b5b');

// 打不开：下载
window.open('http://storage.icyc.cc/1bec453a8b7f91822c96d8575757b4f1.xlsx');
```

### 七牛云 attname 下载

七牛云文件后添加 ?attrname=1.png 也可以下载。

原因是，返回头 Content-Disposition 字段，值 attachment（意味着消息体应该被下载到本地；大多数浏览器会呈现一个“保存为”的对话框，将 filename 的值预填为下载后的文件名，假如它存在的话）。[MDN Content-Disposition](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition)

```javascript
window.open('http://storage.icyc.cc/avatar/fe5c41e74c316188d95768a837996b5b?attrname=1.png');
```

## 方法二： a 标签

特点：始终为下载，且可以修改文件名。

```javascript
fetch('http://storage.icyc.cc/avatar/fe5c41e74c316188d95768a837996b5b').then(res => {
  res.blob().then(blob => {
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = '自定义名称.png';
    a.click();
  })
})
```

### dataURL 转 Blob

如果是 dataURL (例如 canvas 的预览)，需要转成 Blob 。

```javascript
function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}
```