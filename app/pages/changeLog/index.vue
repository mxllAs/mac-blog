<template>
  <MacWindow @close="closeWindow" scrollbarColor="rgba(0, 0, 0, 0.25) rgba(255, 255, 255, 0.8)">
    <div class="min-h-full bg-white/80 p-6 md:p-10">
      <div class="mb-10 border-b border-gray-200 pb-4 flex items-end justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">更新日志</h1>
          <p class="text-gray-500 text-sm mt-2">系统版本迭代记录</p>
        </div>
        <div v-if="logs && logs.length" class="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
          Latest: {{ logs[0].title }}
        </div>
      </div>

      <div class="max-w-4xl mx-auto">
        <div v-if="pending" class="text-center py-20 text-gray-400">
          <p>加载中...</p>
        </div>

        <div v-else-if="!logs || logs.length === 0"
          class="text-center py-20 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p class="text-lg">暂无更新记录</p>
          <p class="text-xs mt-2">请确保 content/changeLog/ 目录下有 .md 文件</p>
        </div>

        <div v-else v-for="(log, index) in logs" :key="log._path" class="mb-12 relative group">
          <div v-if="index !== logs.length - 1"
            class="absolute left-[19px] top-10 bottom-[-48px] w-0.5 bg-gray-100 group-hover:bg-blue-50 transition-colors">
          </div>

          <div class="flex gap-6">
            <div class="flex-shrink-0 mt-1 relative z-10">
              <div
                class="w-[45px] h-[45px] rounded-full bg-white text-blue-600 flex items-center justify-center text-xs font-bold border-2 border-blue-100 shadow-sm group-hover:border-blue-400 group-hover:scale-110 transition-all duration-300">
                {{ extractVersion(log.title) }}
              </div>
            </div>

            <div class="flex-grow pb-4">
              <header class="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                <h2 class="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{{ log.title }}
                </h2>
                <span
                  class="text-xs text-gray-400 font-mono mt-1 sm:mt-0 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                  {{ formatDate(log.date) }}
                </span>
              </header>

              <article class="prose prose-sm md:prose-base text-gray-600 max-w-none 
                prose-headings:text-gray-700 prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2
                prose-p:my-1 prose-ul:my-2 prose-li:my-0.5
                prose-a:text-blue-500 hover:prose-a:text-blue-600">

                <ContentRenderer :value="log" />

              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MacWindow>
</template>

<script setup>
import MacWindow from "~/components/MacWindow.vue";
import dayjs from "dayjs";

const router = useRouter();

// 版本更新通知
const { updateViewedVersion } = useVersionNotification();

// 关闭窗口
const closeWindow = () => {
  router.push("/");
};

// 【修复排序】
// 使用 order('date', 'DESC') 确保最新的日期排在最上面
const { data: logs, pending } = await useAsyncData('changelog-list', () => {
  return queryCollection('changelog')
    .order('date', 'DESC')   // 第一优先级：按日期降序 (新的日期在上面)
    .order('title', 'DESC')  // 第二优先级：如果日期一样，按标题降序 (v0.0.2 在 v0.0.1 上面)
    .all()
});

// 【修复版本号显示】
// 旧正则: /[vV]?(\d+(\.\d+)?)/ (只支持一位小数)
// 新正则: /[vV]?(\d+(\.\d+)*)/ (支持无限位小数，如 0.0.1, 1.0.0.5 等)
const extractVersion = (title) => {
  if (!title) return 'V';
  // 匹配 v 开头(可选)，后面跟着数字和点
  const match = title.match(/[vV]?(\d+(\.\d+)*)/);
  return match ? `v${match[1]}` : 'V';
};

// 格式化日期
const formatDate = (date) => {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD');
};

// 当用户进入日志页面时，记录当前最新版本
onMounted(() => {
  if (logs.value && logs.value.length > 0 && logs.value[0].title) {
    const latestVersion = extractVersion(logs.value[0].title);
    updateViewedVersion(latestVersion);
  }
});
useHead({
  title: '更新日志',
  meta: [
    { name: 'description', content: '查看小贺博客的版本迭代记录与更新历史。' }
  ]
});
</script>

<style scoped>
/* 去掉标题链接的所有默认样式，让它看起来就是普通文字 */
:deep(.prose h1 a),
:deep(.prose h2 a),
:deep(.prose h3 a) {
  color: inherit; /* 颜色跟随标题 */
  text-decoration: none; /* 去掉下划线 */
  pointer-events: none; /* 禁止点击 (如果你彻底不想让它点) */
  cursor: text; /* 鼠标变回文本输入状 */
}
/* 针对 Nuxt Content 渲染出的 HTML 进行样式微调，让它更像系统文档 */
:deep(.prose ul) {
  list-style-type: disc;
  padding-left: 1.2em;
}

:deep(.prose code) {
  background-color: #f3f4f6;
  color: #ef4444;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-size: 0.85em;
  font-family: monospace;
}
</style>
