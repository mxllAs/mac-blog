<template>
  <div>
    <Spotlight />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useSetingStore } from "~/store/seting.js";
import Spotlight from "~/components/Spotlight.vue";
import { useSpotlight } from "~/composables/useSpotlight";
// ✅ 使用官方推荐的 useMagicKeys，完美解决 SSR 和 报错问题
import { useMagicKeys } from "@vueuse/core";
import { useVersionNotification } from "~/composables/useVersionNotification";
const { setCurrentVersion } = useVersionNotification();
const spotlight = useSpotlight();
const route = useRoute();
const siteUrl = "https://www.xiaohev.com";
const setingStore = useSetingStore();

// --- 1. 快捷键逻辑 (修复版) ---
// 使用响应式的 useMagicKeys
const { Meta_K, Ctrl_K } = useMagicKeys();

// 监听组合键按下
watch([Meta_K, Ctrl_K], ([isMetaK, isCtrlK]) => {
  if (isMetaK || isCtrlK) {
    // 切换搜索框显示/隐藏
    spotlight.toggle();
  }
});

// --- 2. 字体全局监听 ---
// 监听 Store 变化，动态修改 body 样式
watchEffect(() => {
  if (import.meta.client && setingStore.currentFont.value) {
    document.body.style.fontFamily = `"${setingStore.currentFont.value}", system-ui, sans-serif`;
  }
});

// --- 3. 页面初始化逻辑 ---
onMounted(async () => {
  // ESC 键监听 (返回首页或关闭搜索)
  document.addEventListener("keydown", handleKeyDown);

  // 字体恢复逻辑：如果用户之前选过特殊字体，刷新后静默加载
  if (import.meta.client) {
    const savedFontValue = setingStore.currentFont.value;
    const savedFont = setingStore.fontList.find(
      (f) => f.value === savedFontValue
    );

    // 如果是特殊字体且有 URL，就在后台下载
    if (savedFont && savedFont.url) {
      setingStore.updateFont(savedFont).catch(console.error);
    }
  }
  if (import.meta.client) {
    try {
      // 查询 content/changelog 下最新的文章
      const latestLog = await queryCollection("changelog")
        .order("date", "DESC")
        .order("title", "DESC")
        .limit(1)
        .first();

      if (latestLog && latestLog.title) {
        // 提取版本号 (例如 "v0.1.1")
        const match = latestLog.title.match(/[vV]?(\d+(\.\d+)*)/);
        const version = match ? `v${match[1]}` : "";

        // 更新状态
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

// ESC 键处理函数
const handleKeyDown = (event) => {
  if (event.key === "Escape") {
    // 优先关闭 Spotlight
    if (spotlight.isOpen.value) {
      spotlight.close();
    } else {
      // 否则返回首页
      navigateTo("/");
    }
  }
};

// --- 4. 全局 SEO 配置 ---
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - 小贺的博客`
      : "小贺的博客 - macOS 风格个人站";
  },
  meta: [
    {
      name: "description",
      content: "基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。",
    },
    {
      name: "keywords",
      content:
        "Nuxt 4, Vue 3, macOS风格, 个人博客, 前端开发, JavaScript, CSS, HTML",
    },
    { name: "author", content: "小贺" },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    },

    // Open Graph
    { property: "og:site_name", content: "小贺的博客" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "小贺的博客 - macOS 风格个人站" },
    {
      property: "og:description",
      content: "基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。",
    },
    { property: "og:locale", content: "zh_CN" },
    { property: "og:url", content: computed(() => `${siteUrl}${route.path}`) },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "小贺的博客 - macOS 风格个人站" },
    {
      name: "twitter:description",
      content: "基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。",
    },

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
        author: {
          "@type": "Person",
          name: "小贺",
        },
        publisher: {
          "@type": "Person",
          name: "小贺",
        },
        inLanguage: "zh-CN",
      }),
    },
  ],
});
</script>

<style scoped></style>
