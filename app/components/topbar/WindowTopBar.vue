<template>
  <div
    class="flex items-center justify-between w-full bg-gray-100 px-4 py-2 rounded-t-md cursor-move"
  >
    <!-- macOS 风格的窗口控制按钮 -->
    <div class="flex items-center space-x-2">
      <!-- 关闭按钮 -->
      <button
        @click="closeWindow"
        class="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200"
        title="关闭"
      ></button>
      <!-- 最小化按钮 -->
      <button
        @click="minimizeWindow"
        class="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors duration-200"
        title="最小化"
      ></button>
      <!-- 放大按钮 -->
      <button
        @click="maximizeWindow"
        class="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-200"
        title="放大"
      ></button>
    </div>
  </div>
</template>

<script setup>
// window窗口 顶部导航栏
const emit = defineEmits(["close", "minimize", "maximize"]);

// 关闭窗口
const closeWindow = () => {
  emit("close");
};

// 最小化窗口
const minimizeWindow = () => {
  emit("minimize");
};

// 最大化窗口
const maximizeWindow = () => {
  emit("maximize");
};
</script>

<style></style>
