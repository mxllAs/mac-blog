<template>
  <MacWindow @close="closeWindow" scrollbarColor="rgba(0, 0, 0, 0.25) rgba(255, 255, 255, 0.8)" :bgImg="bgImg">
    <div class="min-h-full bg-white/80">
      <div v-if="error" class="flex items-center justify-center h-96">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
              </path>
            </svg>
          </div>
          <p class="text-gray-600 mb-4">文章加载失败</p>
          <button @click="refresh"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            重新加载
          </button>
        </div>
      </div>

      <div v-else-if="article" class="max-w-4xl mx-auto p-6 md:p-8 h-full">
        <header class="mb-8">
          <h1 class="text-4xl font-bold text-gray-800 mb-4 leading-tight">
            {{ article.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <div v-if="article.category" class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z">
                </path>
              </svg>
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {{ article.category.name }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{{ formatDate(article.publishedAt) }}</span>
            </div>

            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                </path>
              </svg>
              <span>{{ article.views || 0 }} 次阅读</span>
            </div>

            <div class="flex gap-2">
              <span v-if="article.isRecommend" class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                推荐
              </span>
              <span v-if="article.isTop" class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                置顶
              </span>
            </div>
          </div>

          <div v-if="article.tags && article.tags.length > 0" class="flex flex-wrap gap-2">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z">
              </path>
            </svg>
            <span v-for="tag in article.tags" :key="tag._id"
              class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
              {{ tag.name }}
            </span>
          </div>
        </header>

        <div v-if="article.excerpt" class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg">
          <p class="text-blue-800 leading-relaxed">{{ article.excerpt }}</p>
        </div>

        <article class="prose prose-lg max-w-none">
          <div class="text-gray-700 leading-relaxed whitespace-pre-wrap font-light" v-html="article.content"></div>
        </article>

        <footer class="mt-12 pt-8 border-t border-gray-200">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div class="text-sm text-gray-500 space-y-1">
              <div>文章编号: #{{ article.postId }}</div>
              <div>创建时间: {{ formatDate(article.createdAt) }}</div>
              <div>更新时间: {{ formatDate(article.updatedAt) }}</div>
            </div>
          </div>
        </footer>
      </div>

      <div v-else class="flex items-center justify-center h-96">
        <div class="text-center text-gray-500">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p>未找到文章内容</p>
        </div>
      </div>
    </div>
  </MacWindow>
</template>

<script setup>
import MacWindow from "~/components/MacWindow.vue";
import defaultBgImg from "@/assets/images/def-list-img.webp";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

// 🟢 1. 引入 Highlight.js 核心和样式
import hljs from 'highlight.js';
// 推荐使用 atom-one-dark 主题，比较符合你的深色代码块风格
import 'highlight.js/styles/atom-one-dark.css'; 

// 设置dayjs为中文
dayjs.locale('zh-cn');
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const bgImg = computed(() => article.value?.cover?.url || defaultBgImg);

// 获取文章数据
const { data: article, error } = await useAsyncData(`article-${id}`, () =>
  useApi(`/post/${id}`)
);

// 🟢 2. 定义高亮函数
const highlightCode = async () => {
  if (import.meta.client) {
    // 等待 DOM 更新（v-html 渲染完成）
    await nextTick();
    // 查找所有代码块并应用高亮
    const blocks = document.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightElement(block);
    });
  }
};

// 🟢 3. 监听文章数据变化，触发高亮
watch(article, () => {
  if (article.value) {
    highlightCode();
  }
}, { immediate: true, flush: 'post' }); // flush: 'post' 确保在 DOM 更新后执行

// 🟢 4. 确保组件挂载时也尝试执行（应对 SSR 水合后的情况）
onMounted(() => {
  highlightCode();
});

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return "";
  return dayjs(dateString).format('YYYY年MM月DD日 HH:mm');
};

// 关闭窗口
const closeWindow = () => {
    router.push(`/article/list/1`);
};

// 设置TDK
useHead(() => {
  if (!article.value) return {};
  // 生成关键词字符串
  const keywords =
    article.value.keywords ||
    (article.value.tags &&
      article.value.tags.map((tag) => tag.name).join(", ")) ||
    "";
  // 生成描述字符串
  const description =
    article.value.excerpt ||
    (article.value.content
      ? article.value.content.substring(0, 200) + "..."
      : "文章详情") ||
    "文章详情";
  return {
    title: `${article.value.title}`,
    meta: [
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { property: "og:title", content: article.value.title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      {
        property: "article:published_time",
        content: article.value.publishedAt,
      },
      { property: "article:modified_time", content: article.value.updatedAt },
      { property: "article:author", content: "小贺" },
      {
        property: "article:section",
        content: article.value.category?.name || "默认分类",
      },
    ].filter(Boolean),
  };
});
</script>

<style scoped>
/* 自定义样式增强 */
.prose {
  line-height: 1.8;
  /* 允许选择文本 - 覆盖全局的 user-select: none */
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
}

.prose div {
  font-size: 16px;
  line-height: 1.8;
}

/* MacOS风格滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

/* ==================== 文章内容样式 ==================== */
/* 为后端返回的 HTML 内容添加样式 */

/* 段落样式 */
:deep(.prose p) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  line-height: 1.8;
  color: #374151;
  font-size: 1rem;
}

/* 标题样式 */
:deep(.prose h1) {
  font-size: 2.25em;
  font-weight: 800;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  color: #111827;
}

:deep(.prose h2) {
  font-size: 1.875em;
  font-weight: 700;
  line-height: 1.3333333;
  margin-top: 2em;
  margin-bottom: 1em;
  color: #1f2937;
  padding-bottom: 0.5em;
  border-bottom: 2px solid #e5e7eb;
}

