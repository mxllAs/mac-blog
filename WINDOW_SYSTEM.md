# macOS 风格窗口系统使用说明

## 概述

本项目实现了一个类似 macOS 的窗口系统，允许在网页中打开多个独立的窗口，每个窗口都可以独立操作、拖拽、最小化和关闭。

## 核心组件

### 1. Window.vue
基础窗口组件，提供了 macOS 风格的窗口外观和交互功能：
- 窗口标题栏（带有红、黄、绿三个控制按钮）
- 窗口拖拽功能
- 窗口最小化、最大化、关闭功能
- 响应式窗口大小

### 2. WindowContainer.vue
窗口容器组件，负责管理和渲染所有打开的窗口：
- 渲染所有可见窗口
- 处理窗口层级（z-index）
- 动态加载窗口内容

### 3. useWindowManager.ts
窗口管理器 Composable，提供窗口状态管理功能：
- 打开/关闭窗口
- 窗口最小化/恢复
- 窗口位置和大小管理
- 窗口层级管理

## 使用方法

### 1. 打开窗口

```typescript
import { useWindowManager } from '~/composables/useWindowManager'

const { openWindow } = useWindowManager()

// 打开一个自定义组件窗口
openWindow({
  id: 'settings',
  title: '系统偏好设置',
  component: 'SettingsWindow',
  width: 700,
  height: 600
})

// 打开一个页面路径窗口
openWindow({
  id: 'finder',
  title: 'Finder',
  path: '/finder',
  width: 800,
  height: 500
})
```

### 2. 窗口配置选项

```typescript
interface WindowConfig {
  id: string          // 窗口唯一标识符
  title: string       // 窗口标题
  component?: string  // 要渲染的组件名称
  path?: string      // 页面路径（用于路由页面）
  width?: number     // 窗口宽度（默认 600px）
  height?: number    // 窗口高度（默认 400px）
  x?: number         // 窗口 X 坐标（默认居中）
  y?: number         // 窗口 Y 坐标（默认居中）
}
```

### 3. 添加新的窗口内容

#### 方法一：创建专用组件
1. 在 `components/` 目录下创建新组件
2. 在 `WindowContainer.vue` 中添加组件引用
3. 在窗口内容渲染部分添加条件判断

#### 方法二：使用页面路径
1. 在 `WindowContainer.vue` 的路径判断中添加新路径
2. 定义对应的页面内容

### 4. 在 Dock 中添加应用图标

在 `BottomBar.vue` 中添加新的图标和点击事件：

```vue
<template>
  <div class="dock-item group" @click="openMyApp">
    <div class="dock-icon-container bg-gradient-to-br from-color-500 to-color-700">
      <img src="~/assets/svg/my-app-icon.svg" alt="我的应用" class="w-7 h-7" />
    </div>
  </div>
</template>

<script setup>
const openMyApp = () => {
  openWindow({
    id: 'my-app',
    title: '我的应用',
    component: 'MyAppWindow',
    width: 600,
    height: 400
  })
}
</script>
```

## 窗口功能

### 窗口控制
- **红色按钮**：关闭窗口
- **黄色按钮**：最小化窗口
- **绿色按钮**：最大化/恢复窗口

### 窗口操作
- **拖拽**：点击标题栏拖拽窗口
- **层级**：点击窗口将其置于最前
- **多窗口**：支持同时打开多个窗口

## 示例应用

项目中已经实现了两个示例应用：

1. **系统偏好设置**：完整的设置界面，包含通用、显示、网络等设置项
2. **Finder**：文件管理器界面，展示文件夹和最近使用的文件

## 技术特性

- 🎨 **macOS 风格设计**：完全仿照 macOS 的窗口外观和交互
- 🖱️ **拖拽支持**：流畅的窗口拖拽体验
- 📱 **响应式设计**：适配不同屏幕尺寸
- 🔄 **状态管理**：完整的窗口状态管理系统
- ⚡ **性能优化**：高效的窗口渲染和更新机制
- 🎯 **TypeScript 支持**：完整的类型定义

## 扩展建议

1. **窗口动画**：添加窗口打开/关闭的动画效果
2. **窗口大小调整**：实现窗口边缘拖拽调整大小
3. **窗口快照**：保存和恢复窗口状态
4. **多桌面支持**：实现虚拟桌面功能
5. **窗口分组**：支持窗口标签页或分组功能

这个窗口系统为你的 Nuxt 应用提供了一个强大而灵活的多窗口界面基础，可以根据具体需求进行进一步的定制和扩展。