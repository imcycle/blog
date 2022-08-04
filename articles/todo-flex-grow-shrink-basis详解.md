# flex 宽度超出

```html
  <div style="width: 200px; display: flex">
    <div style="flex: 1; display: flex; min-width: 0">
      <div style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 0">
        我为啥省略的这么奇怪。我为啥省略的这么奇怪。
      </div>
      <div style="flex: 0 0 auto">内容不固定</div>
    </div>
    <div style="flex: 0 0 auto">内容不固定</div>
  </div>
```
         // flex-grow 多余空间如何分配。默认 0 ，不分配
            // flex-shrink 空间不够如何压缩。默认 1 ，压缩
            // flex-basis 主轴方向初始大小。默认 auto ，即项目大小（auto 受 width height 影响；content 属性值 表示原始大小，不受 width height 影响）





```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .flex {
      display: flex;
    }
    .flex-1 {
      flex: 1
    }
    .border {
      border: 1px solid #000;
    }
    .border1 {
      border: 1px solid #ff0000;
    }

  </style>
</head>
<body>
  <h2>父(flex) 子(flex1)</h2>

  <div>超出</div>
  <div class="flex border" style="width: 100px;">
    <div class="flex-1">111111111111111111111111111</div>
    <div>xx</div>
  </div>

  <div>子 overflow: hidden; 生效，超出部分截取</div>
  <div class="flex border" style="width: 100px;">
    <div class="flex-1" style="overflow: hidden;">111111111111111111111111111</div>
    <div>xx</div>
  </div>

  <div>子 min-width: 0; 生效，重叠</div>
  <div class="flex border" style="width: 100px;">
    <div class="flex-1" style="min-width: 0;">111111111111111111111111111</div>
    <div>xx</div>
  </div>

  <div>子 width: 0; 生效，重叠</div>
  <div class="flex border" style="width: 100px;">
    <div class="flex-1" style="width: 0;">111111111111111111111111111</div>
    <div>xx</div>
  </div>

  <h2>父(flex) 子(flex1,flex) 孙(flex1)</h2>

  <div>子超出</div>
  <div class="flex border" style="width: 100px;">
    <div class="flex-1 flex border1">
      <div class="flex-1">111111111111111111111111111</div>
      <div>yy</div>
    </div>
    <div>xx</div>
  </div>

  <div>子 overflow: hidden; 生效（子孙都 OH 也生效，但是只对孙 OH 不生效）</div>
  <div class="flex border" style="width: 100px;">
    <div class="flex-1 flex border1" style="overflow: hidden;">
      <div class="flex-1">111111111111111111111111111</div>
      <div>yy</div>
    </div>
    <div>xx</div>
  </div>

  <div>子 min-width: 0; 子生效，孙超出（同样，子孙都 MW0 也生效；只对孙 MW0 不生效）</div>
  <div class="flex border" style="width: 100px;">
    <div class="flex-1 flex border1" style="min-width: 0;">
      <div class="flex-1">111111111111111111111111111</div>
      <div>yy</div>
    </div>
    <div>xx</div>
  </div>

  <div>子 width: 0; 子生效，孙超出（同样，子孙对 W0 也生效；但是，只对孙 W0 也生效）</div>
  <div class="flex border" style="width: 100px;">
    <div class="flex-1 flex border1" style="width: 0;">
      <div class="flex-1">111111111111111111111111111</div>
      <div>yy</div>
    </div>
    <div>xx</div>
  </div>

  <div style="display: flex; width: 100px;">
    <div style="width: 50px;">赛况就分开苏丹赛况就分开苏丹</div>
    <div>赛况就分开苏丹</div>
  </div>

</body>
</html>

```




https://www.w3.org/TR/2016/CR-css-flexbox-1-20160301/#min-size-auto
https://zhuanlan.zhihu.com/p/509874446
https://stackoverflow.com/questions/34352140/what-are-the-differences-between-flex-basis-and-width
https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis
https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html