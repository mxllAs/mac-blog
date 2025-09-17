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
import { useSetingStore } from "~/store/seting.js";
const config = useRuntimeConfig();
const setingStore = useSetingStore();
const stopWatch = watch(
  () => setingStore.imageStore.value?.action,
  (newVal) => {
    if (newVal) {
      backgroundStyle.value.backgroundImage = `url(${newVal})`;
    }
  }
);
const backgroundStyle = ref({
  backgroundImage: `url(${config.public.defaultBgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});
onMounted(() => {
  const imageUrl = setingStore.imageStore.value?.action || config.public.defaultBgImage;
  backgroundStyle.value.backgroundImage = `url(${imageUrl})`;
});
onUnmounted(() => {
  stopWatch();
});
</script>

<style scoped></style>
