# flex 布局扩大压缩分配规则分析（grow shrink basis）

version: 2020-08-12（不同版本 flex 规则有差异，例如 flex-basis: auto 的定义）

## grow shrink basis 含义

* flex-grow 多余空间如何分配。默认 0 ，不分配
* flex-shrink 空间不够如何压缩。默认 1 ，压缩
* flex-basis 主轴方向初始大小。默认 auto ，即项目大小（auto 受 width height 影响；content 属性值 表示原始大小，不受 width height 影响）

以 basis 为基础，如果有剩余空间，按照 grow 的比例分配；如果空间不够，按照 shrink 的比例压缩。

例如现在有两个div，有多余空间：

**w1 = basis1 + (basis1 * grow1) / (basis1 * grow1 + basis2 * grow2) * more**

简单来说，如果 grow 都是 1 ，有多余空间的话，谁 basis 大，谁就分的多。

flex-basis 属性比 width 优先级高。

## 简写

注意：```flex: 1;``` 代表的是 ```flex: 1 1 0;```，不是 ```flex: 1 1 auto;``` 。

|简写|含义|
|-|-|
|flex: initial|flex: 0 1 auto|
|flex: auto|flex: 1 1 auto|
|flex: none|flex: 0 0 auto|
|flex: positive-number|flex: positive-number positive-number 0|

## 例子分析

### 例子 1

```html
<div style="display: flex; width: 100px;">
  <div style="flex: 1;">我是十个字我是十个字</div>
  <div style="flex: 1;">我</div>
</div>
```

解析：两个 basis 都是 0 ，grow 都是 1 ，所以，一人 50px 。

### 例子 2

```html
<div style="display: flex; width: 100px;">
  <div style="width: 50px;">我是十个字我是十个字</div>
  <div>我是五个字</div>
</div>
```

解析：

1. 一个字大概 16px ，明显超过夫盒子 100px ，所以考虑压缩
2. 看 basis ，默认 auto 。 div1 设置了 width 50 ，所以 basis 是 50 ；div2 5 个字，所以 basis 大约 80 。
3. 一共超出 ```50 + 80 - 100 = 30```。
4. 看 shrink ，默认都是 1 ，按 basis 比例压缩。
5. div1 需要压缩 ```50 / (50 + 80) * 30 = 11.54``` ；同理，div 2 需要压缩 18.46
6. 所以最终 div1 宽度 38.46 , div2 宽度 61.54

### 例子 3

```html
<div style="display: flex; width: 100px">
  <div>我是十个字我是十个字</div>
  <div>我是十个字我是十个字</div>
</div>
<div style="display: flex; width: 100px">
  <div style="flex: 1">我是十个字我是十个字</div>
  <div style="flex: 1">我是十个字我是十个字</div>
</div>
```

解析：虽然上下效果一样，但是上面走的 压缩 逻辑，下面走的 扩大 逻辑。

## 关于宽度溢出

一般情况，如果宽度不足，按照 flex-shrink 规则压缩，但是遇到**长单词**时，可能会宽度溢出，如下：

```html
<div style="display: flex; width: 40px">
  <div style="flex: 1">aaaaaaaaaaaaaaa</div>
  <div style="flex: 1">bbbbbbbbbbbbbbb</div>
</div>
```

上面例子会超过 40px ，子节点超出，为什么呢？

* flex: 1; 是 flex: 1 1 0; 的缩写, flex-basisi 值为 0
* **默认情况下，flex 选项不会缩小低于他的最小内容尺寸**
* 连续字母或数字，会被认为是一个单词。即为最小尺寸
* 所以长度超出。

### 防止溢出

```flex-basis: 0;``` 依然会有最小内容限制，导致宽度溢出，如下方法可以防止溢出：

* 方法一：子盒子添加 ```min-width: 0;``` ，shrink 压缩时，最小到 0 。
* 方法二：子盒子添加 ```width: 0;```，走 grow 扩大逻辑，以 basis 为 0 计算。

这两种方法，只是防止子盒子实际宽度溢出，但子盒子的内容还会溢出。需要添加 ```overflow: hidden;```

## 其他例子

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

## 参考

* https://www.w3.org/TR/2016/CR-css-flexbox-1-20160301/#min-size-auto
* https://zhuanlan.zhihu.com/p/509874446
* https://stackoverflow.com/questions/34352140/what-are-the-differences-between-flex-basis-and-width
* https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis
* https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
