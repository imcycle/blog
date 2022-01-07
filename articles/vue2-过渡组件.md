# vue2 源码解析 —— 过渡组件 transition transition-group FLIP

最近需要实现手风琴效果，想了想实现挺麻烦，主要难点在于如何动态设置过渡高度。

看了 UI 组件库的 Collapse 组件的源码，发现用的是 vue2 原生组件 transition 。

于是又看了 transition 组件源码，transition-group 组件源码，以及内置的 FLIP 技术。

## Element Collapse 折叠面板组件

折叠效果使用 transition + height 变化就能实现，不过如果封装成组件，就**需要动态获取内容高度**，这是一个难点。

collapse-item 使用自己封装的过渡组件 collapse-transition 。

collapse-transition 组件使用了 vue 原生组件 transition ，调用 transition 组件的生命周期。组件的生命周期入参传入了子节点，所以可以取到高度，所以实现方式如下：

折叠：

1. beforeLeave: ```height: scrollHeight, overflow: hidden```
2. leave: ```height: 0```
3. afterLeave: ```height: '', overflow: 还原```

展开：

1. beforeEnter: ```height: 0, overflow: hidden```
2. enter: ```height: scrollHeight```
3. afterEnter: ```height: '', overflow: 还原```

## vue2 transition 组件

文档：[单元素/组件的过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%8D%95%E5%85%83%E7%B4%A0-%E7%BB%84%E4%BB%B6%E7%9A%84%E8%BF%87%E6%B8%A1)

需要注意的是，以下条件才会触发生命周期：

* 条件渲染 (使用 v-if)
* 条件展示 (使用 v-show)
* 动态组件
* 组件根节点

由于 transition 组件是 vue 自己封装的，所以知道自己组件的展示隐藏时机，所以可以很自然的实现这套 api。但是又有个疑问，过渡时间是开发自己设置的，vue 怎么知道何时动画结束呢？

于是继续翻阅源码：

```javascript
function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  ...
}
```

可以用 getComputedStyle transitionDuration 拿到过渡时间。

## vue2 transition-group 组件

vue 还提供了列表的过渡组件 transition-group 。

文档：[列表过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E8%BF%87%E6%B8%A1)

特点是

* 唯一的 key
* 过渡的类和方法会作用到内部的元素

文档中实现了很炫酷的效果，于是根据文档提示，找到了 FLIP 。

### FLIP 动画过渡

transition-group 使用 FLIP 将元素从之前位置平滑的过渡到新的位置。

FLIP: first last invert play 。

实现原理是：

1. 记录移动前位置
2. 记录移动后位置
3. 添加 transform 还原到移动前位置
4. 删除 transform 属性，即播放动画

vue 中源码如下

第一步：

```javascript
render: function render (h) {
  ...
  c$1.data.pos = c$1.elm.getBoundingClientRect();
  ...
}
```

第二步：

```javascript
function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}
```

第三步：

```javascript
function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}
```

第四步：

```javascript
children.forEach(function (c) {
  ...
  var s = el.style;
  s.transform = s.WebkitTransform = s.transitionDuration = '';
  ...
});
```

## 总结

transition 组件适用于 一个子节点的显示隐藏；transition-group 组件适用于多个字节点的显示隐藏，还使用 FLIP 优化过渡效果。
