<template>
  <div class="py-2">
    <div class="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-3 shadow-2xl flex items-center space-x-3">
      
      <div 
        v-for="app in dockApps" 
        :key="app.id" 
        class="dock-item group relative"
        @click="openApp(app)"
      >
        <div 
          class="dock-icon-container border border-white/10"
          :class="app.dockColor || 'bg-gray-500'"
        >
          <img v-if="app.icon.includes('/')" :src="app.icon" :alt="app.name" class="w-7 h-7 drop-shadow-sm object-contain" />
          <Icon v-else :name="app.icon" class="w-7 h-7 text-white drop-shadow-sm" />
        </div>

        <span class="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 scale-90 group-hover:scale-100 duration-200">
          {{ app.name }}
        </span>

        <div v-if="isActive(app)" class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/90 rounded-full shadow-sm"></div>
      </div>

      <div class="w-px h-8 bg-white/30 mx-1"></div>

      <div class="dock-item group relative" @click="openSettings">
        <div class="dock-icon-container bg-gradient-to-br from-gray-500 to-gray-700 border border-white/10">
          <img :src="settingsIcon" alt="设置" class="w-7 h-7" />
        </div>
        
        <div 
          v-if="notificationState.shouldShow"
          class="absolute -top-1.5 -right-1.5 z-20 flex items-center justify-center w-4 h-4 bg-[#ff3b30] rounded-full"
          title="有新的系统更新可用"
        >
          <Icon name="ph:arrow-up-bold" class="w-2.5 h-2.5 text-white" />
        </div>

        <span class="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">设置</span>
      </div>

      <div class="dock-item group relative">
        <div class="dock-icon-container bg-gradient-to-br from-gray-400 to-gray-600 border border-white/10">
          <img :src="trashIcon" alt="垃圾桶" class="w-7 h-7" />
        </div>
        <span class="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">废纸篓</span>
      </div>

      <MacModal v-model="open" title="设置" :drag="true">
        <Seting />
      </MacModal>
      <MacModal v-model="openArticleList" title="文章列表" :drag="true">
        <ArticleList />
      </MacModal>

    </div>
  </div>
</template>

<script setup>
import { dockApps } from '~/config/apps'
import MacModal from "@/components/MacModal.vue";
import ArticleList from "@/pages/article/components/index.vue";
import Seting from "@/components/seting/index.vue";
import settingsIcon from "@/assets/svg/settings-icon.svg";
import trashIcon from "@/assets/svg/trash-icon.svg";
import { useVersionNotification } from '~/composables/useVersionNotification'

const router = useRouter();
const route = useRoute();
const open = ref(false);
const openArticleList = ref(false);
const { notificationState } = useVersionNotification()

const openSettings = () => {
  open.value = true;
};

const openApp = (app) => {
  if (app.isExternal) {
    window.open(app.path, '_blank');
  } else {
    router.push(app.path);
  }
};

const isActive = (app) => {
  if (app.path === '/') return route.path === '/';
  return route.path.startsWith(app.path);
};
</script>

<style scoped>
.dock-item {
  @apply cursor-pointer;
}
.dock-icon-container {
  @apply w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-200 ease-out hover:-translate-y-3;
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