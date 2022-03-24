# Vue2 —— 组件的 key 使用 item 有什么影响

"vue": "2.6.14"

众所周知，v-for 不能使用 index 作为 key ，会重复渲染，进而影响性能。

那么，使用 item 作为 key 呢？

```html
<div>
  <div v-for="item in list" :key="item">{{item.name}}</div>
</div>
```

## 源码里的限制

翻阅源码，发现源码中对 key 做了类型校验，会有警告。目录 /src/core/vdom/create-element.js 中的 _createElement 方法。

```js
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    if (!__WEEX__ || !('@binding' in data.key)) {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      )
    }
  }
```

除此之外，源码中并没有对 key 做任何操作。

## item key 对渲染的影响

在渲染方面，item 一般是引用类型，如果数据重新生成，数据地址会变化，导致 key 不相等。vue diff 算法比对的是 tag 和 key ，会认为新老节点不是相似节点，触发创建节点。这点比使用 index 作为 key 更加消耗新能，index 作为 key 也仅仅是触发了更新节点。

例如点击搜索按钮重新请求列表，接口重新请求数据，即使数据完全一样，列表也会**重新渲染**。不是更新渲染。

## 总结

* 开发环境 key 会有类型校验，类型不是 string/number 的都会有警告
* 数据重新生成时，会导致创建新节点
