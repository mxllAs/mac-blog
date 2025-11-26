<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isOpen" class="fixed inset-0 z-[999] flex items-start justify-center pt-[20vh]">

                <div class="absolute inset-0 bg-black/20 backdrop-blur-sm" @click="close"></div>

                <div class="relative w-[600px] max-w-[90vw] bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/40 overflow-hidden flex flex-col"
                    @click.stop>

                    <div class="flex items-center px-4 py-4 border-b border-gray-200/50">
                        <Icon name="ph:magnifying-glass-bold" class="w-6 h-6 text-gray-500 mr-3" />
                        <input ref="inputRef" v-model="query" type="text" placeholder="搜索应用、文章..."
                            class="flex-1 bg-transparent border-none outline-none text-xl text-gray-800 placeholder-gray-400"
                            @input="handleSearch" @keydown.esc="close" />
                        <Icon v-if="loading" name="ph:spinner-gap-bold" class="w-5 h-5 text-blue-500 animate-spin" />
                    </div>

                    <div v-if="hasResults" class="max-h-[400px] overflow-y-auto p-2 space-y-1">

                        <div v-if="filteredApps.length" class="mb-2">
                            <div class="px-2 py-1 text-xs text-gray-400 font-medium">应用</div>
                            <div v-for="app in filteredApps" :key="app.id"
                                class="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white group transition-colors"
                                @click="handleAppClick(app)">
                                <div class="w-6 h-6 mr-3 flex items-center justify-center">
                                    <img v-if="app.icon.includes('/')" :src="app.icon"
                                        class="w-full h-full object-contain" />
                                    <Icon v-else :name="app.icon"
                                        class="w-5 h-5 text-gray-600 group-hover:text-white" />
                                </div>
                                <span class="text-sm font-medium">{{ app.name }}</span>
                            </div>
                        </div>

                        <div v-if="searchedArticles.length" class="mb-2">
                            <div class="px-2 py-1 text-xs text-gray-400 font-medium">文章</div>
                            <div v-for="article in searchedArticles" :key="article.postId"
                                class="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white group transition-colors"
                                @click="handleArticleClick(article.postId)">
                                <Icon name="ph:article-medium-bold"
                                    class="w-5 h-5 mr-3 text-gray-500 group-hover:text-white" />
                                <div class="flex-1 min-w-0">
                                    <div class="text-sm font-medium truncate">{{ article.title }}</div>
                                    <div class="text-xs text-gray-400 group-hover:text-blue-100 truncate">{{
                                        article.excerpt || '暂无摘要' }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="query && !loading" class="p-8 text-center text-gray-400">
                        没有找到相关结果
                    </div>

                    <div v-else
                        class="px-4 py-2 bg-gray-50/50 text-xs text-gray-400 flex justify-between border-t border-gray-100">
                        <span>输入关键词搜索</span>
                        <div class="flex gap-2 items-center">
                            <span class="cursor-pointer hover:text-gray-600 transition-colors"
                                @click="close">点击背景关闭</span>
                            <span class="w-px h-3 bg-gray-300 mx-1"></span>
                            <span class="bg-gray-200 px-1.5 rounded">ESC</span>
                        </div>
                    </div>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useSpotlight } from '~/composables/useSpotlight'
import { dockApps } from '~/config/apps'
import { useDebounceFn } from '@vueuse/core'

const { isOpen, close } = useSpotlight()
const router = useRouter()

const query = ref('')
const inputRef = ref(null)
const loading = ref(false)
const searchedArticles = ref([])

// 自动聚焦
watch(isOpen, async (val) => {
    if (val) {
        query.value = ''
        searchedArticles.value = []
        await nextTick()
        inputRef.value?.focus()
    }
})

// 1. 本地搜索
const filteredApps = computed(() => {
    if (!query.value) return []
    const lowerQuery = query.value.toLowerCase()
    return dockApps.filter(app =>
        app.name.toLowerCase().includes(lowerQuery)
    )
})

// 2. 远程搜索 (防抖)
const handleSearch = useDebounceFn(async () => {
    if (!query.value.trim()) {
        searchedArticles.value = []
        return
    }

    loading.value = true
    try {
        const res = await useApi('/post', {
            params: {
                keyword: query.value,
                pageSize: 5
            }
        })
        searchedArticles.value = res.posts || []
    } catch (e) {
        console.error('搜索失败', e)
    } finally {
        loading.value = false
    }
}, 300)

const hasResults = computed(() => filteredApps.value.length > 0 || searchedArticles.value.length > 0)

const handleAppClick = (app) => {
    if (app.isExternal) window.open(app.path, '_blank')
    else router.push(app.path)
    close()
}

const handleArticleClick = (id) => {
    router.push(`/article/${id}`)
    close()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>