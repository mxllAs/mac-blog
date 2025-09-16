<template>
  <div class="w-full bg-slate-400 h-full">
    设置图片组件
    <img :src="counterStore.imageStore.action" alt="" />
  </div>
</template>

<script setup>
import { useSetingStore } from "~/store/index";
const counterStore = useSetingStore();
console.log(counterStore.imageStore.value);
</script>

<style scoped></style>
