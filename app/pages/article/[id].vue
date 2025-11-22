<template>
  <MacWindow
    @close="closeWindow"
    scrollbarColor="rgba(0, 0, 0, 0.25) rgba(255, 255, 255, 0.8)"
    :bgImg="bgImg"
  >
    <div class="min-h-full bg-white/80">
      <!-- 错误状态 -->
      <div v-if="error" class="flex items-center justify-center h-96">
        <div class="text-center">
          <div
            class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <p class="text-gray-600 mb-4">文章加载失败</p>
          <button
            @click="refresh"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            重新加载
          </button>
        </div>
      </div>

      <!-- 文章内容 -->
      <div v-else="article" class="max-w-4xl mx-auto p-6 md:p-8 h-full">
        <!-- 文章头部 -->
        <header class="mb-8">
          <!-- 标题 -->
          <h1 class="text-4xl font-bold text-gray-800 mb-4 leading-tight">
            {{ article.title }}
          </h1>

          <!-- 文章元信息 -->
          <div
            class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4"
          >
            <!-- 分类 -->
            <div v-if="article.category" class="flex items-center gap-2">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                ></path>
              </svg>
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {{ article.category.name }}
              </span>
            </div>

            <!-- 发布时间 -->
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span>{{ formatDate(article.publishedAt) }}</span>
            </div>

            <!-- 阅读量 -->
            <div class="flex items-center gap-2">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
              <span>{{ article.views || 0 }} 次阅读</span>
            </div>

            <!-- 推荐和置顶标签 -->
            <div class="flex gap-2">
              <span
                v-if="article.isRecommend"
                class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs"
              >
                推荐
              </span>
              <span
                v-if="article.isTop"
                class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
              >
                置顶
              </span>
            </div>
          </div>

          <!-- 标签 -->
          <div
            v-if="article.tags && article.tags.length > 0"
            class="flex flex-wrap gap-2"
          >
            <svg
              class="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              ></path>
            </svg>
            <span
              v-for="tag in article.tags"
              :key="tag._id"
              class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {{ tag.name }}
            </span>
          </div>
        </header>

        <!-- 文章摘要 -->
        <div
          v-if="article.excerpt"
          class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg"
        >
          <p class="text-blue-800 leading-relaxed">{{ article.excerpt }}</p>
        </div>

        <!-- 文章内容 -->
        <article class="prose prose-lg max-w-none">
          <div
            class="text-gray-700 leading-relaxed whitespace-pre-wrap font-light"
            v-html="article.content"
          ></div>
        </article>

        <!-- 文章底部信息 -->
        <footer class="mt-12 pt-8 border-t border-gray-200">
          <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <!-- 文章统计 -->
            <div class="text-sm text-gray-500 space-y-1">
              <div>文章编号: #{{ article.postId }}</div>
              <div>创建时间: {{ formatDate(article.createdAt) }}</div>
              <div>更新时间: {{ formatDate(article.updatedAt) }}</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </MacWindow>
</template>

<script setup>
import MacWindow from "~/components/MacWindow.vue";
import defaultBgImg from "@/assets/images/def-list-img.webp";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

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
// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return "";
  return dayjs(dateString).format('YYYY年MM月DD日 HH:mm');
};

// 关闭窗口
const closeWindow = () => {
  router.back();
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
    title: `${article.value.title} - 文章详情`,
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
</style>
