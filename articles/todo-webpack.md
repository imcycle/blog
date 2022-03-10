

## 是什么

本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。

## 运行机制 实现原理

## loader

## plugin

## v4 -> v5

## sourceMap 原理

“feel the force” ⇒ Yoda ⇒ “the force feel”

```json
{
  "version": 3,
  "file": "Yoda_output.txt",
  "sources": ["Yoda_input.txt"],
  "names": ["the", "force", "feel"],
  "mappings": "AACKA,IACIC,MACTC;"
}
```

mappings 使用 Base64 VLQ 生成。

Base64 VLQ 原理是：先将 输出位置、输入位置、关键词下标、源文件下标 等信息转成二进制，再使用 base64 编码，生成最终的 srouce map 。

https://blog.fundebug.com/2018/10/12/understanding_frontend_source_map/

http://sourcemapper.qfox.nl/

## devServer 原理



