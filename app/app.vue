<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useSetingStore } from "~/store/seting.js"; // 引入 Store

const route = useRoute();
const siteUrl = 'https://www.xiaohev.com';

// --- 1. 字体全局监听 (新增核心逻辑) ---
const setingStore = useSetingStore();

// 监听 Store 变化，动态修改 body 样式
watchEffect(() => {
  if (import.meta.client && setingStore.currentFont.value) {
    // 将选中的字体应用到全局
    document.body.style.fontFamily = `"${setingStore.currentFont.value}", system-ui, sans-serif`;
  }
});

// --- 2. 页面初始化逻辑 ---
onMounted(() => {
  // ESC 键监听
  document.addEventListener("keydown", handleKeyDown);

  // 字体恢复逻辑：如果用户之前选过特殊字体，刷新后静默加载
  if (import.meta.client) {
    const savedFontValue = setingStore.currentFont.value;
    const savedFont = setingStore.fontList.find(f => f.value === savedFontValue);

    // 如果是特殊字体且有 URL，就在后台下载
    if (savedFont && savedFont.url) {
      setingStore.updateFont(savedFont).catch(console.error);
    }
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});

const handleKeyDown = (event) => {
  if (event.key === "Escape") {
    navigateTo("/");
  }
};

// --- 3. SEO 配置 (保持不变) ---
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 小贺的博客` : '小贺的博客 - macOS 风格个人站';
  },
  meta: [
    { name: 'description', content: '基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。' },
    { name: 'keywords', content: 'Nuxt 4, Vue 3, macOS风格, 个人博客, 前端开发, JavaScript, CSS, HTML' },
    { name: 'author', content: '小贺' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
    { property: 'og:site_name', content: '小贺的博客' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: '小贺的博客 - macOS 风格个人站' },
    { property: 'og:description', content: '基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。' },
    { property: 'og:locale', content: 'zh_CN' },
    { property: 'og:url', content: computed(() => `${siteUrl}${route.path}`) },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '小贺的博客 - macOS 风格个人站' },
    { name: 'twitter:description', content: '基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。' },
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' },
    { 'http-equiv': 'Content-Language', content: 'zh-CN' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: computed(() => `${siteUrl}${route.path}`) }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "小贺的博客",
        "description": "基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活",
        "url": siteUrl,
        "author": {
          "@type": "Person",
          "name": "小贺"
        },
        "publisher": {
          "@type": "Person",
          "name": "小贺"
        },
        "inLanguage": "zh-CN"
      })
    }
  ]
})
</script>

<style scoped></style>