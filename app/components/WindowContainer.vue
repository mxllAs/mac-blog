<template>
  <div class="window-container">
    <!-- 渲染所有可见的窗口 -->
    <Window
      v-for="window in visibleWindows"
      :key="window.id"
      :id="window.id"
      :title="window.title"
      :is-visible="window.isVisible && !window.isMinimized"
      :width="window.width"
      :height="window.height"
      :x="window.x"
      :y="window.y"
      :style="{ zIndex: window.zIndex }"
      @close="closeWindow(window.id)"
      @minimize="minimizeWindow(window.id)"
      @focus="bringToFront(window.id)"
    >
      <!-- 动态渲染窗口内容 -->
      <SettingsWindow v-if="window.component === 'SettingsWindow'" />
    </Window>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useWindowManager } from '~/composables/useWindowManager'
import Window from './Window.vue'
import SettingsWindow from './SettingsWindow.vue'

const {
  windows,
  closeWindow,
  minimizeWindow,
  bringToFront
} = useWindowManager()

const visibleWindows = computed(() => {
  return windows.value.filter(w => w.isVisible)
})
</script>

<style scoped>
.window-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.window-container > * {
  pointer-events: auto;
}

.window-page-content {
  min-height: 200px;
}
</style>