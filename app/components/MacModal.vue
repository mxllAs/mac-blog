<template>
  <div v-if="isOpen">
    <a-modal v-model:open="isOpen" :width="width" :closable="false" :footer="null" :mask="false" :maskClosable="false"
      :zIndex="zIndex" wrapClassName="mac-modal-wrapper" :wrap-style="{ pointerEvents: 'none' }"
      :body-style="{ padding: 0 }">
      <template #title>
        <div ref="modalTitleRef" class="cursor-default w-full" @mousedown.capture="emit('focus')">
          <WindowTopBar :drag="drag" @close="isOpen = false" @minimize="isOpen = false" @maximize="emit('maximize')" />
        </div>
      </template>

      <div class="w-full h-full pointer-events-auto" @mousedown.capture="emit('focus')">
        <slot></slot>
      </div>

      <template #modalRender="{ originVNode }">
        <div :style="transformStyle" class="pointer-events-auto">
          <component :is="originVNode" />
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import WindowTopBar from "@/components/topbar/WindowTopBar.vue";
import { ref, computed, watch, watchEffect, onUnmounted } from "vue";
import { useDraggable } from "@vueuse/core";

const props = defineProps({
  title: { type: String, default: "" },
  width: { type: String, default: "800px" },
  drag: { type: Boolean, default: true },
  zIndex: { type: Number, default: 1000 },
});

const isOpen = defineModel('open', { type: Boolean, default: false });
const emit = defineEmits(['focus', 'minimize', 'maximize']);

// --- 拖拽逻辑 (保持不变) ---
const modalTitleRef = ref(null);
const { x, y, isDragging } = useDraggable(modalTitleRef);
const startX = ref(0);
const startY = ref(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });

const watchXY = watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    if (modalTitleRef.value) {
      // 简化版边界计算
      dragRect.value.left = 0;
      dragRect.value.right = bodyRect.width;
      dragRect.value.top = 0;
      dragRect.value.bottom = bodyRect.height;
      preTransformX.value = transformX.value;
      preTransformY.value = transformY.value;
    }
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
    transformX.value = preTransformX.value + (x.value - startX.value);
    transformY.value = preTransformY.value + (y.value - startY.value);
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
/* 终极样式覆盖 */
.mac-modal-wrapper {
  pointer-events: none !important;
}

.mac-modal-wrapper .ant-modal {
  pointer-events: auto !important;
  padding-bottom: 0 !important;
}

.ant-modal .ant-modal-header {
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border: none !important;
}

.mac-modal-wrapper .ant-modal-content {
  padding: 0 !important;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.mac-modal-wrapper .ant-modal-body {
  padding: 0 !important;
  margin: 0 !important;
}
</style>