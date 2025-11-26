<template>
    <Transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]" @click.self="close">
            <div class="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

            <div
                class="relative w-[600px] max-w-[90vw] bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/40 overflow-hidden flex flex-col">

                <div class="flex items-center px-4 py-4 border-b border-gray-200/50">
                    <Icon name="ph:magnifying-glass-bold" class="w-6 h-6 text-gray-500 mr-3" />
                    <input ref="inputRef" v-model="query" type="text" placeholder="搜索应用、文章..."
                        class="flex-1 bg-transparent border-none outline-none text-xl text-gray-800 placeholder-gray-400"
                        @keydown.esc="close" />
                </div>

                <div v-if="filteredApps.length > 0" class="max-h-[300px] overflow-y-auto p-2 space-y-1">
                    <div class="px-2 py-1 text-xs text-gray-400 font-medium">应用</div>

                    <div v-for="app in filteredApps" :key="app.id"
                        class="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white group transition-colors"
                        @click="handleAppClick(app)">
                        <div class="w-6 h-6 mr-3 flex items-center justify-center">
                            <img v-if="app.icon.includes('/')" :src="app.icon" class="w-full h-full object-contain" />
                            <Icon v-else :name="app.icon" class="w-5 h-5 text-gray-600 group-hover:text-white" />
                        </div>
                        <span class="text-sm font-medium">{{ app.name }}</span>
                    </div>
                </div>

                <div v-else-if="query" class="p-8 text-center text-gray-400">
                    没有找到相关结果
                </div>

                <div v-else
                    class="px-4 py-2 bg-gray-50/50 text-xs text-gray-400 flex justify-between border-t border-gray-100">
                    <span>输入关键词进行搜索</span>
                    <div class="flex gap-2">
                        <span class="bg-gray-200 px-1.5 rounded">ESC</span> 关闭
                    </div>
                </div>

            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useSpotlight } from '~/composables/useSpotlight'
import { dockApps as systemApps } from '~/config/apps' // 引入你的应用配置

const { isOpen, close } = useSpotlight()
const router = useRouter()

const query = ref('')
const inputRef = ref(null)

// 自动聚焦
watch(isOpen, async (val) => {
    if (val) {
        query.value = ''
        await nextTick()
        inputRef.value?.focus()
    }
})

// 搜索逻辑：目前先只搜本地应用
const filteredApps = computed(() => {
    if (!query.value) return []
    const lowerQuery = query.value.toLowerCase()
    return systemApps.filter(app =>
        app.name.toLowerCase().includes(lowerQuery)
    )
})

const handleAppClick = (app) => {
    if (app.isExternal) {
        window.open(app.path, '_blank')
    } else {
        router.push(app.path)
    }
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