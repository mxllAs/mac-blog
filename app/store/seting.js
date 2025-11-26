import { useCookie, useRuntimeConfig, useState } from "#app";

export const useSetingStore = () => {
  const config = useRuntimeConfig();

  // ==============================
  // 1. 背景图片逻辑 (保持不变)
  // ==============================
  const selectedImageCookie = useCookie("blog_bg_image");

  const imageList = [
    "/images/bg1.webp",
    "/images/bg2.webp",
    "/images/bg3.webp",
    "/images/bg4.webp",
  ];

  const updateSelectedImage = (imagePath) => {
    if (imagePath) selectedImageCookie.value = imagePath;
  };

  // ==============================
  // 2. 字体设置逻辑 (新增)
  // ==============================

  // 定义字体列表
  const fontList = [
    {
      name: "系统默认",
      // 建议使用 "sans-serif" 而不是空字符串，保证 CSS 语法正确
      value: "sans-serif",
      desc: "System Default",
      url: ""
    },
    {
      name: "方圆体",
      value: "AlimamaFangYuanTiVF",
      // 优化描述：突出口感
      desc: "圆润柔和，温婉灵动",
      url: "/fonts/AlimamaFangYuanTiVF-Thin.woff2"
    },
    {
      name: "数黑体",
      value: "AlimamaShuHeiTi",
      // 优化描述：突出科技感
      desc: "科技硬朗，清晰干练",
      url: "/fonts/AlimamaShuHeiTi-Bold.woff2"
    }
  ];

  // 当前选中的字体 (持久化存储)
  const currentFontCookie = useCookie("blog_current_font", {
    default: () => "sans-serif",
    maxAge: 60 * 60 * 24 * 365 // 1年
  });

  // 已加载的字体集合 (内存状态，刷新后重置)
  const loadedFonts = useState('loaded_fonts_set', () => new Set());

  // 核心动作：切换字体
  const updateFont = async (font) => {
    // A. 如果是系统字体，直接切
    if (!font.url) {
      currentFontCookie.value = font.value;
      return;
    }

    // B. 如果已经下载过，直接切
    if (loadedFonts.value.has(font.value)) {
      currentFontCookie.value = font.value;
      return;
    }

    // C. 没下载过？开始下载！
    try {
      // 1. 创建 FontFace 对象
      const fontFace = new FontFace(font.value, `url(${font.url})`);

      // 2. 触发下载 (这里是异步的，会等待下载完成)
      await fontFace.load();

      // 3. 加入到页面文档流
      document.fonts.add(fontFace);

      // 4. 标记为已下载
      loadedFonts.value.add(font.value);

      // 5. 切换选中状态
      currentFontCookie.value = font.value;

    } catch (err) {
      console.error("字体下载失败:", err);
      throw err; // 抛出错误让 UI 层捕获
    }
  };

  return {
    // 图片相关
    selectedImage: selectedImageCookie,
    imageList,
    updateSelectedImage,
    // 字体相关
    currentFont: currentFontCookie,
    fontList,
    updateFont
  };
};