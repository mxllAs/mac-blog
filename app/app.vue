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
</script>

<style scoped></style>
