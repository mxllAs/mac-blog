<template>
  <div class="w-full h-full p-8 flex flex-col items-center justify-center text-center relative overflow-hidden bg-gray-50/50">
    
    <div class="mb-6 relative group">
      <div class="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-inner border-4 border-white">
        <Icon name="ph:gear-fill" class="w-12 h-12 text-gray-500/80" />
      </div>
      <div v-if="checking || isUpdating" class="absolute inset-0 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin"></div>
    </div>

    <h2 class="text-xl font-bold text-gray-800 mb-2">
      {{ titleText }}
    </h2>
    
    <div class="text-sm text-gray-500 max-w-md min-h-[24px]">
      <p v-if="checking">正在检查更新...</p>
      <p v-else-if="hasNewVersion && !isUpdating">
        <span class="font-bold text-gray-700">{{ newVersionName }}</span> 现已可用。
      </p>
      <p v-else-if="isUpdating">
        {{ updateStatusText }}
      </p>
      <p v-else>
        您的系统已经是最新版本 ({{ currentDisplayVersion }})
      </p>
    </div>

    <div class="mt-8 w-full max-w-xs">
      <div v-if="checking" class="h-8"></div>

      <div v-else-if="hasNewVersion && !isUpdating" class="space-y-4 animate-fade-in">
        <button 
          @click="startUpdate"
          class="w-full py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <span>立即升级</span>
          <Icon name="ph:arrow-circle-up-bold" class="w-4 h-4" />
        </button>
        
        <div class="text-xs text-blue-500 cursor-pointer hover:underline" @click="viewLog">
          查看更新日志...
        </div>
      </div>

      <div v-else-if="isUpdating" class="space-y-2">
        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div 
            class="h-full bg-blue-500 transition-all duration-300 ease-out relative overflow-hidden"
            :style="{ width: progress + '%' }"
          >
            <div class="absolute inset-0 bg-white/30 w-full -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
          </div>
        </div>
        <div class="flex justify-between text-[10px] text-gray-400 font-mono px-1">
          <span>{{ timeLeft }}</span>
          <span>{{ progress }}%</span>
        </div>
      </div>

      <div v-else class="text-xs text-gray-400 pt-4 border-t border-gray-200/50">
        <p>上次检查时间: 今天 {{ checkTime }}</p>
        <p class="mt-1 opacity-60">自动保持最新</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import dayjs from 'dayjs'
import { useVersionNotification } from '~/composables/useVersionNotification'

const router = useRouter()
const config = useRuntimeConfig()
const { setCurrentVersion } = useVersionNotification()

// 状态变量
const checking = ref(true)
const hasNewVersion = ref(false)
const isUpdating = ref(false)
const isUpToDate = ref(false)
const progress = ref(0)

// 版本信息
const configVersion = config.public.version || '0.0.1'
// 显示的版本号：优先读取本地存储的“已安装版本”，否则用配置版本
const currentDisplayVersion = ref('')
const newVersionName = ref('')
const checkTime = ref(dayjs().format('HH:mm'))

// 模拟文案
const updateStatusText = computed(() => {
  if (progress.value < 20) return '正在下载更新包...'
  if (progress.value < 50) return '正在解压文件...'
  if (progress.value < 80) return '正在安装更新...'
  return '正在重启系统...'
})

const titleText = computed(() => {
  if (isUpdating.value) return '软件更新'
  if (hasNewVersion.value) return '软件更新可用'
  return 'macOS Blog'
})

const timeLeft = computed(() => {
  const left = Math.max(0, 30 - Math.floor(progress.value * 0.3))
  return `剩余约 ${left} 秒`
})

// 核心：检查更新
const checkUpdate = async () => {
  checking.value = true
  
  // 1. 读取本地“系统版本”
  if (import.meta.client) {
    currentDisplayVersion.value = localStorage.getItem('system_installed_version') || configVersion
  }

  // 模拟网络请求延迟
  await new Promise(resolve => setTimeout(resolve, 1500))

  try {
    // 2. 查询线上最新的 Changelog
    const latestLog = await queryCollection('changelog')
      .order('date', 'DESC')
      .order('title', 'DESC')
      .limit(1)
      .first()

    if (latestLog && latestLog.title) {
      const match = latestLog.title.match(/[vV]?(\d+(\.\d+)*)/);
      const latestVer = match ? match[1] : ''; // e.g. "0.1.1"
      
      // 3. 版本对比
      if (latestVer && latestVer !== currentDisplayVersion.value) {
        hasNewVersion.value = true
        newVersionName.value = 'macOS Blog ' + latestVer
        window._pendingVersion = latestVer // 暂存新版本号
        
        // 同时通知全局状态 (为了让设置菜单显示红点)
        setCurrentVersion(latestVer) 
      } else {
        isUpToDate.value = true
      }
    } else {
      isUpToDate.value = true
    }
  } catch (e) {
    console.error(e)
    isUpToDate.value = true
  } finally {
    checking.value = false
  }
}

// 开始更新表演
const startUpdate = () => {
  isUpdating.value = true
  progress.value = 0
  
  const timer = setInterval(() => {
    // 随机进度，模拟真实感
    const increment = Math.random() * 3 + 1
    progress.value = Math.min(100, Math.floor(progress.value + increment))
    
    if (progress.value >= 100) {
      clearInterval(timer)
      finishUpdate()
    }
  }, 100)
}

// 完成更新
const finishUpdate = () => {
  if (window._pendingVersion) {
    // 写入新版本到本地
    localStorage.setItem('system_installed_version', window._pendingVersion)
    
    // 更新全局状态
    setCurrentVersion(window._pendingVersion)
  }
  // 刷新页面
  window.location.reload()
}

const viewLog = () => {
  router.push('/changeLog')
}

onMounted(() => {
  checkUpdate()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
</style>