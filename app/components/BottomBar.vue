<template>
  <div class="py-2">
    <div
      class="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-3 shadow-2xl"
    >
      <div class="flex items-center space-x-3">
        <!-- 首页-桌面 -->
        <nuxt-link to="/">
          <div class="dock-item group">
            <div
              class="dock-icon-container bg-gradient-to-br from-blue-400 to-blue-600"
            >
              <img
                src="~/assets/svg/finder-icon.svg"
                alt="Finder"
                class="w-7 h-7"
              />
            </div>
          </div>
        </nuxt-link>
        <!-- 友情链接 -->
        <nuxt-link to="links">
          <div class="dock-item group">
            <div
              class="dock-icon-container bg-gradient-to-br from-orange-400 to-pink-500"
            >
              <img src="~/assets/svg/links-icon.svg" alt="友情链接" class="w-7 h-7" />
            </div>
          </div>
        </nuxt-link>
        <!-- 关于 -->
        <nuxt-link to="about">
          <div class="dock-item group">
            <div
              class="dock-icon-container bg-gradient-to-br from-orange-400 to-pink-500"
            >
              <img src="~/assets/svg/about.svg" alt="关于" class="w-7 h-7" />
            </div>
          </div>
        </nuxt-link>
        <!-- 设置图标 -->
        <div class="dock-item group" @click="openSettings">
          <div
            class="dock-icon-container bg-gradient-to-br from-gray-500 to-gray-700"
          >
            <img
              src="~/assets/svg/settings-icon.svg"
              alt="设置"
              class="w-7 h-7"
            />
          </div>
        </div>
        <!-- 分隔线 -->
        <div class="w-px h-8 bg-white/30 mx-1"></div>
        <!-- Trash -->
        <div class="dock-item group">
          <div
            class="dock-icon-container bg-gradient-to-br from-gray-400 to-gray-600"
          >
            <img
              src="~/assets/svg/trash-icon.svg"
              alt="垃圾桶"
              class="w-7 h-7"
            />
          </div>
        </div>
        <MacModal v-model="open" title="设置">
          <Seting />
        </MacModal>
      </div>
    </div>
  </div>
</template>

<script setup>
import MacModal from "@/components/MacModal.vue";
import Seting from "@/components/seting/index.vue";
const open = ref(false);
const openSettings = () => {
  open.value = true;
};
</script>

<style scoped>
.dock-item {
  @apply cursor-pointer;
}

/* 统一的图标容器样式 */
.dock-icon-container {
  @apply w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-200 ease-out;
}

/* 添加发光效果 */
.dock-item:hover .dock-icon-container {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dock-icon-container {
    @apply w-10 h-10;
  }

  .dock-icon-container img {
    @apply w-5 h-5;
  }
}
</style>
