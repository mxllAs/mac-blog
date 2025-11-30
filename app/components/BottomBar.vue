<template>
  <div class="py-2">
    <div class="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-3 shadow-2xl flex items-center space-x-3">
      
      <NuxtLink
        v-for="app in dockApps" 
        :key="app.id" 
        :to="app.path"
        :target="app.isExternal ? '_blank' : undefined"
        class="dock-item group relative"
      >
        <div 
          class="dock-icon-container "
          :class="app.dockColor || 'bg-gray-500'"
        >
          <img v-if="app.icon.includes('/')" :src="app.icon" :alt="app.name" class="w-7 h-7 drop-shadow-sm object-contain" />
          <Icon v-else :name="app.icon" class="w-7 h-7 text-white drop-shadow-sm" />
        </div>

        <span class="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap  scale-90 group-hover:scale-100 duration-200">
          {{ app.name }}
        </span>

        <div v-if="isActive(app)" class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/90 rounded-full shadow-sm"></div>
      </NuxtLink>

      <div class="w-px h-8 bg-white/30 mx-1"></div>

      <div class="dock-item group relative" @click="windowStore.toggle('terminal')">
        <div class="dock-icon-container bg-gray-800 ">
          <Icon name="ph:terminal-bold" class="w-7 h-7 text-white" />
        </div>
        <span class="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap  scale-90 group-hover:scale-100 duration-200">终端</span>
        <div v-if="windowStore.windows.terminal.isOpen" class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/90 rounded-full shadow-sm"></div>
      </div>

      <div class="dock-item group relative" @click="windowStore.toggle('settings')">
        <div class="dock-icon-container bg-gradient-to-br from-gray-500 to-gray-700 ">
          <img :src="settingsIcon" alt="设置" class="w-7 h-7" />
        </div>
        
        <div 
          v-if="notificationState.shouldShow"
          class="absolute -top-1.5 -right-1.5 z-20 flex items-center justify-center w-4 h-4 bg-[#ff3b30] rounded-full shadow-sm transition-all duration-200 ease-out group-hover:scale-110 group-hover:-translate-y-3"
          title="有新的系统更新可用"
        >
          <Icon name="ph:arrow-up-bold" class="w-2.5 h-2.5 text-white" />
        </div>

        <span class="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap  scale-90 group-hover:scale-100 duration-200">设置</span>
        
        <div v-if="windowStore.windows.settings.isOpen" class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/90 rounded-full shadow-sm"></div>
      </div>

      <div class="dock-item group relative">
        <div class="dock-icon-container bg-gradient-to-br from-gray-400 to-gray-600 ">
          <img :src="trashIcon" alt="垃圾桶" class="w-7 h-7" />
        </div>
        <span class="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap ">废纸篓</span>
      </div>

      </div>
  </div>
</template>

<script setup>
import { dockApps } from '~/config/apps'
import settingsIcon from "@/assets/svg/settings-icon.svg";
import trashIcon from "@/assets/svg/trash-icon.svg";
import { useVersionNotification } from '~/composables/useVersionNotification'
import { useWindowStore } from "~/store/window.js";
// 🟢 移除了 MacModal, Seting, Terminal 的引入

const route = useRoute();
const { notificationState } = useVersionNotification()
const windowStore = useWindowStore();

const isActive = (app) => {
  if (app.path === '/') return route.path === '/';
  if (app.isExternal) return false;
  return route.path.startsWith(app.path);
};
</script>

<style scoped>
.dock-item {
  @apply cursor-pointer;
  display: block; 
}

.dock-icon-container {
  @apply w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 ease-out;
  @apply group-hover:scale-110 group-hover:-translate-y-3;
}

@media (max-width: 768px) {
  .dock-icon-container {
    @apply w-10 h-10;
  }
  .dock-icon-container :deep(svg),
  .dock-icon-container img {
    @apply w-5 h-5;
  }
}
</style>