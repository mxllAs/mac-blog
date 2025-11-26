<template>
  <div class="w-full h-full p-6 bg-gray-50/80 backdrop-blur-sm rounded-lg">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">网站文字设置</h3>

    <div class="space-y-3">
      <div v-for="font in fontList" :key="font.value" @click="handleFontChange(font)"
        class="relative flex items-center justify-between p-4 bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md"
        :class="isSelected(font) ? 'border-blue-500 bg-blue-50/50' : 'border-transparent hover:border-gray-200'">
        <div>
          <div class="font-medium text-gray-800 text-lg" :style="{ fontFamily: font.value }">
            {{ font.name }}
          </div>
          <div class="text-xs text-gray-500 mt-1">{{ font.desc }}</div>
        </div>

        <div class="flex items-center">
          <div v-if="loadingFont === font.value" class="flex items-center text-blue-600 text-sm animate-pulse">
            <Icon name="ph:spinner-gap-bold" class="animate-spin w-4 h-4 mr-2" />
            <span>下载中...</span>
          </div>

          <div v-else-if="isSelected(font)" class="text-blue-500">
            <Icon name="ph:check-circle-fill" class="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>

    <p class="text-xs text-gray-400 mt-6 text-center">
      提示：中文字体包较大 (约2MB)，首次点击需要几秒钟下载
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSetingStore } from "~/store/seting.js";

const setingStore = useSetingStore();
const fontList = setingStore.fontList;

// 本地状态：记录当前正在下载哪个字体
const loadingFont = ref("");

// 判断当前是否选中
const isSelected = (font) => {
  return setingStore.currentFont.value === font.value;
};

// 处理点击事件
const handleFontChange = async (font) => {
  // 1. 如果正在下载这个，或者已经是这个字体，啥也不做
  if (loadingFont.value || isSelected(font)) return;

  try {
    // 2. 如果有 URL (非系统字体) 且浏览器还没加载该字体，显示 loading
    // document.fonts.check 是一种快速检查字体是否可用的原生 API
    if (font.url && !document.fonts.check(`12px "${font.value}"`)) {
      loadingFont.value = font.value;
    }

    // 3. 调用 Store 的动作（内部会处理下载和 FontFace 添加）
    await setingStore.updateFont(font);

  } catch (e) {
    // 简单提示一下
    console.error(e);
    alert("字体下载失败，请检查网络");
  } finally {
    // 4. 无论成功失败，结束 loading
    loadingFont.value = "";
  }
};
</script>

<style scoped>
/* 简单的过渡动画 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>