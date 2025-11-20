export const useAnimationStore = defineStore('animationStore', {
  state: () => ({
    once: false,
  }),
  actions: {
    updateOnce() {
      this.once = false;
    }
  }
})
