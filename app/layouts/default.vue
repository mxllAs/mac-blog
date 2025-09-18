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
const config = useRuntimeConfig();
const actionCookie = useCookie("blog_bg_image", {
  default: () => config.public.defaultBgImage,
  maxAge: 60 * 60 * 24 * 30, // 30 天有效期
});
const stopWatch = watch(
  () => actionCookie.value,
  (newVal) => {
    if (newVal) {
      backgroundStyle.value.backgroundImage = `url(${newVal})`;
    }
  }
);
const backgroundStyle = ref({
  backgroundImage: `url(${actionCookie.value})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});
onUnmounted(() => {
  stopWatch();
});
</script>

<style scoped></style>
