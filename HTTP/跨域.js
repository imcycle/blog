/**
 * 1. JSONP
 * 2. cors
 * 3. postMessage
 * 4. websocket
 * 5. Node中间件代理(两次跨域)
 * 6. nginx反向代理
 * 7. window.name + iframe
 * 8. location.hash + iframe
 * 9. document.domain + iframe
 */



/**
 * JSONP
 * window放个方法 传给后端
 * 后端返回 xxx('数据')
 * 由于script发请求，所以xxx('数据')会自动执行，前端就拿到了数据
 */

// index.html
function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    window[callback] = function (data) {
      resolve(data)
      document.body.removeChild(script)
    }
    params = { ...params, callback } // wd=b&callback=show
    let arrs = []
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arrs.join('&')}`
    document.body.appendChild(script)
  })
}
jsonp({
  url: 'http://localhost:3000/say',
  params: { wd: 'Iloveyou' },
  callback: 'show'
}).then(data => {
  console.log(data)
})

// server.js
let express = require('express')
let app = express()
app.get('/say', function (req, res) {
  let { wd, callback } = req.query
  console.log(wd) // Iloveyou
  console.log(callback) // show
  res.end(`${callback}('我不爱你')`)
})
app.listen(3000)



/**
 * cors
 * CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现。
 * 即服务端设置 Access-Control-Allow-Origin
 */


/**
 * postMessage
 */

// // a.html
// <iframe src = "http://localhost:4000/b.html" frameborder = "0" id = "frame" onload = "load()" ></iframe > //等它加载完触发一个事件
// //内嵌在http://localhost:3000/a.html
// <script>
//   function load() {
//     let frame = document.getElementById('frame')
//     frame.contentWindow.postMessage('我爱你', 'http://localhost:4000') //发送数据
//       window.onmessage = function(e) { //接受返回数据
//       console.log(e.data) //我不爱你
//     }
//   }
// </script>

// // b.html
// window.onmessage = function (e) {
//   console.log(e.data) //我爱你
//   e.source.postMessage('我不爱你', e.origin)
// }


/**
 * websocket
 */

/**
 * Node中间件代理(两次跨域)
 */

/**
 * nginx反向代理
 */

/**
 * window.name + iframe
 */

/**
* location.hash + iframe
*/

/**
 * document.domain + iframe
 */