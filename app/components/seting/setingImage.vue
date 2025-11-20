<template>
  <div class="w-full h-full p-6 bg-gray-50/80 backdrop-blur-sm rounded-lg">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">背景图片设置</h3>

    <!-- 当前选中的背景图片预览 -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">当前背景</h4>
      <div
        class="relative w-32 h-20 rounded-lg overflow-hidden border-2 border-blue-500 shadow-md"
      >
        <img
          :src="currentImage"
          alt="当前背景"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-blue-500/20 flex items-center justify-center"
        >
          <span
            class="text-white text-xs font-medium bg-blue-500 px-2 py-1 rounded"
            >当前</span
          >
        </div>
      </div>
    </div>

    <!-- 背景图片选择网格 -->
    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-600 mb-3">选择背景图片</h4>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div
          v-for="(image, index) in imageList"
          :key="index"
          @click="selectImage(image)"
          class="relative group cursor-pointer"
        >
          <div
            class="relative w-full h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:border-blue-400 hover:shadow-lg"
            :class="
              isSelected(image)
                ? 'border-blue-500 shadow-md'
                : 'border-gray-200'
            "
          >
            <img
              :src="image"
              :alt="`背景图片 ${index + 1}`"
              class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <!-- 选中状态指示器 -->
            <div
              v-if="isSelected(image)"
              class="absolute inset-0 bg-blue-500/20 flex items-center justify-center"
            >
              <div
                class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <!-- 悬停效果 -->
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"
            ></div>
          </div>
          <p class="text-xs text-gray-500 mt-1 text-center">
            图片 {{ index + 1 }}
          </p>
        </div>
      </div>
    </div>

    <!-- 操作提示 -->
    <div class="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200 hidden">
      <p class="text-sm text-blue-700">
        <svg
          class="w-4 h-4 inline mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        点击任意图片即可设置为背景，更改会立即生效
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useSetingStore } from "~/store/seting.js";
const setingStore = useSetingStore();
// 获取图片列表
const imageList = computed(() => {
  return setingStore.imageList;
});
// 获取当前选中的图片
const currentImage = computed(() => {
  return setingStore.selectedImage.value;
});
// 检查图片是否被选中
const isSelected = (image) => {
  return currentImage.value === image;
};
// 选择图片
const selectImage = (image) => {
  setingStore.updateSelectedImage(image);
};
</script>

<style scoped>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
