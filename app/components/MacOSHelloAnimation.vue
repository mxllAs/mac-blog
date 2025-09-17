<template>
  <div
    class="fixed inset-0 w-screen h-screen flex flex-col justify-center items-center overflow-hidden z-[9999] transition-opacity duration-1000 ease-out"
    :class="{ 'opacity-0 pointer-events-none': animationComplete }"
  >
    <!-- 渐变背景 -->
    <div
      class="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 via-pink-500 via-red-500 to-blue-500 bg-[length:400%_400%] animate-gradient-shift"
    ></div>

    <!-- Hello文字容器 -->
    <div class="relative z-10 mb-16">
      <div
        class="text-6xl md:text-8xl font-bold text-white text-center transition-all duration-700 ease-out tracking-wider font-sans"
        :class="
          showText
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-75 translate-y-5'
        "
      >
        你好
      </div>
    </div>

    <!-- 进度指示器 -->
    <div
      v-if="showProgress"
      class="relative z-10 w-80 opacity-0 animate-fade-in-progress"
    >
      <div
        class="w-full h-0.5 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm"
      >
        <div
          class="h-full bg-gradient-to-r from-white to-gray-200 rounded-full transition-all duration-100 ease-out shadow-lg shadow-white/50"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 响应式变量
const showText = ref(false);
const showProgress = ref(false);
const progress = ref(0);
const animationComplete = ref(false);

// 开始进度条动画
const startProgressAnimation = () => {
  showProgress.value = true;

  const progressInterval = setInterval(() => {
    progress.value += 2;
    if (progress.value >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => {
        animationComplete.value = true;
      }, 500);
    }
  }, 100);
};

// 组件挂载时开始动画
onMounted(() => {
  // 显示文字
  setTimeout(() => {
    showText.value = true;
  }, 300);

  // 1秒后开始进度条动画
  setTimeout(() => {
    startProgressAnimation();
  }, 1000);
});
</script>

<style scoped>
@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes fade-in-progress {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-gradient-shift {
  animation: gradient-shift 8s ease-in-out infinite;
}

.animate-fade-in-progress {
  animation: fade-in-progress 0.8s ease-out forwards;
}
</style>
