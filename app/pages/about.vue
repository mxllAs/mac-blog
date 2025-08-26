<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">关于页面</h1>
    <p class="text-gray-600 mb-4">
      这是一个在窗口容器中显示的页面示例。
    </p>
    <div class="space-y-4">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-2">功能特点</h2>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>页面内容显示在 macOS 风格的窗口中</li>
          <li>支持窗口的关闭、最小化、最大化操作</li>
          <li>保持 macOS 的视觉设计风格</li>
          <li>响应式布局适配不同屏幕尺寸</li>
        </ul>
      </div>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-2">使用方法</h2>
        <p class="text-sm text-gray-600">
          只需要在页面中指定使用 window layout，页面内容就会自动在窗口容器中显示。
        </p>
      </div>
      
      <div class="flex space-x-2">
        <NuxtLink 
          to="/" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          返回首页
        </NuxtLink>
        <NuxtLink 
          to="/settings" 
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          设置页面
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 指定使用 window layout
definePageMeta({
  layout: 'window',
  title: '关于我们'
})
</script>

<style scoped></style>