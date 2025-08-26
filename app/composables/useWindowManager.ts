import { ref, readonly } from 'vue'

export interface WindowConfig {
  id: string
  title: string
  component?: string
  path?: string
  width?: number
  height?: number
  x?: number
  y?: number
  zIndex?: number
  isMinimized?: boolean
  isMaximized?: boolean
  isVisible?: boolean
}

// 简化状态管理
const windows = ref<WindowConfig[]>([])
const activeWindowId = ref<string | null>(null)
let nextZIndex = 1000

export const useWindowManager = () => {
  const openWindow = (config: Omit<WindowConfig, 'zIndex' | 'isVisible'>) => {
    // 检查窗口是否已存在
    const existingIndex = windows.value.findIndex(w => w.id === config.id)
    if (existingIndex !== -1) {
      // 如果窗口已存在，将其置顶并显示
      const existingWindow = windows.value[existingIndex]
      existingWindow.isVisible = true
      existingWindow.isMinimized = false
      existingWindow.zIndex = ++nextZIndex
      activeWindowId.value = config.id
      return
    }

    // 创建新窗口，居中显示
    const windowCount = windows.value.length
    const windowWidth = config.width ?? 600
    const windowHeight = config.height ?? 400
    
    // 计算屏幕中央位置，考虑顶部和底部菜单栏
    const centerX = (window.innerWidth - windowWidth) / 2
    const centerY = (window.innerHeight - windowHeight) / 2
    
    // 为多个窗口添加偏移，避免完全重叠
    const offset = windowCount * 30
    
    const newWindow: WindowConfig = {
      ...config,
      zIndex: ++nextZIndex,
      isMinimized: false,
      isMaximized: false,
      isVisible: true,
      x: config.x ?? centerX + offset,
      y: config.y ?? centerY + offset
    }

    windows.value.push(newWindow)
    activeWindowId.value = config.id
  }

  const closeWindow = (id: string) => {
    const index = windows.value.findIndex(w => w.id === id)
    if (index !== -1) {
      windows.value.splice(index, 1)
      // 简化活动窗口逻辑
      if (activeWindowId.value === id) {
        activeWindowId.value = windows.value.length > 0 ? windows.value[windows.value.length - 1].id : null
      }
    }
  }

  const minimizeWindow = (id: string) => {
    const window = windows.value.find(w => w.id === id)
    if (window) {
      window.isMinimized = true
      window.isVisible = false
    }
  }

  const bringToFront = (id: string) => {
    const window = windows.value.find(w => w.id === id)
    if (window) {
      window.zIndex = ++nextZIndex
      activeWindowId.value = id
    }
  }

  return {
    windows: readonly(windows),
    activeWindowId: readonly(activeWindowId),
    openWindow,
    closeWindow,
    minimizeWindow,
    bringToFront
  }
}