<template>
  <div class="w-full h-full p-2 flex items-center justify-between text-[#fff] bg-gray-500/20 backdrop-blur-md">
    <div>
      <div class="cursor-pointer relative">
        <!-- <img src="@/assets/svg/apple.svg" alt="logo" @click="open = true" /> -->
        <img src="@/assets/svg/diannao.svg" alt="logo" @click="open = true" />
        <!-- 版本更新红点提示 -->
        <span v-if="showVersionNotification"
          class="absolute -top-0.5 -right-0.5 w-2 h-2 flex items-center justify-center">
          <span class="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500 border border-white shadow-lg"></span>
        </span>
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
        {{ isClient ? currentTime : "" }}
      </div>
    </div>
  </div>
  <MacModal v-model="open" width="320px" :drag="true">
    <BlogInfo @close="open = false" />
  </MacModal>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, onMounted, onUnmounted } from "vue";
import MacModal from "./MacModal.vue";

// 当前时间
const currentTime = ref("");
const isClient = ref(false);
let timer = null;
const open = ref(false);

// 版本更新通知 - 使用全局响应式状态
const { notificationState, setCurrentVersion } = useVersionNotification();

// 从全局状态获取是否显示红点
const showVersionNotification = computed(() => notificationState.value.shouldShow);


// 获取最新版本并设置到全局状态
const checkVersionUpdate = async () => {
  if (!process.client) return;

  try {
    const logs = await queryCollection('changelog')
      .order('date', 'DESC')
      .order('title', 'DESC')
      .limit(1)
      .all();

    if (logs && logs[0]?.title) {
      // 提取版本号
      const match = logs[0].title.match(/[vV]?(\d+(\.\d+)*)/);
      const currentVersion = match ? `v${match[1]}` : '';

      // 设置当前版本到全局状态（会自动检查是否显示红点）
      setCurrentVersion(currentVersion);
    }
  } catch (error) {
    console.error('检查版本更新失败:', error);
  }
};

// 更新时间
const updateTime = () => {
  currentTime.value = dayjs().format("MM月DD日 HH:mm");
};

// 组件挂载时启动定时器
onMounted(() => {
  isClient.value = true; // 标记为客户端
  updateTime(); // 立即更新一次
  timer = setInterval(updateTime, 1000); // 每秒更新

  // 检查版本更新
  checkVersionUpdate();
});

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped></style>
