<template>
  <div
    class="w-full flex justify-center py-2"
    style="height: var(--window-height)"
  >
    <div class="rounded-lg bg-[#fff] shadow-md" :class="`${width}`">
      <!-- 窗口化 -->
      <WindowTopBar @close="emit('close')" @minimize="emit('minimize')" @maximize="emit('maximize')" />
      <div class="h-[var(--window-show-height)] overflow-auto">
        <!-- 插槽 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import WindowTopBar from "@/components/topbar/WindowTopBar.vue";
const emit = defineEmits(["close", "minimize", "maximize"]);
const props = defineProps({
  width: {
    type: String,
    default: "w-[98%]",
  },
});
</script>

<style scoped></style>
