<template>
  <div>
    <a-modal
      ref="modalRef"
      v-model:open="isOpen"
      :width="width"
      :closable="false"
      :body-style="bodyStyle"
      :mask-style="maskStyle"
      wrapClassName="mac-modal-wrapper"
      :maskClosable="false"
      :destroyOnClose="true"
      :mask="false" 
      :zIndex="zIndex"
    >
      <template #title>
        <div ref="modalTitleRef" class="cursor-default">
          <WindowTopBar
            :drag="drag"
            @close="isOpen = false"
            @minimize="isOpen = false"
            @maximize="emit('maximize')"
          />
        </div>
      </template>
      
      <div class="w-full h-full">
        <slot></slot>
      </div>

      <template #modalRender="{ originVNode }">
        <div 
          :style="transformStyle" 
          @mousedown.capture="emit('focus')" 
        >
          <component :is="originVNode" />
        </div>
      </template>
      <template #footer></template>
    </a-modal>
  </div>
</template>

<script setup>
import WindowTopBar from "@/components/topbar/WindowTopBar.vue";
import { ref, computed, watch, watchEffect, onUnmounted } from "vue";
import { useDraggable } from "@vueuse/core";

// 🟢 确保 props 里有 zIndex
const props = defineProps({
  title: { type: String, default: "" },
  width: { type: String, default: "800px" },
  drag: { type: Boolean, default: true },
  zIndex: { type: Number, default: 1000 },
});

const isOpen = defineModel('open', { type: Boolean, default: false });

// 🟢 确保 emits 里有 focus
const emit = defineEmits(['focus', 'minimize', 'maximize']);

const bodyStyle = ref({ padding: "0", margin: "0" });
const maskStyle = ref({ background: "transparent", pointerEvents: "none" });

// --- 拖拽逻辑 (无需修改) ---
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
    const titleRect = modalTitleRef.value.getBoundingClientRect();
    const modalElement = document.querySelector(".mac-modal-wrapper .ant-modal-content");
    const modalRect = modalElement ? modalElement.getBoundingClientRect() : { height: 400 };
    dragRect.value.left = 8;
    dragRect.value.right = bodyRect.width - titleRect.width - 8;
    dragRect.value.top = 50;
    dragRect.value.bottom = bodyRect.height - modalRect.height - 90;
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
    transformX.value = preTransformX.value + Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) - startX.value;
    transformY.value = preTransformY.value + Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) - startY.value;
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
/* 样式部分非常关键，请确保完全一致 */
.ant-modal .ant-modal-header { margin: 0 !important; }
.mac-modal-wrapper .ant-modal-body { padding: 0 !important; margin: 0 !important; }
.mac-modal-wrapper .ant-modal-content { padding: 0 !important; }

/* 🟢 窗口本身接收点击 */
.mac-modal-wrapper .ant-modal { transform-origin: center center; transition: none; pointer-events: auto; }

/* 🟢 包装器不阻挡点击 (点击穿透) */
.mac-modal-wrapper { pointer-events: none; }
</style>