<template>
  <div
    class="w-full h-full px-4 flex items-center justify-between text-white bg-gray-900/20 backdrop-blur-md shadow-sm select-none">
    <div class="flex items-center group">
      <div class="cursor-pointer group-hover:opacity-80 transition-opacity" @click="open = true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 5L9 19M9 5L3 19" />
          <path d="M13 5V19M19 5V19M13 12H19" />
        </svg>
      </div>
      <span class="ml-3 text-xs font-bold hidden sm:block cursor-default tracking-wider">
        XiaoHe Blog
      </span>
    </div>

    <div class="flex items-center gap-3 text-sm">
      <div class="cursor-pointer hover:text-blue-300 transition-colors mr-1" @click="spotlight.open()">
        <Icon name="ph:magnifying-glass-bold" class="w-5 h-5" />
      </div>
      <a href="/rss.xml" target="_blank" class="flex items-center justify-center group" title="订阅 RSS">
        <Icon name="ph:rss-simple-bold" class="w-5 h-5 cursor-pointer hover:text-orange-400 transition-colors" />
      </a>

      <Icon name="ph:speaker-high-fill" class="w-5 h-5" />

      <Icon name="ph:wifi-high-bold" class="w-5 h-5" />

      <Icon name="ph:battery-full-fill" class="w-5 h-5" />

      <Icon name="ph:faders-bold" class="w-5 h-5 cursor-pointer hover:text-gray-200" />

      <div class="text-xs font-medium ml-2 tracking-wide min-w-[80px] text-right">
        {{ isClient ? currentTime : "" }}
      </div>
    </div>
  </div>

  <MacModal v-model="open" width="320px" :drag="true">
    <BlogInfo />
  </MacModal>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, onMounted, onUnmounted } from "vue";
import MacModal from "./MacModal.vue";
import BlogInfo from "./BlogInfo.vue";
import { useSpotlight } from '~/composables/useSpotlight'
const spotlight = useSpotlight()
const isClient = ref(false);
const currentTime = ref("");
const open = ref(false);
let timer = null;

const updateTime = () => {
  currentTime.value = dayjs().format("MM月DD日 HH:mm");
};

onMounted(() => {
  isClient.value = true;
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>