# v-if 和 v-for 同时使用编译分析

eslint 中 vue/no-use-v-if-with-v-for 规则中不能同时使用 v-if 和 v-for ，例如这样：

```html
<div v-for="item in arr" :key="item.key" v-if="item.show">hello</div>
<div v-for="item in arr" :key="item.key" v-if="show">hello</div>
```

于是查看了编译结果，Vue2 和 Vue3 的编译规则不同。

Vue2 中这样编译，先循环，后判断

![](http://storage.icyc.cc/p/20220128/rc-upload-1643358804270-5.png)

Vue3 中这样编译：先判断，后循环

![](http://storage.icyc.cc/p/20220128/rc-upload-1643358804270-2.png)

## 总结

Vue2 中，先循环，后判断。v-if 会动态取 item.xxx 或者 this.xxx 。如果取 this.xxx 的值，那么先循环就毫无作用，浪费性能。

Vue3 中，先判断，后循环。判断取 this.xxx 。

所以为了保险起见，还是不要 v-if 和 v-for 一块使用。
