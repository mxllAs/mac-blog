<template>
  <div>
    <!-- MacOS Hello 加载动画 -->
    <!-- <div v-if="once"> -->
    <!-- <MacOSHelloAnimation /> -->
    <!-- </div> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// import MacOSHelloAnimation from "~/components/MacOSHelloAnimation.vue";
const route = useRoute();
// 定义你的基础域名（末尾不带斜杠）
const siteUrl = 'https://www.xiaohev.com';
// 配置TDK
useHead({
  // 这里的 %s 会被子页面的 title 替换
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 小贺的博客` : '小贺的博客 - macOS 风格个人站';
  },
  meta: [
    // 基础 SEO 标签
    { name: 'description', content: '基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。' },
    { name: 'keywords', content: 'Nuxt 4, Vue 3, macOS风格, 个人博客, 前端开发, JavaScript, CSS, HTML' },
    { name: 'author', content: '小贺' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },

    // Open Graph (社交媒体分享)
    { property: 'og:site_name', content: '小贺的博客' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: '小贺的博客 - macOS 风格个人站' },
    { property: 'og:description', content: '基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。' },
    { property: 'og:locale', content: 'zh_CN' },
    // 2. 新增：动态设置 Open Graph 的 URL，这对分享很重要
    { property: 'og:url', content: computed(() => `${siteUrl}${route.path}`) },

    // Twitter Cards
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '小贺的博客 - macOS 风格个人站' },
    { name: 'twitter:description', content: '基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。' },

    // 其他 SEO 标签
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' },
    { 'http-equiv': 'Content-Language', content: 'zh-CN' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    // 3. 修复：使用 computed 动态计算规范 URL
    { 
      rel: 'canonical', 
      href: computed(() => `${siteUrl}${route.path}`) 
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      // Schema 这里的 URL 保持为首页通常没问题，因为它描述的是"Blog"这个整体实体
      // 如果你想让它更精确，也可以改成动态的，但目前的配置作为全局配置是可以接受的
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
// 全局监听ESC键，按下时回到首页
const handleKeyDown = (event) => {
  if (event.key === "Escape") {
    navigateTo("/");
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});

</script>

<style scoped></style>
