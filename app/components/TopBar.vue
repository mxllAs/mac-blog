<template>
  <div
    class="w-full h-full p-2 flex items-center justify-between text-[#fff] bg-gray-500/20 backdrop-blur-md"
  >
    <div>
      <div class="cursor-pointer">
        <img src="@/assets/svg/apple.svg" alt="logo" />
      </div>
      <!-- 应用菜单显示地方 -->
      <div></div>
    </div>


    <div class="flex items-center space-x-5">
      <img src="@/assets/svg/battery.svg" alt="battery-svg" />
      <img src="@/assets/svg/wifi.svg" alt="wifi-svg" />
      <img src="@/assets/svg/toggle.svg" class="cursor-pointer" alt="toggle-svg" />
      <!-- 时间显示 -->
      <div class="text-sm font-medium">
        {{ currentTime }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { ref, onMounted, onUnmounted } from "vue";
// 当前时间
const currentTime = ref("");
let timer: NodeJS.Timeout | null = null;
// 更新时间
const updateTime = () => {
  currentTime.value = dayjs().format("MM月DD日 HH:mm");
};
// 组件挂载时启动定时器
onMounted(() => {
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
