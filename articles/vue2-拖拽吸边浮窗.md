# 基于 Vue2 的拖拽吸边浮窗实现

Vue.js v2.6.14

功能：屏幕内拖拽移动，松手自动吸边。

拖拽中使用 translate 移动小块，鼠标抬起时设置浮窗最终位置 inset （低版本浏览器不支持，改用 top bottom left right ）和设置对于最终位置偏移到鼠标位置的偏移位置，然后设置 0.2 秒过度，还原偏移。

```vue
<template>
  <div>
    红色拖拽区域
    <div class="drag-box" ref="dragBox">
      <div class="drag-btn" ref="dragBtn"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initDrag()
  },
  methods: {
    initDrag() {
      let isDraging = false;  // 大于 100 毫秒算拖拽，否则算点击

      const moveBox = this.$refs.dragBox;
      const moveBtn = this.$refs.dragBtn;
      const viewportSafeVal = 10;

      let docWidth, docHeight;  // 视口宽高
      let startMouseX, startMouseY;  // 鼠标按下时，对于视口的 x y
      let startMouseLeftInBox, startMouseRightInBox, startMouseTopInBox, startMouseBottomInBox;  // 鼠标按下时，相对于 box 的距离
      let mouseMinX, mouseMaxX, mouseMinY, mouseMaxY;  // 鼠标移动生效边界

      // 计算边界
      const calc = (val, min, max, safe) => {
        if (val < min + safe) {
          return min + safe;
        } else if (val > max - safe) {
          return max - safe;
        } else {
          return val;
        }
      };

      let timer;
      const mousedown = e => {
        isDraging = false;
        clearTimeout(timer);
        timer = setTimeout(() => isDraging = true, 100);

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);

        docWidth = document.documentElement.clientWidth;
        docHeight = document.documentElement.clientHeight;

        startMouseX = e.clientX;
        startMouseY = e.clientY;

        const boxRect = moveBox.getBoundingClientRect();
        startMouseLeftInBox = e.clientX - boxRect.left;
        startMouseRightInBox = boxRect.width - startMouseLeftInBox;
        startMouseTopInBox = e.clientY - boxRect.top;
        startMouseBottomInBox = boxRect.height - startMouseTopInBox;

        mouseMinX = startMouseLeftInBox;
        mouseMaxX = docWidth - startMouseRightInBox;
        mouseMinY = startMouseTopInBox;
        mouseMaxY = docHeight - startMouseBottomInBox;

        moveBox.style.transition = '0s';
      };

      const mousemove = e => {
        if (!isDraging) return;

        let mouseX = calc(e.clientX, mouseMinX, mouseMaxX, viewportSafeVal);
        let mouseY = calc(e.clientY, mouseMinY, mouseMaxY, viewportSafeVal);

        moveBox.style.transform = `translate(${mouseX - startMouseX}px, ${mouseY - startMouseY}px)`;
      };

      const mouseup = e => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);

        if (!isDraging) {
          this.collapse = !this.collapse;
          return;
        }

        let mouseX = calc(e.clientX, mouseMinX, mouseMaxX, viewportSafeVal);
        let mouseY = calc(e.clientY, mouseMinY, mouseMaxY, viewportSafeVal);

        // 鼠标抬起时 所属区域
        const isLeft = e.clientX < docWidth / 2;
        const isTop = e.clientY < docHeight / 2;
        // 鼠标抬起时 box 位置
        const left = mouseX - startMouseLeftInBox;
        const right = docWidth - mouseX - startMouseRightInBox;
        const top = mouseY - startMouseTopInBox;
        const bottom = docHeight - mouseY - startMouseBottomInBox;
        // 计算最终后 box 位置（带单位）
        let lefted, righted, toped, bottomed, translateX, translateY;
        lefted = righted = toped = bottomed = 'auto';
        translateX = translateY = 0;

        if (isLeft) {
          lefted = `${viewportSafeVal}px`;
          translateX = `${left - viewportSafeVal}px`;
        } else {
          righted = `${viewportSafeVal}px`;
          translateX = `${viewportSafeVal - right}px`;
        }

        if (isTop) {
          toped = `${top / docHeight * 100}%`;
        } else {
          bottomed = `${bottom / docHeight * 100}%`;
        }

        moveBox.style = `top: ${toped}; right: ${righted}; bottom: ${bottomed}; left: ${lefted}; transform: translate(${translateX}, ${translateY})`;

        setTimeout(() => {
          moveBox.style.transition = '0.2s';
          moveBox.style.transform = 'translate(0, 0)';
        });
      };

      moveBtn.addEventListener('mousedown', mousedown);
    },
  },
}
</script>

<style>
.drag-box {
  position: fixed;
  inset: 100px auto auto 10px;
  width: 100px;
  height: 100px;
  background: yellow;
}

.drag-btn {
  width: 40px;
  height: 40px;
  background: red;
  margin-left: 20px;
  margin-top: 20px;
  color: white;
  cursor: move;
  user-select: none;
}
</style>
```
