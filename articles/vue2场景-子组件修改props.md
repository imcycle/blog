# Vue2 场景分析 —— 子组件修改 object props

### 场景如下

父组件把 对象数据 通过 props 传给子组件，子组件修改 对象数据 的属性。

### 问题

子组件是通过什么更新的？

### 代码简化如下

父组件

```vue
<template>
  <div>
    {{ obj.num }}
    <Child :obj="obj">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        obj: { num: 1 }
      };
    },
  };
</script>
```

子组件：

```vue
<template>
  {{ obj.num }}
</template>

<script>
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    mounted() {
      setTimeout(() => {
        this.obj.num = 2;
      }, 3000)
    }
  };
</script>
```

### 分析如何触发更新

Vue 在组件初始化时候，会响应式处理 data 和 props ，然后父子组件都用到了 obj.num ，所以父子组件的 updateWatcher 都会被收集到 obj.num 的 dep 中，当 obj.num 发生了变化，会通知父子组件更新。

### 有没有涉及到 props 的变化呢？

源码中父组件更新时候，会重新调用 render 生成 vnode ，此时生成了子组件的新的 props ，diff 算法对比发现子组件相似后，会调用 prepatch 给 props 重新赋值，赋值的代码是这样的：

```js
for (var i = 0; i < propKeys.length; i++) {
  var key = propKeys[i];
  var propOptions = vm.$options.props; // wtf flow?
  props[key] = validateProp(key, propOptions, propsData, vm);
}
```

所以， ```props[key] = ``` 可以发现， props 只是赋值，没有检查 赋值内容是否变化。意思是，修改对象里的属性，在 props 看来，并没有变化。
