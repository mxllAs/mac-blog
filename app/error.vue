<template>
  <NuxtLayout>
    <MacWindow
      @close="handleError"
      title="错误"
      scrollbarColor="rgba(0, 0, 0, 0.25) rgba(255, 255, 255, 0.8)"
    >
      <div class="h-full bg-white/80 p-6">
        <!-- 错误图标 -->
        <div class="flex flex-col items-center justify-center text-center">
          <div class="mb-6">
            <div class="w-20 h-20 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
          </div>

          <!-- 错误标题 -->
          <h1 class="text-2xl font-bold text-gray-800 mb-2">
            {{ errorTitle }}
          </h1>

          <!-- 错误状态码 -->
          <div class="text-sm text-gray-500 mb-4">
            错误代码: {{ error?.statusCode || '未知错误' }}
          </div>

          <!-- 错误信息 -->
          <div class="max-w-md mx-auto mb-6">
            <p class="text-gray-600 leading-relaxed">
              {{ errorMessage }}
            </p>
          </div>

          <!-- 错误详情（调试用） -->
          <div v-if="error?.data" class="w-full max-w-lg mb-6">
            <details class="bg-gray-50 rounded-lg p-3 text-left">
              <pre class="mt-2 text-xs text-gray-500 overflow-auto">{{ JSON.stringify(error.data, null, 2) }}</pre>
            </details>
          </div>

          <!-- 操作按钮 -->
          <div class="flex gap-3">
            <button
              @click="handleError"
              class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
            >
              返回首页
            </button>
            <button
              @click="refreshPage"
              class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm font-medium"
            >
              刷新页面
            </button>
          </div>
        </div>
      </div>
    </MacWindow>
  </NuxtLayout>
</template>

<script setup>
import MacWindow from "~/components/MacWindow.vue";
import { useError, clearError } from "#app";

const error = useError();

// 计算错误标题
const errorTitle = computed(() => {
  if (!error.value) return '发生错误';
  
  const statusCode = error.value.statusCode;
  if (statusCode === 404) return '页面未找到';
  if (statusCode === 500) return '服务器错误';
  if (statusCode === 403) return '访问被拒绝';
  if (statusCode === 401) return '未授权访问';
  
  return error.value.statusMessage || '发生错误';
});

// 计算错误信息
const errorMessage = computed(() => {
  if (!error.value) return '抱歉，发生了一些错误。';
  
  const statusCode = error.value.statusCode;
  const message = error.value.message || error.value.statusMessage;
  
  if (statusCode === 404) {
    return message || '您访问的页面不存在或已被移动。';
  }
  if (statusCode === 500) {
    return message || '服务器遇到了一些问题，请稍后再试。';
  }
  if (statusCode === 403) {
    return message || '您没有权限访问此页面。';
  }
  if (statusCode === 401) {
    return message || '您需要登录才能访问此页面。';
  }
  
  return message || '抱歉，发生了一些错误。';
});

// 处理错误 - 返回首页
const handleError = () => {
  clearError({ redirect: "/" });
};

// 刷新页面
const refreshPage = () => {
  window.location.reload();
};

// 监听错误变化（调试用）
watchEffect(() => {
  if (error.value) {
    console.log('错误详情:', error.value);
  }
});
</script>

<style scoped>
/* MacOS风格动画 */
details summary::-webkit-details-marker {
  display: none;
}

details summary::before {
  content: '▶';
  margin-right: 8px;
  transition: transform 0.2s;
}

details[open] summary::before {
  transform: rotate(90deg);
}

pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}
</style>
