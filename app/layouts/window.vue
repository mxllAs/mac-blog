<template>
  <div class="w-full flex h-screen bg-[#e5e5e5] p-2">
    <main class="w-full bg-[#fff] rounded-md shadow-md overflow-auto relative">
      <header class="h-[42px]">
        <TopBar />
      </header>

      <div class="p-4" style="height: calc(100vh - 42px - 90px - 8px)">
        <div
          class="bg-white rounded-lg shadow-2xl overflow-hidden w-full h-full flex flex-col"
        >
          <!-- 窗口标题栏 -->
          <div
            class="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between"
          >
            <div class="flex items-center space-x-3">
              <!-- macOS 窗口控制按钮 -->
              <div class="flex space-x-2">
                <button
                  class="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                ></button>
                <button
                  class="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
                ></button>
                <button
                  class="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                ></button>
              </div>
              <h3 class="text-sm font-medium text-gray-800">{{ title }}</h3>
            </div>
          </div>

          <!-- 窗口内容区域 -->
          <div class="flex-1 overflow-auto p-4">
            <slot></slot>
          </div>
        </div>
      </div>

      <footer
        class="absolute bottom-0 flex justify-center items-center left-0 right-0"
      >
        <BottomBar />
      </footer>
    </main>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const title = computed(() => route.meta.title || "默认标题");
</script>

<style scoped>
main {
  background-image: url("@/assets/images/bg2.webp");
  background-size: cover;
  background-position: center;
}
</style>
