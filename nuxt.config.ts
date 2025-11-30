// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["./app/assets/main.css"],
  devServer: {
    // port: 4399,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@ant-design-vue/nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/seo",
  ],
  site: {
    url: "https://www.xiaohev.com",
    name: "小贺的博客",
    description: "基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活",
    defaultLocale: "zh-cn",
  },
  sitemap: {
    // 禁用自动扫描应用路由源(pages, content等)
    excludeAppSources: true,
    // 核心修改：直接告诉 sitemap 插件去请求这个内部 API 获取数据
    sources: ["/api/sitemap-urls"],
  },
  image: {
    domains: ["xiaohev.com"],
  },
  runtimeConfig: {
    // 私有配置 (仅服务端 Nuxt SSR 可用)
    // 默认指向本地后端，本地开发和生产环境(如果后端在同一台服务器)通常都可以用这个
    apiBase: "http://127.0.0.1:9527",
    // apiBase: "https://www.xiaohev.com/api",

    public: {
      version: "0.0.1",
      defaultBgImage: "/images/bg2.webp",
      // 公共配置 (客户端/浏览器 可用)
      // 1. 本地开发：默认用 http://127.0.0.1:9527，浏览器直接连后端
      // 2. 生产环境(宝塔)：必须在环境变量设置 NUXT_PUBLIC_API_BASE = '/api' (或者你的公网域名)
      // apiBase: "http://127.0.0.1:9527",
      // apiBase: "https://www.xiaohev.com/api",
      apiBase: "/api",
    },
  },
});
