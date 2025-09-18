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
import MacOSHelloAnimation from "~/components/MacOSHelloAnimation.vue";
// import { useAnimationStore } from "~/store/animation.js";
// const animationStore = useAnimationStore();
// const once = computed(() => animationStore.once);
</script>

<style scoped></style>
