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
    >
      <template #title>
        <div
          ref="modalTitleRef"
          class="flex items-center justify-between w-full bg-gray-100 px-4 py-2 rounded-t-lg cursor-move"
        >
          <!-- macOS 风格的窗口控制按钮 -->
          <div class="flex items-center space-x-2">
            <!-- 关闭按钮 -->
            <button
              @click="open = false"
              class="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200"
              title="关闭"
            ></button>
            <!-- 最小化按钮 -->
            <button
              @click="open = false"
              class="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors duration-200"
              title="最小化"
            ></button>
            <!-- 放大按钮 -->
            <button
              @click="open = false"
              class="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-200"
              title="放大"
            ></button>
          </div>
        </div>
      </template>
      <div class="w-full h-full p-[20px]">
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
watch([x, y], () => {
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
watch(isDragging, () => {
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
