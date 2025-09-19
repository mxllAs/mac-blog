<template>
  <MacWindow>
    <div class="p-8 h-[900px]">
      <h1 class="text-3xl font-bold mb-8 text-center">MacOS 风格博客系统</h1>
      <div class="max-w-2xl mx-auto">
        <div class="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 class="text-xl font-semibold mb-4">欢迎使用</h2>
          <p class="text-gray-600 mb-6">
            这是一个仿 macOS
            风格的博客系统，支持窗口化的页面显示。点击下面的链接体验窗口功能：
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink
              to="/"
              class="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors group"
            >
              <div class="flex items-center mb-2">
                <svg
                  class="w-5 h-5 mr-2 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <h3 class="font-semibold text-blue-700">关于页面</h3>
              </div>
              <p class="text-sm text-gray-600 group-hover:text-gray-700">
                在窗口中查看关于信息和功能介绍
              </p>
            </NuxtLink>

            <NuxtLink
              to="/"
              class="block p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors group"
            >
              <div class="flex items-center mb-2">
                <svg
                  class="w-5 h-5 mr-2 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <h3 class="font-semibold text-green-700">系统设置</h3>
              </div>
              <p class="text-sm text-gray-600 group-hover:text-gray-700">
                在窗口中配置系统参数和偏好设置
              </p>
            </NuxtLink>
          </div>

          <div
            class="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
          >
            <h3 class="font-semibold text-yellow-700 mb-2">💡 提示</h3>
            <p class="text-sm text-yellow-600">
              点击上面的链接将在新的窗口容器中打开页面，体验 macOS
              风格的窗口化界面。
            </p>
          </div>
        </div>
      </div>
    </div>
  </MacWindow>
</template>

<script setup>
import MacWindow from "~/components/MacWindow.vue";
</script>

<style></style>
