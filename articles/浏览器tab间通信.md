# 浏览器 tab 间通信

## 同源

### 方案 1 : BroadcastChannel

[MDN BroadcastChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/BroadcastChannel)。BroadcastChannel 接口代理了一个命名频道，可以让指定 origin 下的任意 browsing context 来订阅它。它允许同源的不同浏览器窗口，Tab 页，frame 或者 iframe 下的不同文档之间相互通信。通过触发一个 message 事件，消息可以广播到所有监听了该频道的 BroadcastChannel 对象。

注意用完 close 关闭

```javascript
// a 页面
const channel = new BroadcastChannel('broadcast')
channel.postMessage('发送数据')

// b 页面
const channel = new BroadcastChannel('broadcast')
channel.onmessage = function(e) {
  console.log(e, e.data)
}

```

### 方案 2 : addEventListener storage

```javascript
// a 页面
localStorage.data = 123;

// b 页面
window.addEventListener('storage', function (e) {
  console.log(e);
})

```

### 方案 3 : window.open + window.opener + postmessage

返回打开当前窗口的那个窗口的引用，例如：在 window A 中打开了 window B，B.opener 返回 A.

会形成树状结构。

```javascript
// A B 页面 同样代码
let childWins = []; // 记录子窗口
const openWindow = () => {
  const win = window.open('xxx');
  childWins.push(win);
}

window.addEventListener('message', function (e) {
  if (e === 'xxx') { // 判断是我们需要传递的数据
    // 这里处理数据
    postData(e.data); // 传递给其他节点
  }
})

// 发送数据 or 传递数据
const postData = (data) => {
  // 传递给 child
  const activeChildWins = childWins.filter(w => !w.closed);
  activeChildWins.forEach(w => w.postMessage({ ...data, fromOpener: true }));

  // 传递给 opener
  if (window.opener && !window.opener.closed && data.fromOpener === false) {
    window.opener.postMessave({ ...data, fromOpener: false });
  } 
}
```

### 方案 4 : 本地存储 + 轮询

利用同域间本地数据共享，a 页面修改 IndexedDB 或者 cookie，b 页面轮训查询。

### 方案 3 : ServiceWorker / SharedWorker + postmessage

略

## 非同源

跨域不能直接通信，需要“桥梁”。

### 方案 1 : websocket

通过服务端 websocket 通信。

### 方案 2 : 相同主域下，cookie + 轮询

a.xx.com b.xx.com 是相同主域，domain 设置 xx.com 的部分，数据共享。
