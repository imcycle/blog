# Vue2 组件设计 —— children 传值给父组件

使用 element-ui 组件 select 的时候，突然想到一个问题，点击 option 怎么传值给 select 呢？不止是 select 和 option ，element-ui 中嵌套父子关系的组件有不少呢。

经过分析，共想到四种思路，其中，第三种第四种推荐使用，element-ui 用的第四种。

## 第一种

父组件通过 this.$children 或者 this.$slots 拿到子节点信息，便利子节点并添加事件。

缺点：1.不好确认哪些子组件需要事件（例如，以前是 option 组件需要添加事件，现在新功能 option1 组件也需要添加事件）；2.添加事件时机不好控制；

## 第二种

创建全局 eventBus ，父组件注册，子组件触发。

缺点：同时存在多个父组件，命名冲突。

## 第三种

使用 provide/inject 。父组件 provide 暴露出去，子组件 inject 引入并调用。

Vue2 源码 v2.6.10 路径 /src/core/instance/inject.js 中 resolveInject 方法是这样实现的：

```javascript
const provideKey = inject[key].from
let source = vm
while (source) {
  if (source._provided && hasOwn(source._provided, provideKey)) {
    result[key] = source._provided[provideKey]
    break
  }
  source = source.$parent
}
```

一层层往上找，找到则停止。所以如果同时存在多个，找的是最近的一个。

## 第四种

父组件 this.$on('fn', fn) 注册事件，封装一个子组件找父组件的方法，并触发。

例如 element v2.15.7 是这样做的：

```javascript
// 父组件 注册点击事件
this.$on('handleOptionClick', fn)

// 子组件 mixins 点击调用
this.dispatch('componentName', 'handleOptionClick', value)

// dispatch 方法的封装
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
```

ps: element 为什么不用 provide/inject ，看了下源码 /src/mixins/emitter.js ，大概是因为 2016 年开发的。
