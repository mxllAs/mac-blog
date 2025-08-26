<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">系统设置</h1>
    
    <div class="space-y-6">
      <!-- 外观设置 -->
      <div class="bg-white border border-gray-200 rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v11H4V4z" clip-rule="evenodd" />
          </svg>
          外观设置
        </h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium">深色模式</label>
            <input type="checkbox" class="rounded" v-model="darkMode">
          </div>
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium">动画效果</label>
            <input type="checkbox" class="rounded" v-model="animations">
          </div>
        </div>
      </div>
      
      <!-- 窗口设置 -->
      <div class="bg-white border border-gray-200 rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clip-rule="evenodd" />
          </svg>
          窗口设置
        </h2>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium">默认窗口大小</label>
            <select class="border border-gray-300 rounded px-2 py-1 text-sm" v-model="defaultWindowSize">
              <option value="small">小</option>
              <option value="medium">中</option>
              <option value="large">大</option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium">窗口透明度</label>
            <input type="range" min="0.5" max="1" step="0.1" class="w-24" v-model="windowOpacity">
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="flex space-x-3">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          保存设置
        </button>
        <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
          重置默认
        </button>
        <NuxtLink 
          to="/" 
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 指定使用 window layout
definePageMeta({
  layout: 'window',
  title: '系统设置'
})

// 设置项
const darkMode = ref(false)
const animations = ref(true)
const defaultWindowSize = ref('medium')
const windowOpacity = ref(1)
</script>

<style scoped></style>