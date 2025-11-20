// // store/index.js
// import { useStorage } from "@vueuse/core";
// import { useRuntimeConfig, useCookie } from "#app";
// export const useSetingStore = () => {
//   const config = useRuntimeConfig();
//   const actionCookie = useCookie("action", {
//     default: () => config.public.defaultBgImage,
//   });
//   const imageStore = useStorage("imageStore", {
//     action: actionCookie.value,
//     list: [
//       "/images/bg1.webp",
//       "/images/bg2.webp",
//       "/images/bg3.webp",
//       "/images/bg4.webp",
//     ],
//   });

//   // 更新选中的背景图片的方法
//   const updateSelectedImage = (imagePath) => {
//     if (imageStore.value && imagePath) {
//       imageStore.value.action = imagePath;
//       actionCookie.value = imagePath;
//     }
//   };

//   // 获取当前选中的图片
//   const getCurrentImage = () => {
//     return imageStore.value?.action;
//   };

//   // 获取图片列表
//   const getImageList = () => {
//     return imageStore.value?.list || [];
//   };

//   return {
//     imageStore,
//     updateSelectedImage,
//     getCurrentImage,
//     getImageList,
//   };
// };
// store/index.js (Composition API 风格)

import { useCookie, useRuntimeConfig } from "#app";

// 这是一个 Composition API 风格的函数 Store
// 注意：如果你安装了 Pinia 模块，建议使用 defineStore 来避免激活错误
export const useSetingStore = () => {
  // 1. 获取配置和默认值
  const config = useRuntimeConfig();
  // 确保有一个可用的默认值作为回退
  const DEFAULT_BG_IMAGE = config.public.defaultBgImage;

  // 2. 状态：使用 useCookie 存储当前选中的图片路径
  // Nuxt 会自动处理 SSR 同步。
  const selectedImageCookie = useCookie("blog_bg_image", {
    // 关键：设置默认值。只有当 Cookie 不存在时才使用这个值。
    // default: () => DEFAULT_BG_IMAGE,
    // maxAge: 60 * 60 * 24 * 30, // 30 天有效期
  });

  // 3. 静态图片列表 (不需要持久化或 SSR)
  const imageList = [
    "/images/bg1.webp",
    "/images/bg2.webp", // 使用环境变量默认值
    "/images/bg3.webp",
    "/images/bg4.webp",
  ];

  // 4. 动作：更新选中的背景图片
  const updateSelectedImage = (imagePath) => {
    if (imagePath) {
      // ✅ 修复：将用户选择的新路径赋值给 Cookie
      selectedImageCookie.value = imagePath;
    }
  };

  // 5. 返回响应式状态和方法
  return {
    // 暴露 useCookie 返回的响应式 Ref
    selectedImage: selectedImageCookie,
    imageList,
    updateSelectedImage,
  };
};
