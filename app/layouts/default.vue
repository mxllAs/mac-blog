<template>
  <div
    class="relative w-full h-screen overflow-hidden select-none font-sans"
    @contextmenu.prevent="showContextMenu"
    @click="closeMenu"
  >
    <Transition name="bg-fade">
      <div
        :key="currentBg"
        class="absolute inset-0 z-0 bg-cover bg-center transform scale-105"
        :style="{ backgroundImage: `url(${currentBg})` }"
      ></div>
    </Transition>

    <div class="absolute top-0 left-0 right-0 z-50 h-8">
      <TopBar />
    </div>

    <div class="relative z-10 w-full h-full pt-10 pb-24">
      <slot />
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 z-50 flex justify-center pb-2 pointer-events-none"
    >
      <div class="pointer-events-auto">
        <BottomBar />
      </div>
    </div>

    <DesktopMenu v-model:visible="menuVisible" :x="menuX" :y="menuY" />
  </div>
</template>

<script setup>
import { useSetingStore } from "~/store/seting.js";

const setingStore = useSetingStore();

// 🟢 核心修复:
// 你的 Store 里叫 selectedImage (是一个 Cookie Ref)，不是 currentBg
const currentBg = computed(
  () => setingStore.selectedImage.value || "/images/bg2.webp"
);

// 右键菜单状态
const menuVisible = ref(false);
const menuX = ref(0);
const menuY = ref(0);

const showContextMenu = (e) => {
  menuVisible.value = true;

  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  const menuWidth = 224;
  const menuHeight = 200;

  if (e.clientX + menuWidth > winWidth) {
    menuX.value = e.clientX - menuWidth;
  } else {
    menuX.value = e.clientX;
  }

  if (e.clientY + menuHeight > winHeight) {
    menuY.value = e.clientY - menuHeight;
  } else {
    menuY.value = e.clientY;
  }
};

const closeMenu = () => {
  menuVisible.value = false;
};
</script>

<style scoped>
/* 背景淡入淡出动画 */
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 1s ease-in-out; /* 1秒慢速过渡 */
}

.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
}

.bg-fade-enter-to,
.bg-fade-leave-from {
  opacity: 1;
}
</style>
