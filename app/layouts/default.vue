<template>
  <div class="w-full flex h-screen bg-[#e5e5e5] p-2">
    <main
      class="w-full bg-[#fff] rounded-md shadow-md overflow-auto relative"
      :style="backgroundStyle"
    >
      <header class="h-[42px]">
        <TopBar />
      </header>
      <slot />
      <footer
        class="absolute bottom-0 flex justify-center items-center left-0 right-0"
      >
        <BottomBar />
      </footer>
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useSetingStore } from "~/store/index";
const setingStore = useSetingStore();
// 使用 computed 来响应式地获取背景样式
const backgroundStyle = computed(() => {
  const imageUrl = setingStore.imageStore.value?.action || "/images/bg2.webp";
  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
});
</script>

<style scoped>
</style>
