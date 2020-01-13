# BFC

BFC全称是Block Formatting Context，即块格式化上下文。

BFC的一个最重要的效果是，让处于BFC内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

```css
.left {
  background: #73DE80;
  opacity: 0.5;
  border: 3px solid #F31264;
  width: 200px;
  height: 200px;
  float: left;
}

.right {
  background: #EF5BE2;
  opacity: 0.5;
  border: 3px solid #F31264;
  width: 400px;
  min-height: 100px;
}

.box {
  background: #888;
  height: 100%;
  margin-left: 50px;
}

.BFC {
  overflow: hidden;
}

.little {
  background: #fff;
  width: 50px;
  height: 50px;
  margin: 10px;
  float: left;
}
```

```html
 <!-- eg1 -->
<div class='box'>
  <div class='left'> </div>
  <div class='right'> </div>
</div>

<div style="clear: both; padding: 5px 0;"></div>

<!-- eg2 -->
<div class='box BFC'>
  <div class='left'> </div>
  <div class='right'> </div>
</div>

<div style="clear: both; padding: 5px 0;"></div>

<!-- eg3 -->
<div class='box BFC'>
  <div class='left'> </div>
  <div class='right'>
    <div class='little'></div>
    <div class='little'></div>
    <div class='little'></div>
  </div>
</div>

<div style="clear: both; padding: 5px 0;"></div>

<!-- eg4 -->
<div class='box BFC'>
  <div class='left'> </div>
  <div class='right BFC'>
    <div class='little'></div>
    <div class='little'></div>
    <div class='little'></div>
  </div>
</div>
```
