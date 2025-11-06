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
  ],
  runtimeConfig: {
    public: {
      version: "0.0.1",
      defaultBgImage: "/images/bg2.webp",
      apiBase: "http://localhost:9527",
      // apiBase: "/api",
    },
  },
});
