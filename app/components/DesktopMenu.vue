<template>
  <Transition name="scale-fade">
    <div 
      v-if="visible"
      class="fixed z-[9999] w-56 bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/40 py-1.5 text-[13px] font-medium text-gray-800 origin-top-left ring-1 ring-black/5 select-none"
      :style="{ top: y + 'px', left: x + 'px' }"
      @click.stop
    >
      <div class="px-1">
        <div class="menu-item group" @click="handleAction('newFolder')">
          <span>新建文件夹</span>
          <span class="text-gray-400 text-xs">N</span>
        </div>
        <div class="menu-item group" @click="handleAction('getInfo')">
          <span>显示简介</span>
          <span class="text-gray-400 text-xs">⌘I</span>
        </div>
      </div>
      
      <div class="h-px bg-gray-300/50 my-1 mx-2"></div>

      <div class="px-1">
        <div class="menu-item group" @click="handleAction('changeBg')">
          <span>更换壁纸</span>
        </div>
        <div class="menu-item group opacity-50 cursor-not-allowed">
          <span>整理方式</span>
        </div>
      </div>
      
      <div class="h-px bg-gray-300/50 my-1 mx-2"></div>

      <div class="px-1">
         <div class="menu-item group" @click="handleAction('terminal')">
          <span>打开终端...</span>
        </div>
        <div class="menu-item group" @click="handleAction('refresh')">
          <span>重新加载</span>
          <span class="text-gray-400 text-xs">⌘R</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useSetingStore } from "~/store/seting.js";
import { notification } from 'ant-design-vue';
import { useWindowStore } from "~/store/window.js"; // 🟢 引入 Window Store

const props = defineProps({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 }
});

const visible = defineModel('visible', { type: Boolean, default: false });
const setingStore = useSetingStore();
const windowStore = useWindowStore(); // 🟢 初始化 Store

// 通用提示函数
const showDevNotice = (title = '系统提示') => {
  notification.info({
    message: title,
    description: '该功能正在紧急开发中，敬请期待！🚀',
    placement: 'topRight',
    duration: 2,
    style: {
      borderRadius: '8px',
      marginTop: '60px',
    }
  });
};

const handleAction = (type) => {
  visible.value = false; // 点击后关闭菜单
  
  switch (type) {
    case 'refresh':
      window.location.reload();
      break;
      
    case 'changeBg':
      const bgs = setingStore.imageList;
      let randomBg;
      const current = setingStore.selectedImage.value;

      do {
        randomBg = bgs[Math.floor(Math.random() * bgs.length)];
      } while (randomBg === current && bgs.length > 1);
      
      setingStore.updateSelectedImage(randomBg);
      
      notification.success({
        message: '壁纸已切换',
        description: '桌面背景已更新为新的风景。',
        placement: 'topRight',
        duration: 1.5,
      });
      break;
      
    case 'newFolder':
      showDevNotice('新建文件夹');
      break;
      
    case 'getInfo':
      // 🟢 修改这里：不再显示 Notification，而是打开全局的 About 窗口
      windowStore.open('about');
      break;
      
    case 'terminal':
      // 打开终端窗口
      windowStore.open('terminal');
      break;
  }
};
</script>

<style scoped>
.menu-item {
  @apply px-3 py-1 my-0.5 mx-0.5 rounded-md cursor-default transition-colors flex items-center justify-between;
}

.menu-item:hover {
  @apply bg-[#0065F9] text-white;
}

.menu-item:hover span:last-child {
  @apply text-white/80;
}

.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}

.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>