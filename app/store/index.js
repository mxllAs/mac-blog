// store/index.js
import { useStorage } from "@vueuse/core";
export const useSetingStore = () => {
  const imageStore = useStorage("imageStore", {
    action: "~/assets/images/bg1.webp",
    list: [
      "~/assets/images/bg1.webp",
      "~/assets/images/bg2.webp",
      "~/assets/images/bg3.webp",
      "~/assets/images/bg4.webp",
    ],
  });
  return {
    imageStore,
  };
};
