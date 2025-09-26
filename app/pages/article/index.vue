<template>
  <MacWindow @close="closeWindow">
    <div>
      <h1 class="text-3xl font-bold mb-8 text-center">文章列表</h1>
      <div class="max-w-4xl mx-auto">
        <div class="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 class="text-xl font-semibold mb-4">最新文章</h2>

          <!-- 文章列表 -->
          <div class="space-y-4">
            <div
              v-for="article in articles"
              :key="article.id"
              class="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors group cursor-pointer"
              @click="goToArticle(article.id)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3
                    class="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors"
                  >
                    {{ article.title }}
                  </h3>
                  <p class="text-sm text-gray-600 mt-2 line-clamp-2">
                    {{ article.summary }}
                  </p>
                  <div
                    class="flex items-center mt-3 text-xs text-gray-500 space-x-4"
                  >
                    <span>{{ article.date }}</span>
                    <span>{{ article.category }}</span>
                    <span>阅读量: {{ article.views }}</span>
                  </div>
                </div>
                <div class="ml-4">
                  <svg
                    class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="mt-8 flex justify-center">
            <div class="flex items-center space-x-2">
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage <= 1"
                class="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
              >
                上一页
              </button>
              <span class="px-4 py-2 text-sm text-gray-600">
                第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
              </span>
              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage >= totalPages"
                class="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
              >
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MacWindow>
</template>

<script setup>
import MacWindow from "~/components/MacWindow.vue";

const router = useRouter();

// 模拟文章数据
const articles = ref([
  {
    id: 1,
    title: "Vue 3 Composition API 深入解析",
    summary:
      "深入了解 Vue 3 的 Composition API，掌握现代 Vue 开发的核心概念和最佳实践。",
    date: "2024-01-15",
    category: "Vue.js",
    views: 1234,
  },
  {
    id: 2,
    title: "Nuxt 4 新特性详解",
    summary:
      "探索 Nuxt 4 带来的全新特性，包括性能优化、开发体验提升等方面的改进。",
    date: "2024-01-10",
    category: "Nuxt.js",
    views: 856,
  },
  {
    id: 3,
    title: "Tailwind CSS 实战技巧",
    summary:
      "分享 Tailwind CSS 在实际项目中的使用技巧和最佳实践，提高开发效率。",
    date: "2024-01-05",
    category: "CSS",
    views: 692,
  },
  {
    id: 4,
    title: "JavaScript 异步编程进阶",
    summary:
      "深入理解 JavaScript 异步编程，包括 Promise、async/await 等高级概念。",
    date: "2023-12-28",
    category: "JavaScript",
    views: 1567,
  },
  {
    id: 5,
    title: "前端性能优化实战",
    summary:
      "从多个维度分析前端性能优化策略，包括代码分割、懒加载、缓存策略等。",
    date: "2023-12-20",
    category: "性能优化",
    views: 2134,
  },
]);
console.log(articles.value);

// 分页相关
const currentPage = ref(1);
const totalPages = ref(10);

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
</style>
