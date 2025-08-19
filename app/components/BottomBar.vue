<template>
  <div class="py-2">
    <div class="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-3 shadow-2xl">
      <div class="flex items-center space-x-3">
        <!-- Finder -->
        <div class="dock-item group">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-200 ease-out">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7l-10-5z"/>
            </svg>
          </div>
        </div>

        <!-- Safari -->
        <div class="dock-item group">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-200 ease-out">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        <!-- Mail -->
        <div class="dock-item group">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-200 ease-out">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
        </div>

        <!-- Messages -->
        <div class="dock-item group">
          <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-200 ease-out">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
        </div>

        <!-- Photos -->
        <div class="dock-item group">
          <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-200 ease-out">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
        </div>

        <!-- Music -->
        <div class="dock-item group">
          <div class="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-200 ease-out">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
        </div>

        <!-- 分隔线 -->
        <div class="w-px h-8 bg-white/30 mx-1"></div>

        <!-- Trash -->
        <div class="dock-item group">
          <div class="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-200 ease-out">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// macOS程序坞组件
</script>

<style scoped>
.dock-item {
  @apply cursor-pointer;
}

/* 添加发光效果 */
.dock-item:hover > div {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dock-item > div {
    @apply w-10 h-10;
  }
  
  .dock-item svg {
    @apply w-5 h-5;
  }
}
</style>
