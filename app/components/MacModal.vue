<template>
  <div>
    <a-modal
      ref="modalRef"
      v-model:open="open"
      :width="props.width"
      :closable="false"
      :body-style="bodyStyle"
      :mask-style="maskStyle"
      wrapClassName="mac-modal-wrapper"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <template #title>
        <div ref="modalTitleRef">
          <!-- macOS 风格的窗口控制按钮 -->
          <WindowTopBar
            :drag="props.drag"
            @close="closeWindow"
            @minimize="minimizeWindow"
            @maximize="maximizeWindow"
          />
        </div>
      </template>
      <div class="w-full h-full">
        <slot></slot>
      </div>
      <template #modalRender="{ originVNode }">
        <div :style="transformStyle">
          <component :is="originVNode" />
        </div>
      </template>
      <template #footer></template>
    </a-modal>
  </div>
</template>
<script setup>
import WindowTopBar from "@/components/topbar/WindowTopBar.vue";
import { ref, computed, watch, watchEffect } from "vue";
import { useDraggable } from "@vueuse/core";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "800px",
  },
  drag: {
    type: Boolean,
    default: true,
  },
});
const open = defineModel({
  type: Boolean,
  default: false,
});
//初始化样式
const bodyStyle = ref({
  padding: "0",
  margin: "0",
});
const maskStyle = ref({
  background: "transparent",
});
// 关闭窗口
const closeWindow = () => {
  open.value = false;
};
// 最小化窗口
const minimizeWindow = () => {
  open.value = false;
};
// 放大窗口
const maximizeWindow = () => {
  open.value = false;
};
// 拖拽相关
const modalTitleRef = ref(null);
const { x, y, isDragging } = useDraggable(modalTitleRef);
const startX = ref(0);
const startY = ref(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
});
const watchXY =  watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = modalTitleRef.value.getBoundingClientRect();
    const modalElement = document.querySelector(
      ".mac-modal-wrapper .ant-modal-content"
    );
    const modalRect = modalElement
      ? modalElement.getBoundingClientRect()
      : { height: 400 };
    dragRect.value.left = 8; // 左边距离屏幕8px
    dragRect.value.right = bodyRect.width - titleRect.width - 8; // 右边距离屏幕8px
    dragRect.value.top = 50; // 上边距离屏幕50px
    dragRect.value.bottom = bodyRect.height - modalRect.height - 90; // 下边距离屏幕90px
    preTransformX.value = transformX.value;
    preTransformY.value = transformY.value;
  }
  startedDrag.value = true;
});
const watchIsDragging = watch(isDragging, () => {
  if (!isDragging) {
    startedDrag.value = false;
  }
});
watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
      preTransformX.value +
      Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
      startX.value;
    transformY.value =
      preTransformY.value +
      Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
      startY.value;
  }
});
const transformStyle = computed(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
  };
});
onUnmounted(() => {
  watchXY();
  watchIsDragging();
});
</script>

<style>
.ant-modal .ant-modal-header {
  margin: 0 !important;
}
/* 强制移除 Ant Design Modal 的默认 padding */
.mac-modal-wrapper .ant-modal-body {
  padding: 0 !important;
  margin: 0 !important;
}

.mac-modal-wrapper .ant-modal-content {
  padding: 0 !important;
}

/* 确保模态框可以被拖拽移动 */
.mac-modal-wrapper .ant-modal {
  transform-origin: center center;
  transition: none;
}
</style>
