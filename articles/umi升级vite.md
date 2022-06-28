# 1

1. vite @vite/plugin-react
3. less https://cn.vitejs.dev/guide/features.html#jsx

2. router

```diff
- import { Link } from 'umi';
+ import { Link } from 'react-router-dom';
```

umi 内置了 dva-loading 

```js
app.use(createLoading());

```

## 添加文件

* /vite.config.js
* src/index.html
* src/index.jsx
* 支持 react
* 支持 less


## 打包处理

公共提取
分包

## antd 的一些报错处理

### [plugin:vite:css] '~antd/es/style/themes/index.less' wasn't found

```text
resolve: {
  alias: [
    {
      find: /^~/,
      replacement: '',
    },
  ],
},
```

https://github.com/ant-design/pro-components/issues/4880

### [plugin:vite:css] Function 'each' is undefined

less -> 3.7.0+

https://stackoverflow.com/questions/71579811/function-each-is-undefined-antd-vite-with-react

### [plugin:vite:css] Inline JavaScript is not enabled. Is it set in your options?

```text
css: {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
    },
  },
},
```

## dva 报错： xx is not a function

看了下打出来的包

