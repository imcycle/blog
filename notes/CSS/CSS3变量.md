# CSS3变量

```html
<div class="box">123</div>
```

```css
:root {
  --global-color: #0f0;
  --pane-padding: 5px 42px;
}

.box {
  width: 200px;
  height: 200px;
}

.box {
  --main-bg-color: brown;
  background-color: var(--main-bg-color);
  color: var(--global-color);
}
```
