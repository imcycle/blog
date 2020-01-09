[注释]:
  https://developer.mozilla.org/zh-CN/docs/Web/API/History

### History
History 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。

---

#### 属性
History 接口不继承于任何属性。
```
History.length  // 只读
```
> 返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页。


```
History.scrollRestoration
```
> 允许Web应用程序在历史导航上显式地设置默认滚动恢复行为。此属性可以是自动的（auto）或者手动的（manual）。

```
History.state  // 只读
```
> 返回一个表示历史堆栈顶部的状态的值。这是一种可以不必等待popstate 事件而查看状态而的方式。

#### 方法
History接口不继承任何方法。

```
History.back()
```
> 前往上一页, 用户可点击浏览器左上角的返回按钮模拟此方法. 等价于  __history.go(-1)__ .  
> Note: 当浏览器会话历史记录处于第一页时调用此方法没有效果，而且也不会报错。

```
History.forward()
```
> 在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进按钮模拟此方法. 等价于 __history.go(1)__ .  
> Note: 当浏览器历史栈处于最顶端时( 当前页面处于最后一页时 )调用此方法没有效果也不报错。

```
History.go()
```
> 当整数参数超出界限 或 参数错误 时, 不生效也不报错.  
> 参数为空时, 刷新页面.  

```
History.pushState()
```
> 按指定的名称和URL（如果提供该参数）将数据push进会话历史栈，数据被DOM进行不透明处理；你可以指定任何可以被序列化的javascript对象。

```
History.replaceState()
```
> 按指定的数据，名称和URL(如果提供该参数)，更新历史栈上最新的入口。这个数据被DOM 进行了不透明处理。你可以指定任何可以被序列化的javascript对象。


