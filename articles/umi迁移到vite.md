# umi 迁移到 vite

## 迁移

### vite 配置

* 添加文件 /vite.config.js
* 添加文件 /index.html

vite.config.js 中

* 支持 react ：@vite/plugin-react
* 支持 less ：https://cn.vitejs.dev/guide/features.html#jsx

#### 分包策略

按页面路由懒加载，打包会自动分割。

```js
import React from 'react';
const Home = React.lazy(() => import('@/layout/Home'));

export default [
  {
    path: '/home',
    element: <HomeArticleList />,
  },
];
```

#### 资源处理

添加统一资源 cdn 域名，打出来的包会统一到这个路径。然后把 index.html 放自己服务器上，节省自己带宽，加快了加载速度。

vite.config.js

```js
export default {
  ...
  base: 'http://storage.icyc.cc/icyc/dist/',
  ...
}
```

打包效果（index.html 为例）：

```html
...
<script type="module" crossorigin src="http://storage.icyc.cc/icyc/dist/assets/index.824f2a6d.js"></script>
<link rel="stylesheet" href="http://storage.icyc.cc/icyc/dist/assets/index.a5ca7804.css">
...
```

#### 公共部分提取

todo..

### 移除 umi

全局搜索 ```from 'umi'``` ，删除。

#### Link 替换

```diff
- import { Link } from 'umi';
+ import { Link } from 'react-router-dom';
```

#### 添加路由

* 添加文件 /src/index.js
* 添加文件 /src/App.jsx

配置路由，使用 dva/router 配置。

#### dva-loading 处理

umi 内置了 dva-loading ，所以要手动安装并使用。

```bash
npm install dva-loading --save
```

```javascript
import createLoading from 'dva-loading';

const app = dva();

app.use(createLoading());
```

## antd 的一些报错处理

### '~antd/es/style/themes/index.less' wasn't found

```bash
[plugin:vite:css] '~antd/es/style/themes/index.less' wasn't found
```

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

### Function 'each' is undefined

```bash
[plugin:vite:css] Function 'each' is undefined
```

less -> 3.7.0+

https://stackoverflow.com/questions/71579811/function-each-is-undefined-antd-vite-with-react

### Inline JavaScript is not enabled. Is it set in your options?

```bash
[plugin:vite:css] Inline JavaScript is not enabled. Is it set in your options?
```

```text
css: {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
    },
  },
},
```

## 弃用 dva

### dva 报错： xx is not a function

开发环境运行没问题，但是打包部署运行报错 ```xx is not a function``` ，xx 是压缩后的命名。

看了下打出来的包，dva 暴露出的这个方法 xx 会被代码调用，xx 是个对象。如果把生成资源中的 ```xx()``` 改为 ```xx.default()``` 就可以正常运行了。

分析原因，估计是 dva 源码 esmodal 兼容不好。没办法改源码，所以暂时无法解决。又看了下 github ，dva 最后一个版本是 2019.12 ，已经很久不维护了。

所以决定弃用 dva 。

### 改造方案

暂且吧 node_modules 下的 dva dva-core dva-loading 三个包移至本地 /src/libs/ 下。

1. 把 node_modules 下的 dva dva-core dva-loading 三个包的 src 移至本地 /src/libs/
2. 修改 /src/libs/dva/ 里的两个文件后缀 .js 改为 .jsx
3. 修改 /src/libs/ 三个包的相互引用方式
4. 修改项目里 import dva 的方式
5. package.json 删除 dva 相关，添加 dva 的依赖包（注意版本）

#### vite 不支持 .js 文件写 JSX 语法原因

https://twitter.com/youyuxi/status/1362050255009816577

## 升级 react-router 到 v6

v6 对比低版本，添加了 createBrowserRouter 模版方式创建路由，以及一些钩子，配合 React Hooks 版本非常好用。

## 最终文件

### /src/index.js

```javascript
import dva from '@/libs/dva';
import createLoading from '@/libs/dva-loading';
import App from './App';

import 'antd/dist/antd.css';
import './global.less';

import admin from '@/models/admin';
import article from '@/models/article';
import user from '@/models/user';

const app = dva();

app.use(createLoading());

app.model(admin);
app.model(article);
app.model(user);

app.router(App);
app.start('#root');
```

### /src/App.jsx

```javascript
import React from 'react';
import routes from '@/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <React.Suspense fallback={<></>}>
      <RouterProvider router={router} />;
    </React.Suspense>
  );
};

export default App;
```
