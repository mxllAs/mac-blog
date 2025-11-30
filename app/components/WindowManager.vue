<template>
  <div>
    <MacModal
      v-for="win in windowStore.windows"
      :key="win.id"
      v-model:open="win.isOpen"
      :zIndex="win.zIndex"
      :title="win.title"
      :width="win.width"
      :drag="true"
      @focus="windowStore.focus(win.id)"
    >
      <component :is="componentMap[win.component]" />
    </MacModal>
  </div>
</template>

<script setup>
import { useWindowStore } from "~/store/window.js";
import MacModal from "@/components/MacModal.vue";

// 🟢 1. 引入所有具体的窗口内容组件
import Seting from "@/components/seting/index.vue";
import Terminal from "@/components/Terminal.vue";
import BlogInfo from "@/components/BlogInfo.vue";

const windowStore = useWindowStore();

// 🟢 2. 建立映射表 (String -> Component)
// 这里的 Key 必须和 Store 里的 win.component 一致
const componentMap = {
  Seting: Seting,
  Terminal: Terminal,
  BlogInfo: BlogInfo,
};
</script>
