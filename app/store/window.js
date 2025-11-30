import { defineStore } from 'pinia';

export const useWindowStore = defineStore('window', {
  state: () => ({
    // 全局层级计数器
    globalZIndex: 1000,
    
    // 窗口配置
    windows: {
      terminal: {
        id: 'terminal',
        title: 'Terminal',
        component: 'Terminal',
        width: '700px',
        isOpen: false,
        zIndex: 1000,
        isMinimize: false,
      },
      settings: {
        id: 'settings',
        title: '系统设置',
        component: 'Seting',
        width: '800px',
        isOpen: false,
        zIndex: 1000,
        isMinimize: false,
      },
      about: {
        id: 'about',
        title: '',
        component: 'BlogInfo',
        width: '320px',
        isOpen: false,
        zIndex: 1000,
        isMinimize: false,
      }
    }
  }),
  
  actions: {
    // 🟢 核心修复：强制自增，确保绝对置顶
    focus(id) {
      const win = this.windows[id];
      if (win && win.isOpen) {
        // 只要被点击，全局层级就+1，并贴给当前窗口
        // 这样当前窗口就一定是全场最高的
        this.globalZIndex++;
        win.zIndex = this.globalZIndex;
      }
    },

    open(id) {
      if (this.windows[id]) {
        this.windows[id].isOpen = true;
        this.windows[id].isMinimize = false;
        this.focus(id); // 打开时自动置顶
      }
    },

    close(id) {
      if (this.windows[id]) {
        this.windows[id].isOpen = false;
      }
    },

    toggle(id) {
      if (this.windows[id]) {
        if (this.windows[id].isOpen) {
          // 如果当前窗口已经是最高层级了，用户再次点击 Dock 图标，通常意图是最小化/关闭
          if (this.windows[id].zIndex === this.globalZIndex) {
            this.close(id);
          } else {
            // 如果它在后面，就把它提上来
            this.focus(id);
          }
        } else {
          this.open(id);
        }
      }
    }
  }
});