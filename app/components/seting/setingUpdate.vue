<template>
  <div
    class="w-full h-full p-8 flex flex-col items-center justify-center text-center relative overflow-hidden bg-gray-50/50"
  >
    <div class="mb-6 relative group">
      <div
        class="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-inner border-4 border-white"
      >
        <Icon name="ph:gear-fill" class="w-12 h-12 text-gray-500/80" />
      </div>
      <div
        v-if="checking || isUpdating"
        class="absolute inset-0 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin"
      ></div>
    </div>

    <h2 class="text-xl font-bold text-gray-800 mb-2">{{ titleText }}</h2>

    <div class="text-sm text-gray-500 max-w-md min-h-[24px]">
      <p v-if="checking">正在检查更新...</p>
      <p v-else-if="hasNewVersion && !isUpdating">
        <span class="font-bold text-gray-700">{{ newVersionName }}</span>
        现已可用。
      </p>
      <p v-else-if="isUpdating">{{ updateStatusText }}</p>
      <p v-else>您的系统已经是最新版本 ({{ currentDisplayVersion }})</p>
    </div>

    <div class="mt-8 w-full max-w-xs">
      <div v-if="checking" class="h-8"></div>

      <div
        v-else-if="hasNewVersion && !isUpdating"
        class="space-y-4 animate-fade-in"
      >
        <button
          @click="startUpdate"
          class="w-full py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <span>立即升级</span>
          <Icon name="ph:arrow-circle-up-bold" class="w-4 h-4" />
        </button>
        <div
          class="text-xs text-blue-500 cursor-pointer hover:underline"
          @click="viewLog"
        >
          查看更新日志...
        </div>
      </div>

      <div v-else-if="isUpdating" class="space-y-2">
        <div
          class="h-2 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner"
        >
          <div
            class="h-full bg-blue-500 transition-all duration-300 ease-out relative overflow-hidden"
            :style="{ width: progress + '%' }"
          >
            <div
              class="absolute inset-0 bg-white/30 w-full -translate-x-full animate-[shimmer_1.5s_infinite]"
            ></div>
          </div>
        </div>
        <div
          class="flex justify-between text-[10px] text-gray-400 font-mono px-1"
        >
          <span>{{ timeLeft }}</span>
          <span>{{ progress }}%</span>
        </div>
      </div>

      <div
        v-else
        class="text-xs text-gray-400 pt-4 border-t border-gray-200/50"
      >
        <p>上次检查时间: 今天 {{ checkTime }}</p>
        <p class="mt-1 opacity-60">自动保持最新</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import dayjs from "dayjs";
import { useVersionNotification } from "~/composables/useVersionNotification";

const router = useRouter();
const config = useRuntimeConfig();
// 🟢 引入消除红点的方法
const { setCurrentVersion, updateViewedVersion } = useVersionNotification();

const checking = ref(true);
const hasNewVersion = ref(false);
const isUpdating = ref(false);
const isUpToDate = ref(false);
const progress = ref(0);

const configVersion = config.public.version || "0.0.1";
const currentDisplayVersion = ref("");
const newVersionName = ref("");
const checkTime = ref(dayjs().format("HH:mm"));

const updateStatusText = computed(() => {
  if (progress.value < 20) return "正在下载更新包...";
  if (progress.value < 50) return "正在解压文件...";
  if (progress.value < 80) return "正在安装更新...";
  return "正在重启系统...";
});

const titleText = computed(() => {
  if (isUpdating.value) return "软件更新";
  if (hasNewVersion.value) return "软件更新可用";
  return "macOS Blog";
});

const timeLeft = computed(() => {
  const left = Math.max(0, 30 - Math.floor(progress.value * 0.3));
  return `剩余约 ${left} 秒`;
});

const checkUpdate = async () => {
  checking.value = true;
  if (import.meta.client) {
    currentDisplayVersion.value =
      localStorage.getItem("system_installed_version") || configVersion;
  }
  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    const latestLog = await queryCollection("changelog")
      .order("date", "DESC")
      .order("title", "DESC")
      .limit(1)
      .first();
    if (latestLog && latestLog.title) {
      const match = latestLog.title.match(/[vV]?(\d+(\.\d+)*)/);
      const latestVer = match ? `v${match[1]}` : '';

      if (latestVer && latestVer !== currentDisplayVersion.value) {
        hasNewVersion.value = true;
        newVersionName.value = "macOS Blog " + latestVer;
        window._pendingVersion = latestVer;
        // 这里更新状态是为了让菜单红点亮起来
        setCurrentVersion(latestVer);
      } else {
        isUpToDate.value = true;
      }
    } else {
      isUpToDate.value = true;
    }
  } catch (e) {
    isUpToDate.value = true;
  } finally {
    checking.value = false;
  }
};

const startUpdate = () => {
  isUpdating.value = true;
  progress.value = 0;
  const timer = setInterval(() => {
    const increment = Math.random() * 3 + 1;
    progress.value = Math.min(100, Math.floor(progress.value + increment));
    if (progress.value >= 100) {
      clearInterval(timer);
      finishUpdate();
    }
  }, 100);
};

const finishUpdate = () => {
  if (window._pendingVersion) {
    const ver = window._pendingVersion;
    // 1. 写入“已安装”版本
    localStorage.setItem("system_installed_version", ver);
    // 2. 🟢 消除红点！(告诉系统这个版本已处理)
    updateViewedVersion(ver);
    // 3. 更新状态
    setCurrentVersion(ver);
  }
  window.location.reload();
};

const viewLog = () => {
  router.push("/changeLog");
};

onMounted(() => {
  checkUpdate();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
