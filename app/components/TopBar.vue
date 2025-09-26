<template>
  <div
    class="w-full h-full p-2 flex items-center justify-between text-[#fff] bg-gray-500/20 backdrop-blur-md"
  >
    <div>
      <div class="cursor-pointer">
        <img src="@/assets/svg/apple.svg" alt="logo" @click="open = true" />
      </div>
      <!-- 应用菜单显示地方 -->
      <div></div>
    </div>
    <div class="flex items-center space-x-5">
      <img src="@/assets/svg/battery.svg" alt="battery-svg" />
      <img src="@/assets/svg/wifi.svg" alt="wifi-svg" />
      <img
        src="@/assets/svg/toggle.svg"
        class="cursor-pointer"
        alt="toggle-svg"
      />
      <!-- 时间显示 -->
      <div class="text-sm font-medium">
        {{ isClient ? currentTime : "" }}
      </div>
    </div>
  </div>
  <MacModal v-model="open" width="320px">
    <!-- 显示当前博客的版本 -->
    <div class="bg-white/90 backdrop-blur-sm rounded-md p-4">
      <div class="flex items-center space-x-3 mb-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">关于此博客</h3>
          <p class="text-sm text-gray-500">小贺</p>
        </div>
      </div>

      <div class="space-y-3">
        <div class="flex items-center py-2 border-b border-gray-100 gap-2">
          <span class="text-sm text-gray-600 w-[50px]">版本:</span>
          <span class="text-sm font-medium text-gray-800">{{
            config.public.version
          }}</span>
        </div>
        <div class="flex items-center py-2 gap-2">
          <span class="text-sm text-gray-600 w-[50px]">技术栈:</span>
          <span class="text-sm font-medium text-gray-800">Nuxt 4</span>
        </div>
        <!-- 备案信息和版权信息 -->
        <div class="mt-4 pt-4 border-t border-gray-200/50">
          <div class="space-y-2">
            <!-- 备案信息 -->
            <div class="flex flex-col space-y-1 text-xs text-gray-500">
              <a 
                target="_blank" 
                href="/" 
                class="hover:text-blue-500 transition-colors duration-200 hover:underline"
              >
                豫公网安备41017202000114号
              </a>
              <a 
                href="https://beian.miit.gov.cn/" 
                target="_blank"
                class="hover:text-blue-500 transition-colors duration-200 hover:underline"
              >
                豫ICP备2022027159号-2
              </a>
            </div>
            <!-- 版权信息 -->
            <div class="text-xs text-gray-500">
              <span class="text-gray-400">©</span> 2024 - 2025 小贺 / mxll
            </div>
          </div>
        </div>
      </div>
    </div>
  </MacModal>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, onMounted, onUnmounted } from "vue";
import MacModal from "./MacModal.vue";
const config = useRuntimeConfig();
// 当前时间
const currentTime = ref("");
const isClient = ref(false);
let timer = null;
const open = ref(false);
// 更新时间
const updateTime = () => {
  currentTime.value = dayjs().format("MM月DD日 HH:mm");
};
// 组件挂载时启动定时器
onMounted(() => {
  isClient.value = true; // 标记为客户端
  updateTime(); // 立即更新一次
  timer = setInterval(updateTime, 1000); // 每秒更新
});
// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped></style>
