<template>
  <MacWindow @close="closeWindow" scrollbarColor="rgba(0, 0, 0, 0.25) rgba(255, 255, 255, 0.8)">
    <div class="p-6 sm:p-8 text-gray-800 bg-white/80  min-h-full">
      <!-- 个人头像区域 -->
      <div class="flex flex-col items-center mb-8 rounded-lg py-6">
        <div class="relative mb-4">
          <div class="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
            <div class="bg-white rounded-full w-full h-full flex items-center justify-center">
              <span class="text-3xl font-bold text-gray-700">{{
                baseInfo.name?.charAt(0) || "A"
              }}</span>
            </div>
          </div>
          <div class="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div v-if="baseInfo" class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            你好我是 "{{ baseInfo.name }}"
          </h1>
          <p class="text-gray-500 text-lg">
            我热爱 "{{ baseInfo.hobby }}"
          </p>
        </div>
      </div>

      <!-- 个人信息卡片 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 mb-8 border border-gray-200/50">
        <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          基本信息
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center p-3 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <div class="text-xs text-gray-500">年龄</div>
              <div class="font-medium text-gray-800">{{ age }} 岁</div>
            </div>
          </div>

          <div class="flex items-center p-3 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <div class="text-xs text-gray-500">性别</div>
              <div class="font-medium text-gray-800">
                {{ baseInfo.gender || "未填写" }}
              </div>
            </div>
          </div>

          <div class="flex items-center p-3 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                </path>
              </svg>
            </div>
            <div>
              <div class="text-xs text-gray-500">微信</div>
              <div class="font-medium text-gray-800">
                {{ baseInfo.weixin || "未填写" }}
              </div>
            </div>
          </div>

          <div class="flex items-center p-3 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
                </path>
              </svg>
            </div>
            <div>
              <div class="text-xs text-gray-500">QQ</div>
              <div class="font-medium text-gray-800">
                {{ baseInfo.koukou || "未填写" }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 详细介绍 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-200/50">
        <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z">
            </path>
          </svg>
          详细介绍
        </h2>
        <div class="prose prose-lg max-w-none" v-html="content"></div>
      </div>
    </div>
  </MacWindow>
</template>

<script setup>
import MacWindow from "~/components/MacWindow.vue";
import { computed, ref } from "vue";

const config = useRuntimeConfig();
const router = useRouter();

const closeWindow = () => {
  router.push("/");
};
const { data } = await useAsyncData("about", () =>
  $fetch(config.public.apiBase + "/about")
);

const baseInfo = ref({
  name: '',
  // 兼容后端：该字段目前在项目中用于存储出生日期字符串（用于计算年龄）
  age: '',
  // 额外默认字段，防止页面渲染时出现 undefined
  hobby: '',
  gender: '',
  weixin: '',
  koukou: '',
});
const content = ref("");

if (data.value && data.value.code === 200) {
  baseInfo.value = data.value.data.baseInfo;
  content.value = data.value.data.content;
}

const age = computed(() => {
  if (!baseInfo.value || !baseInfo.value.age) return "";
  const birthDate = new Date(baseInfo.value.age);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});
</script>

<style scoped>
/* 渐变背景动画 */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientBG 10s ease infinite;
}

/* 卡片悬停效果 */
.rounded-xl {
  transition: all 0.3s ease;
}

.rounded-xl:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* 信息项悬停效果 */
/* .p-3:hover {
  background-color: #f9fafb;
  transform: translateX(5px);
  transition: all 0.2s ease;
} */

/* 头像动画 */
.w-24 {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.4);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(96, 165, 250, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(96, 165, 250, 0);
  }
}

/* 在线状态动画 */
.absolute.bottom-0.right-0.w-6.h-6 {
  animation: onlinePulse 1.5s infinite;
}

@keyframes onlinePulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 7px rgba(72, 187, 120, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(72, 187, 120, 0);
  }
}

/* 标题动画 */
.text-xl.font-semibold {
  position: relative;
  padding-left: 20px;
}

.text-xl.font-semibold:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  border-radius: 2px;
  background: linear-gradient(to bottom, #60a5fa, #3b82f6);
}

/* 内容区域样式优化 */
.prose :where(h2):not(:where([class~="not-prose"] *)) {
  color: #1f2937;
  font-weight: 700;
  margin-bottom: 1em;
  margin-top: 1.5em;
  padding-bottom: 0.3em;
}

.prose :where(h3):not(:where([class~="not-prose"] *)) {
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.75em;
  margin-top: 1.5em;
}

.prose :where(p):not(:where([class~="not-prose"] *)) {
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 1em;
}

.prose :where(a):not(:where([class~="not-prose"] *)) {
  color: #3b82f6;
  text-decoration: none;
  border-bottom: 1px dashed #93c5fd;
  transition: all 0.2s ease;
}

.prose :where(a):not(:where([class~="not-prose"])):hover {
  color: #1d4ed8;
  border-bottom: 1px solid #3b82f6;
}

.prose :where(ul):not(:where([class~="not-prose"] *)) {
  list-style-type: none;
  padding-left: 1em;
}

.prose :where(ul):not(:where([class~="not-prose"] *)) li {
  position: relative;
  padding-left: 1.5em;
  margin-bottom: 0.5em;
}

.prose :where(ul):not(:where([class~="not-prose"] *)) li:before {
  content: "•";
  color: #60a5fa;
  position: absolute;
  left: 0;
  font-size: 1.2em;
  line-height: 1;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .p-6 {
    padding: 1rem;
  }

  .text-3xl {
    font-size: 1.875rem;
  }

  .grid.grid-cols-1.md\:grid-cols-2.gap-4>div {
    margin-bottom: 0.5rem;
  }
}
</style>
