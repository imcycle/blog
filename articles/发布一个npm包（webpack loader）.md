# 发布一个npm包（webpack loader）

发布一个npm包，webpack loader： reverse-color-loader，实现颜色反转。

## 初始化项目

```shell
mkdir reverse-color-loader
cd ./reverse-color-loader
npm init
```

新建 <code>index.js</code>，手写一个 webpack loader 实现颜色反转。webpack loader 开发文档查看 [编写一个 loader
](https://www.webpackjs.com/contribute/writing-a-loader/)

```js
module.exports = function (source) {
  var newSource = source
    // #000000
    .replace(/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([^0-9a-fA-F]{1})/g, function ($0, $1, $2, $3, $4) {
      return '#' + n16_reverse_n16($1) + n16_reverse_n16($2) + n16_reverse_n16($3) + $4;
    })
    // #000
    .replace(/#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([^0-9a-fA-F]{1})/g, function ($0, $1, $2, $3, $4) {
      return '#' + n16_reverse_n16($1 + $1) + n16_reverse_n16($2 + $2) + n16_reverse_n16($3 + $3) + $4;
    })
    // rbga?(0, 0, 0, 0?)
    .replace(/rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,?\s*(\d*(\.\d*)?)?\s*\)/g, function ($0, $1, $2, $3, $4) {
      return `rgba(${n10_reverse_n10($1)}, ${n10_reverse_n10($2)}, ${n10_reverse_n10($3)}, ${$4 || 1})`;
    })

  return newSource;
};

function n16_reverse_n16(n) {
  var reverseN = (255 - parseInt('0x' + n)).toString(16);
  return reverseN[1] ? reverseN : '0' + reverseN;
}

function n10_reverse_n10(n) {
  return (255 - n);
}
```

目录很简单

<img style="width: 240px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200323163707090-121860733.png" />

申请npm账号 地址 [https://www.npmjs.com/login](https://www.npmjs.com/login)

登陆

```shell
npm login
```

<img style="width: 440px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200323165553107-1546574191.png" />

## 发布

```shell
npm publish
```

<img style="width: 800px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200323170121578-1700686127.png" />

403没权限，需要先去邮箱验证，邮件里的验证地址 __需要在刚刚登陆账号的浏览器打开__ 才能完成验证。

然后再次发布

<img style="width: 500px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200323171127398-1303398492.png" />

打开npm账号查看package

<img style="width: 800px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200323171345615-1342443137.png" />

发布成功

npm包地址：[reverse-color-loader](https://www.npmjs.com/package/reverse-color-loader)

## 看看效果

在项目中引入刚刚发布的loader看看效果

```shell
npm install --save-dev reverse-color-loader
```

webpack中配置使用

```js
{
  test: /\.(css|js)$/,
  use: 'reverse-color-loader'
},
```

页面效果

<img style="width: 300px;" src="https://img2020.cnblogs.com/blog/1141466/202003/1141466-20200323173351979-369124020.png" />

生效，绿色 被反转为 紫色。

<br />
