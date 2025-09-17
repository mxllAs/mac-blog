<template>
  <div class="flex">
    <div class="menu-container">
      <ul class="menu-list">
        <li
          v-for="item in menu"
          :key="item.key"
          :class="{ active: activeKey === item.key }"
          @click="handleMenuClick(item)"
          class="menu-item"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="pl-[15px] flex-1 h-[432px]">
      <transition name="fade" mode="out-in">
        <component :is="settingContentComponent" :key="activeKey" />
      </transition>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import SetingImage from "@/components/seting/setingImage.vue";
import SetingText from "@/components/seting/setingText.vue";
const activeKey = ref("setting-bg");
const settingContent = {
  "setting-bg": SetingImage,
  "setting-text": SetingText,
};
const settingContentComponent = computed(() => {
  return settingContent[activeKey.value];
});
const menu = reactive([
  {
    label: "网站背景设置",
    key: "setting-bg",
  },
  {
    label: "网站文字设置",
    key: "setting-text",
  },
]);
// a-menu点击事件处理函数
const handleMenuClick = (row) => {
  activeKey.value = row.key;
  console.log(row);
};
</script>
<style scoped>
.menu-container {
  width: 200px;
  border-right: 1px solid #e5e7eb;
  padding-right: 15px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  padding: 8px 16px;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #374151;
  font-size: 14px;
}

.menu-item:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.menu-item.active {
  background-color: #3b82f6;
  color: white;
}

.menu-item.active:hover {
  background-color: #2563eb;
}

/* 过渡动画样式 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(15px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
