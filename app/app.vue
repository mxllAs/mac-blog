<template>
  <div>
    <Spotlight />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <WindowManager />
  </div>
</template>

<script setup>
import { useSetingStore } from "~/store/seting.js";
import Spotlight from "~/components/Spotlight.vue";
import { useSpotlight } from "~/composables/useSpotlight";
import { useMagicKeys } from "@vueuse/core";
import { useVersionNotification } from "~/composables/useVersionNotification";
// 🟢 引入 WindowManager，移除了单独的 MacModal 和 BlogInfo
import WindowManager from "~/components/WindowManager.vue";

const { setCurrentVersion } = useVersionNotification();
const spotlight = useSpotlight();
const route = useRoute();
const siteUrl = "https://www.xiaohev.com";
const setingStore = useSetingStore();

// --- 快捷键逻辑 ---
const { Meta_K, Ctrl_K } = useMagicKeys();

watch([Meta_K, Ctrl_K], ([isMetaK, isCtrlK]) => {
  if (isMetaK || isCtrlK) {
    spotlight.toggle();
  }
});

// --- 字体监听 ---
watchEffect(() => {
  if (import.meta.client && setingStore.currentFont.value) {
    document.body.style.fontFamily = `"${setingStore.currentFont.value}", system-ui, sans-serif`;
  }
});

// --- 初始化逻辑 ---
onMounted(async () => {
  document.addEventListener("keydown", handleKeyDown);

  if (import.meta.client) {
    // 字体恢复
    const savedFontValue = setingStore.currentFont.value;
    const savedFont = setingStore.fontList.find((f) => f.value === savedFontValue);
    if (savedFont && savedFont.url) {
      setingStore.updateFont(savedFont).catch(console.error);
    }

    // 版本检测
    try {
      const latestLog = await queryCollection("changelog")
        .order("date", "DESC")
        .order("title", "DESC")
        .limit(1)
        .first();

      if (latestLog && latestLog.title) {
        const match = latestLog.title.match(/[vV]?(\d+(\.\d+)*)/);
        const version = match ? `v${match[1]}` : "";
        if (version) {
          setCurrentVersion(version);
        }
      }
    } catch (e) {
      console.error("检查更新失败:", e);
    }
  }
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});

// ESC 处理
const handleKeyDown = (event) => {
  if (event.key === "Escape") {
    if (spotlight.isOpen.value) {
      spotlight.close();
    } else {
      navigateTo("/");
    }
  }
};

// --- SEO 配置 ---
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 小贺的博客` : "小贺的博客 - macOS 风格个人站";
  },
  meta: [
    { name: "description", content: "基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。" },
    { name: "keywords", content: "Nuxt 4, Vue 3, macOS风格, 个人博客, 前端开发" },
    { name: "author", content: "小贺" },
    { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
    // Open Graph
    { property: "og:site_name", content: "小贺的博客" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "小贺的博客 - macOS 风格个人站" },
    { property: "og:description", content: "基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。" },
    { property: "og:locale", content: "zh_CN" },
    { property: "og:url", content: computed(() => `${siteUrl}${route.path}`) },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "小贺的博客 - macOS 风格个人站" },
    { name: "twitter:description", content: "基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。" },
    // 爬虫
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { "http-equiv": "Content-Language", content: "zh-CN" },
    { name: "format-detection", content: "telephone=no" },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "canonical", href: computed(() => `${siteUrl}${route.path}`) },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "小贺的博客",
        description: "基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活",
        url: siteUrl,
        author: { "@type": "Person", name: "小贺" },
        publisher: { "@type": "Person", name: "小贺" },
        inLanguage: "zh-CN",
      }),
    },
  ],
});
</script>

<style scoped></style>