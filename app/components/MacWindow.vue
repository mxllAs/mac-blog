<template>
  <div
    class="w-full flex justify-center py-2"
    style="height: var(--window-height)"
  >
    <div class="rounded-lg bg-[#fff] shadow-md" :class="`${width}`">
      <!-- 窗口化 -->
      <div
        class="flex items-center justify-between w-full bg-gray-100 px-4 py-2 rounded-t-lg"
      >
        <!-- macOS 风格的窗口控制按钮 -->
        <div class="flex items-center space-x-2">
          <!-- 关闭按钮 -->
          <button
            class="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200"
            title="关闭"
          ></button>
          <!-- 最小化按钮 -->
          <button
            class="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors duration-200"
            title="最小化"
          ></button>
          <!-- 放大按钮 -->
          <button
            class="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-200"
            title="放大"
          ></button>
        </div>
      </div>
      <!-- 插槽 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "w-[98%]",
  },
});
</script>

<style scoped></style>
