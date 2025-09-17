// store/index.js
import { useStorage } from "@vueuse/core";
export const useSetingStore = () => {
  const imageStore = useStorage("imageStore", {
    action: "/images/bg2.webp",
    list: [
      "/images/bg1.webp",
      "/images/bg2.webp",
      "/images/bg3.webp",
      "/images/bg4.webp",
    ],
  });

  // 更新选中的背景图片的方法
  const updateSelectedImage = (imagePath) => {
    if (imageStore.value && imagePath) {
      imageStore.value.action = imagePath;
      console.log("背景图片已更新为:", imagePath);
    }
  };

  // 获取当前选中的图片
  const getCurrentImage = () => {
    return imageStore.value?.action || "/images/bg1.webp";
  };

  // 获取图片列表
  const getImageList = () => {
    return imageStore.value?.list || [];
  };

  return {
    imageStore,
    updateSelectedImage,
    getCurrentImage,
    getImageList,
  };
};
