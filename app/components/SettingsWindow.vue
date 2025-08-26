<template>
  <div class="settings-window">
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">系统设置</h2>
      <p class="text-gray-600 text-sm">管理您的系统偏好设置</p>
    </div>

    <div class="space-y-6">
      <!-- 占位内容 -->
      <div class="text-center py-12">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-500 mb-2">设置功能开发中</h3>
        <p class="text-gray-400">更多设置选项即将推出</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 设置窗口组件 - 简化版本
</script>

<style scoped>
.settings-window {
  max-height: 400px;
  overflow-y: auto;
}
</style>