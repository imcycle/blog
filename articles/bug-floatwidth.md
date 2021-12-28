# float 元素 height 0 不占位置问题

在使用 el-row el-col 布局时，遇到了一个问题，el-col 中用 v-if ，item 会错位。

```html
<el-row>
  <el-col :span="6">1</el-col>
  <el-col :span="6">2</el-col>
  <el-col :span="6"></el-col>
  <el-col :span="6">4</el-col>
</el-row>
```

查看结构发现，是用的 float 和 width 百分比实现的，模拟了下场景如下：

```html
<div style="width: 100px; border: 1px solid; overflow: hidden;">
  <span style="float: left; width: 25%;">1</span>
  <span style="float: left; width: 25%;">2</span>
  <span style="float: left; width: 25%;"></span>
  <span style="float: left; width: 25%;">4</span>
</div>
```

效果如下：

![](http://storage.icyc.cc/p/20211228/rc-upload-1640689717494-2.png)


float 没有高度时，不占位置。

### 解决方式

给子元素添加 min-height: 1px;
