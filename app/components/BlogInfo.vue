<template>
    <div class="bg-white/90 backdrop-blur-sm rounded-lg p-5 shadow-lg">
        <!-- 头部信息 -->
        <div class="flex items-center space-x-3 mb-5 pb-4 border-b border-gray-200">
            <div
                class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span class="text-2xl">🍎</span>
            </div>
            <div>
                <h3 class="text-lg font-bold text-gray-800">小贺的技术博客</h3>
                <p class="text-xs text-gray-500">by 小贺 / mxll</p>
            </div>
        </div>

        <!-- 详细信息 -->
        <div class="space-y-2.5">
            <!-- 版本信息 -->
            <div class="flex items-center py-2 gap-3 group hover:bg-gray-50/50 rounded-md px-2 transition-colors">
                <span class="text-lg">📦</span>
                <div class="flex-1">
                    <span class="text-xs text-gray-500 block">版本</span>
                    <span class="text-sm font-semibold text-gray-800">{{ currentVersion }}</span>
                </div>
            </div>

            <!-- 框架信息 -->
            <div class="flex items-center py-2 gap-3 group hover:bg-gray-50/50 rounded-md px-2 transition-colors">
                <span class="text-lg">⚡</span>
                <div class="flex-1">
                    <span class="text-xs text-gray-500 block">框架</span>
                    <span class="text-sm font-semibold text-gray-800">Nuxt {{ nuxtVersion }}</span>
                </div>
            </div>

            <!-- 技术栈 -->
            <div class="flex items-center py-2 gap-3 group hover:bg-gray-50/50 rounded-md px-2 transition-colors">
                <span class="text-lg">🛠️</span>
                <div class="flex-1">
                    <span class="text-xs text-gray-500 block">技术栈</span>
                    <div class="flex flex-wrap gap-1.5 mt-1">
                        <span class="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">Tailwind
                            CSS</span>
                        <span
                            class="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Pinia</span>
                        <span
                            class="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">VueUse</span>
                        <span class="text-xs px-2 py-0.5 bg-pink-100 text-pink-700 rounded-full font-medium">Ant
                            Design</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 备案信息和版权信息 -->
        <div class="mt-5 pt-4 border-t border-gray-200/50">
            <div class="space-y-2">
                <!-- 备案信息 -->
                <div class="flex flex-col space-y-1 text-xs text-gray-500">
                    <a target="_blank" href="/"
                        class="hover:text-blue-500 transition-colors duration-200 hover:underline">
                        豫公网安备41017202000114号
                    </a>
                    <a href="https://beian.miit.gov.cn/" target="_blank"
                        class="hover:text-blue-500 transition-colors duration-200 hover:underline">
                        豫ICP备2022027159号-2
                    </a>
                </div>
                <!-- 版权信息 -->
                <div class="text-xs text-gray-500">
                    <span class="text-gray-400">©</span> 2024 - 2025 小贺 / mxll
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { version as nuxtVersion } from 'nuxt/package.json';

const config = useRuntimeConfig();

// 从 changelog 获取最新版本
const { data: latestLog } = await useAsyncData('latest-version', async () => {
    const logs = await queryCollection('changelog')
        .order('date', 'DESC')
        .order('title', 'DESC')
        .limit(1)
        .all();
    return logs?.[0] || null;
});

// 提取版本号（与日志页面保持一致的逻辑）
const extractVersion = (title) => {
    if (!title) return 'v' + config.public.version;
    const match = title.match(/[vV]?(\d+(\.\d+)*)/);
    return match ? `v${match[1]}` : 'v' + config.public.version;
};

// 当前版本（优先使用 changelog 中的最新版本，否则使用配置中的版本）
const currentVersion = computed(() => {
    if (latestLog.value?.title) {
        return extractVersion(latestLog.value.title);
    }
    return 'v' + config.public.version;
});
</script>

<style scoped></style>
