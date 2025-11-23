// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/main.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@ant-design-vue/nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxt/content",
    "@nuxt/icon",
  ],
  runtimeConfig: {
    // 私有配置 (仅服务端 Nuxt SSR 可用)
    // 默认指向本地后端，本地开发和生产环境(如果后端在同一台服务器)通常都可以用这个
    apiBase: "http://127.0.0.1:9527",

    public: {
      version: "0.0.1",
      defaultBgImage: "/images/bg2.webp",
      // 公共配置 (客户端/浏览器 可用)
      // 1. 本地开发：默认用 http://127.0.0.1:9527，浏览器直接连后端
      // 2. 生产环境(宝塔)：必须在环境变量设置 NUXT_PUBLIC_API_BASE = '/api' (或者你的公网域名)
      apiBase: "http://127.0.0.1:9527",
      // apiBase: "/api",
    },
  },
});
