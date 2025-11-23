<template>
  <MacWindow @close="closeWindow" scrollbarColor="rgba(0, 0, 0, 0.25) rgba(255, 255, 255, 0.8)">
    <div class="min-h-full bg-white/80 p-4 md:p-6">
      <div class="max-w-7xl mx-auto">
        <!-- 页面标题 -->
        <div class="text-center mb-12">
          <h1
            class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            文章列表
          </h1>
          <p class="text-gray-600 text-lg">探索精彩内容,发现无限可能</p>
        </div>

        <!-- 文章网格布局 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(article, index) in articles" :key="article._id"
            class="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            @click="goToArticle(article.postId)">
            <!-- 缩略图区域 -->
            <div class="relative h-48 overflow-hidden">
              <NuxtImg :src="article.cover?.url ? `https://www.xiaohev.com${article.cover.url}` : defListImg"
                :alt="`文章:${article.title}缩略图`" format="webp" loading="lazy" placeholder
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <!-- 分类标签 -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full shadow">
                  {{ article.category.name }}
                </span>
              </div>
            </div>

            <!-- 文章内容 -->
            <div class="p-6">
              <!-- 标题 -->
              <h3
                class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                {{ article.title }}
              </h3>

              <!-- 摘要 -->
              <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                {{ article.excerpt }}
              </p>

              <!-- 元信息 -->
              <div class="flex items-center justify-between text-xs text-gray-500">
                <div class="flex items-center space-x-4">
                  <!-- 日期 -->
                  <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd" />
                    </svg>
                    <span>{{
                      dayjs(article.createdAt).format("YYYY-MM-DD")
                    }}</span>
                  </div>
                </div>

                <!-- 阅读量 -->
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd" />
                  </svg>
                  <span>{{ article.views }}</span>
                </div>
              </div>

              <!-- 标签 -->
              <div class="flex flex-wrap gap-2 mt-4">
                <span v-for="tag in article.tags.slice(0, 3)" :key="tag._id"
                  class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {{ tag.name }}
                </span>
                <span v-if="article.tags.length > 3" class="px-2 py-1 bg-gray-100 text-gray-400 rounded-full text-xs">
                  +{{ article.tags.length - 3 }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="articles.length === 0" class="text-center py-16">
          <div class="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <p class="text-xl text-gray-600">暂无文章</p>
          <p class="text-gray-500 mt-2">精彩内容即将呈现...</p>
        </div>

        <!-- 分页 -->
        <div class="mt-12 flex justify-center">
          <div class="flex items-center space-x-2">
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1"
              class="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
              <span>上一页</span>
            </button>

            <div class="flex items-center space-x-1">
              <span class="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg">第 {{ currentPage }} 页</span>
              <span class="text-gray-400 mx-1">/</span>
              <span class="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg">共 {{ totalPages }} 页</span>
            </div>

            <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages"
              class="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center space-x-2">
              <span>下一页</span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </MacWindow>
</template>

<script setup>
import dayjs from "dayjs";
import MacWindow from "~/components/MacWindow.vue";
// 图片已放入 public/images 目录,直接使用绝对路径字符串
const defListImg = "/images/def-list-img.webp";
const router = useRouter();
const route = useRoute();

// 模拟文章数据
const articles = ref([]);

// 分页相关
const currentPage = ref(Number(route.params.page));
const totalPages = ref(0);

// 使用封装的API获取文章列表,监听路由参数变化
const { data: articleData, error, refresh } = await useAsyncData(
  () => `postList-${currentPage.value}`,
  () =>
    useApi("/post", {
      params: {
        page: currentPage.value,
        pageSize: 9,
        status: 1,
      },
    }),
  { watch: [currentPage] }
);

// 监听路由参数变化
watch(
  () => route.params.page,
  (newPage) => {
    currentPage.value = Number(newPage);
  },
  { immediate: true }
);

// 处理数据
watchEffect(() => {
  if (error.value) {
    // 错误现在会被自动捕获,这里可以处理UI反馈,例如显示一个错误提示
    console.error("获取文章列表失败:", error.value.message);
  } else if (articleData.value) {
    // 如果成功,articleData.value就是后端返回的data对象
    articles.value = articleData.value.posts;
    totalPages.value = articleData.value.totalPages;
  }
});

// 跳转到文章详情
const goToArticle = (id) => {
  router.push(`/article/${id}`);
};

// 跳转到指定页面
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    router.push(`/article/list/${page}`);
  }
};
// 关闭窗口
const closeWindow = () => {
  router.push("/");
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 平滑滚动效果 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #4f46e5, #7c3aed);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #6366f1, #8b5cf6);
}

/* 文章卡片悬停效果 */
.article-card {
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
}

/* 缩略图悬停效果 */
.thumbnail-img {
  transition: transform 0.5s ease;
}

.article-card:hover .thumbnail-img {
  transform: scale(1.05);
}

/* 标题悬停效果 */
.title-text {
  transition: all 0.3s ease;
}

.article-card:hover .title-text {
  color: #4f46e5;
}

/* 分类标签样式 */
.category-tag {
  transition: all 0.2s ease;
}

.category-tag:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 标签样式 */
.tag-item {
  transition: all 0.2s ease;
}

.tag-item:hover {
  background-color: #e5e7eb;
}

/* 分页按钮悬停效果 */
.pagination-btn {
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f9fafb;
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 2rem;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .article-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .article-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 空状态动画 */
.empty-state-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

/* 减少动画偏好 */
@media (prefers-reduced-motion: reduce) {

  .article-card,
  .thumbnail-img,
  .title-text,
  .category-tag,
  .tag-item,
  .pagination-btn {
    transition: none;
  }

  .article-card:hover {
    transform: none;
  }

  .empty-state-icon {
    animation: none;
  }
}
</style>
