<template>
  <div
    class="w-full flex justify-center py-2"
    style="height: var(--window-height)"
  >
    <div class="rounded-lg bg-[#fff] shadow-md" :class="`${width}`">
      <!-- 窗口化 -->
      <WindowTopBar
        @close="emit('close')"
        @minimize="emit('minimize')"  
        @maximize="emit('maximize')"
      />
      <div
        class="h-[var(--window-show-height)] overflow-y-auto overflow-x-hidden bg-cover"
        :style="`background-image: url(${bgImg}); scrollbar-color: ${scrollbarColor}`"
      >
        <!-- 插槽 - 添加过渡动画 -->
        <transition name="mac-window-content" mode="out-in" appear>
          <slot></slot>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';
import defaultBgImg from "@/assets/images/def-list-bg.webp";
import WindowTopBar from "@/components/topbar/WindowTopBar.vue";

const emit = defineEmits(["close", "minimize", "maximize"]);

const props = defineProps({
  width: {
    type: String,
    default: "w-[98%]",
  },
  bgImg: {
    type: String,
    default: defaultBgImg,
  },
  scrollbarColor: {
    type: String,
    default: "rgba(0, 0, 0, 0.25) transparent",
  },
});

// 解构props以便在模板中直接使用
const { width, bgImg, scrollbarColor } = toRefs(props);
</script>

<style scoped>
/* macOS 风格的内容过渡动画 */
.mac-window-content-enter-active,
.mac-window-content-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.mac-window-content-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  filter: blur(4px);
}

.mac-window-content-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1.05);
  filter: blur(4px);
}

.mac-window-content-enter-to,
.mac-window-content-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

/* 窗口整体的入场动画 */
.rounded-lg {
  animation: windowAppear 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes windowAppear {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(30px);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
}

/* 悬停效果增强 */
.rounded-lg:hover {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}
</style>
