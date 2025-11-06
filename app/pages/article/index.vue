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
              :key="article._id"
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
                    {{ article.excerpt }}
                  </p>
                  <div
                    class="flex items-center mt-3 text-xs text-gray-500 space-x-4"
                  >
                    <span>{{ article.createdAt }}</span>
                    <span>{{ article.category.name }}</span>
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
const config = useRuntimeConfig();

// 模拟文章数据
const articles = ref([]);

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
const { data } = useAsyncData("postList", () =>
  $fetch(config.public.apiBase + "/post")
);
if (data.value && data.value.code === 200) {
  articles.value = data.value.data.posts;
}
// const getPostList = () => {
//   const { data } = useAsyncData("postList", () =>
//     $fetch(config.public.apiBase + "/post")
//   );
//   if (data.value && data.value.code === 200) {
//     articles.value = data.value.data.posts;
//   }
// };
// getPostList();
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
