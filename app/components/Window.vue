<template>
  <div
    v-if="props.isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
    @click="handleBackdropClick"
  >
    <div
      ref="windowRef"
      class="bg-white rounded-lg shadow-2xl overflow-hidden min-w-[400px] min-h-[300px] max-w-[90vw] max-h-[90vh] flex flex-col"
      :style="windowStyle"
      @click.stop
    >
      <!-- 窗口标题栏 -->
      <div
        class="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between"
      >
        <div class="flex items-center space-x-3">
          <!-- macOS 窗口控制按钮 -->
          <div class="flex space-x-2">
            <button
              @click="closeWindow"
              class="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            ></button>
            <button
              @click="minimizeWindow"
              class="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
            ></button>
            <button
              @click="maximizeWindow"
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
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface Props {
  id: string
  title: string
  isVisible?: boolean
  width?: number
  height?: number
  x?: number
  y?: number
  zIndex?: number
  isMinimized?: boolean
  isMaximized?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: true,
  width: 600,
  height: 400,
  x: 100,
  y: 100,
  zIndex: 1000,
  isMinimized: false,
  isMaximized: false
})

const emit = defineEmits<{
  close: []
  minimize: []
  maximize: []
  resize: [width: number, height: number]
  focus: []
}>()

// 简化响应式数据
const isMaximized = ref(false)

// 优化计算属性，减少不必要的计算
const windowStyle = computed(() => {
  if (isMaximized.value) {
    return {
      width: '100vw',
      height: '100vh'
    }
  }
  return {
    width: `${props.width}px`,
    height: `${props.height}px`
  }
})

const closeWindow = () => emit('close')
const minimizeWindow = () => emit('minimize')
const maximizeWindow = () => {
  isMaximized.value = !isMaximized.value
  emit('maximize')
}

const focusWindow = () => {
  emit('focus')
}

const handleBackdropClick = () => {
  // 点击背景不关闭窗口，保持 macOS 行为
}


</script>

<style scoped>
.cursor-move {
  cursor: move;
}
</style>