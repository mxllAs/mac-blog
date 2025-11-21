<template>
  <div class="py-2">
    <div class="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-3 shadow-2xl">
      <div class="flex items-center space-x-3">
        <!-- 导航路由 -->
        <template v-for="route in navigationRoutes" :key="route.path">
          <nuxt-link :to="route.path" v-if="!route.hidden">
            <div class="dock-item group">
              <div class="dock-icon-container" :class="route.gradient">
                <img :src="route.icon" :alt="route.alt" class="w-7 h-7" />
              </div>
            </div>
          </nuxt-link>
        </template>
        <!-- 文章列表 -->
        <!-- <div class="dock-item group">
          <div
            class="dock-icon-container bg-gradient-to-br from-green-400 to-emerald-600"
          @click="openArticleList = true"
          >
            <img :src="articleIcon" alt="文章列表" class="w-7 h-7" />
          </div>
        </div> -->
        <!-- 设置图标-打开新窗口 -->
        <div class="dock-item group" @click="openSettings">
          <div class="dock-icon-container bg-gradient-to-br from-gray-500 to-gray-700">
            <img :src="settingsIcon" alt="设置" class="w-7 h-7" />
          </div>
        </div>
        <!-- 分隔线 -->
        <div class="w-px h-8 bg-white/30 mx-1"></div>
        <!-- Trash -->
        <div class="dock-item group">
          <div class="dock-icon-container bg-gradient-to-br from-gray-400 to-gray-600">
            <img :src="trashIcon" alt="垃圾桶" class="w-7 h-7" />
          </div>
        </div>
        <MacModal v-model="open" title="设置" :drag="true">
          <Seting />
        </MacModal>
        <!-- 文章列表 -->
        <MacModal v-model="openArticleList" title="文章列表" :drag="true">
          <ArticleList />
        </MacModal>
      </div>
    </div>
  </div>
</template>

<script setup>
import MacModal from "@/components/MacModal.vue";
import ArticleList from "@/pages/article/components/index.vue";
import Seting from "@/components/seting/index.vue";
import finderIcon from "@/assets/svg/finder-icon.svg"; //首页
import articleIcon from "@/assets/svg/article-list-icon.svg"; //文章列表
// import linksIcon from "@/assets/svg/links-icon.svg"; //友情链接
import logIcon from "@/assets/svg/log.svg"; //友情链接
import aboutIcon from "@/assets/svg/about.svg"; //关于
import settingsIcon from "@/assets/svg/settings-icon.svg"; //设置
import trashIcon from "@/assets/svg/trash-icon.svg"; //垃圾桶

const open = ref(false);
const openArticleList = ref(false);
const openSettings = () => {
  open.value = true;
};

// 导航路由配置
const navigationRoutes = [
  {
    path: "/",
    icon: finderIcon,
    alt: "Finder",
    gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    hidden: false
  },
  {
    path: "/article/list",
    icon: articleIcon,
    alt: "文章列表",
    gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
    hidden: false
  },
  {
    // path: '/links',
    path: "/changeLog",
    icon: logIcon,
    // alt: '友情链接',
    alt: "更新日志",
    gradient: "bg-gradient-to-br from-orange-400 to-pink-500",
    hidden: false
  },
  {
    path: "/about",
    icon: aboutIcon,
    alt: "关于",
    gradient: "bg-gradient-to-br from-purple-400 to-purple-600",
    hidden: false
  },
];
</script>

<style scoped>
.dock-item {
  @apply cursor-pointer;
}

/* 统一的图标容器样式 */
.dock-icon-container {
  @apply w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-200 ease-out;
}

/* 添加发光效果 */
.dock-item:hover .dock-icon-container {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dock-icon-container {
    @apply w-10 h-10;
  }

  .dock-icon-container img {
    @apply w-5 h-5;
  }
}
</style>