:deep(.prose h3) {
  font-size: 1.5em;
  font-weight: 600;
  line-height: 1.6;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  color: #1f2937;
}

:deep(.prose h4) {
  font-size: 1.25em;
  font-weight: 600;
  line-height: 1.5;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: #374151;
}

:deep(.prose h5),
:deep(.prose h6) {
  font-size: 1.125em;
  font-weight: 600;
  line-height: 1.5;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: #374151;
}

/* 链接样式 */
:deep(.prose a) {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  border-bottom: 1px solid transparent;
}

:deep(.prose a:hover) {
  color: #2563eb;
  border-bottom-color: #3b82f6;
}

/* 强调和加粗 */
:deep(.prose strong) {
  font-weight: 700;
  color: #111827;
}

:deep(.prose em) {
  font-style: italic;
  color: #4b5563;
}

/* 行内代码 */
:deep(.prose code) {
  background-color: #f3f4f6;
  color: #ef4444;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-size: 0.875em;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-weight: 500;
}

/* 🟢 修改：代码块样式 - Mac 终端风格增强 */
:deep(.prose pre) {
  background-color: #282c34; /* 匹配 atom-one-dark */
  color: #abb2bf;
  overflow-x: auto;
  padding: 3rem 1.5rem 1.5rem 1.5rem; /* 🟢 顶部留出空间给红绿灯 */
  border-radius: 0.75rem; /* 圆角更大一点 */
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  line-height: 1.7;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
  position: relative; /* 🟢 必须：为伪元素定位 */
}

/* 🟢 核心：用 CSS 伪元素画出红黄绿三个点 */
:deep(.prose pre)::before {
  content: "";
  position: absolute;
  top: 18px;
  left: 18px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ff5f56; /* 红色圆点 */
  box-shadow: 
    20px 0 0 #ffbd2e, /* 黄色圆点 (向右偏移20px) */
    40px 0 0 #27c93f; /* 绿色圆点 (向右偏移40px) */
  opacity: 0.8;
  transition: opacity 0.2s;
}

:deep(.prose pre):hover::before {
  opacity: 1;
}

/* 🟢 覆盖 highlight.js 自带的背景色 */
:deep(.prose pre code.hljs) {
  background-color: transparent;
  color: inherit;
  padding: 0;
  border-radius: 0;
  font-size: 0.875em;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-weight: 400;
}

/* 代码块语言标识 */
:deep(.prose pre code.language-javascript),
:deep(.prose pre code.language-typescript),
:deep(.prose pre code.language-python),
:deep(.prose pre code.language-java),
:deep(.prose pre code.language-css),
:deep(.prose pre code.language-html) {
  position: relative;
}

/* 引用块样式 */
:deep(.prose blockquote) {
  border-left: 4px solid #3b82f6;
  padding-left: 1em;
  margin-left: 0;
  margin-right: 0;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  font-style: italic;
  color: #4b5563;
  background-color: #f9fafb;
  padding: 1em 1em 1em 1.5em;
  border-radius: 0 0.375em 0.375em 0;
}

:deep(.prose blockquote p) {
  margin-top: 0;
  margin-bottom: 0;
}

/* 无序列表 */
:deep(.prose ul) {
  list-style-type: disc;
  padding-left: 1.625em;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

:deep(.prose ul ul) {
  list-style-type: circle;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

:deep(.prose ul ul ul) {
  list-style-type: square;
}

/* 有序列表 */
:deep(.prose ol) {
  list-style-type: decimal;
  padding-left: 1.625em;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

:deep(.prose ol ol) {
  list-style-type: lower-alpha;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

/* 列表项 */
:deep(.prose li) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  line-height: 1.75;
  color: #374151;
}

:deep(.prose li p) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

/* 分割线 */
:deep(.prose hr) {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin-top: 3em;
  margin-bottom: 3em;
}

/* 图片样式 */
:deep(.prose img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5em;
  margin-top: 2em;
  margin-bottom: 2em;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* 表格样式 */
:deep(.prose table) {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}

:deep(.prose thead) {
  border-bottom: 2px solid #d1d5db;
}

:deep(.prose thead th) {
  color: #111827;
  font-weight: 600;
  vertical-align: bottom;
  padding: 0.5714286em;
  text-align: left;
}

:deep(.prose tbody tr) {
  border-bottom: 1px solid #e5e7eb;
}

:deep(.prose tbody tr:last-child) {
  border-bottom: none;
}

:deep(.prose tbody td) {
  vertical-align: top;
  padding: 0.5714286em;
  color: #374151;
}

:deep(.prose tbody tr:hover) {
  background-color: #f9fafb;
}

/* 特殊颜色文本 (来自后端的 style 属性) */
:deep(.prose span[style*="color"]) {
  font-weight: 500;
}

/* 删除线 */
:deep(.prose del) {
  text-decoration: line-through;
  color: #9ca3af;
}

/* 下划线 */
:deep(.prose u) {
  text-decoration: underline;
  text-decoration-color: #3b82f6;
  text-underline-offset: 2px;
}

/* 键盘按键样式 */
:deep(.prose kbd) {
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 0.25em;
  padding: 0.125em 0.375em;
  font-size: 0.875em;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
}

/* 标记/高亮文本 */
:deep(.prose mark) {
  background-color: #fef3c7;
  color: #92400e;
  padding: 0.125em 0.25em;
  border-radius: 0.125em;
}

/* 首字母大写 */
:deep(.prose p:first-of-type::first-letter) {
  font-size: 1.5em;
  font-weight: 700;
  color: #3b82f6;
  float: left;
  line-height: 1;
  margin-right: 0.1em;
}
</style>