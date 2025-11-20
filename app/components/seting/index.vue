<template>
  <div class="flex p-[20px] pr-[0]">
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
    <div class="pl-[15px] flex-1 h-[432px] overflow-y-auto overflow-x-hidden">
      <transition name="fade" mode="out-in">
        <component :is="settingContentComponent" :key="activeKey" />
      </transition>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import SetingImage from "@/components/seting/setingImage.vue";
import SetingText from "@/components/seting/setingText.vue";
const activeKey = useState("seting-menu-active", () => "setting-bg");
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
};
</script>
<style scoped>
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
