<template>
  <div>
    <!-- MacOS Hello 加载动画 -->
    <!-- <div v-if="once"> -->
    <!-- <MacOSHelloAnimation /> -->
    <!-- </div> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// import MacOSHelloAnimation from "~/components/MacOSHelloAnimation.vue";

// 全局监听ESC键，按下时回到首页
onMounted(() => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      navigateTo("/");
    }
  };
  document.addEventListener("keydown", handleKeyDown);
  // 组件卸载时移除监听器
});
onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>

<style scoped></style>
