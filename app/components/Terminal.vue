<template>
  <div 
    class="w-full h-[500px] bg-[#1e1e1e] text-[#4af626]  p-4 text-xs md:text-sm overflow-y-auto cursor-text rounded-b-lg shadow-inner terminal-scroll" 
    @click="focusInput"
  >
    <div class="mb-4 text-gray-400 select-none">
      Last login: {{ loginTime }} on ttys001<br/>
      Welcome to XiaoHeOS v{{ version }}<br/>
      Type <span class="text-white font-bold">'help'</span> to see available commands.
    </div>

    <div v-for="(item, index) in history" :key="index" class="mb-2">
      <div class="flex">
        <span class="text-blue-400 mr-2">➜</span>
        <span class="text-cyan-400 mr-2">~</span>
        <span class="text-white">{{ item.command }}</span>
      </div>
      
      <div 
        v-if="item.output" 
        class="ml-4 mt-1 text-gray-300 leading-snug w-full max-w-full" 
        :class="item.class" 
        v-html="item.output"
      ></div>
    </div>

    <div class="flex items-center">
      <span class="text-blue-400 mr-2">➜</span>
      <span class="text-cyan-400 mr-2">~</span>
      <input 
        ref="inputRef"
        v-model="currentCommand"
        @keydown.enter="executeCommand"
        type="text" 
        class="bg-transparent border-none outline-none text-white flex-1 caret-white  min-w-[50px]"
        autocomplete="off"
        spellcheck="false"
        autofocus
      />
    </div>
  </div>
</template>

<script setup>
import { useWindowStore } from "~/store/window.js"; // 🟢 引入 store
import dayjs from "dayjs";
// Nuxt 会自动导入 composables 中的 useApi，无需手动 import
const windowStore = useWindowStore();
const emit = defineEmits(['close']);
const router = useRouter();
const config = useRuntimeConfig();
const version = config.public.version || '1.0.0';
const loginTime = dayjs().format('ddd MMM DD HH:mm:ss');

const inputRef = ref(null);
const currentCommand = ref('');
const history = ref([]);

// 自动聚焦
const focusInput = () => {
  inputRef.value?.focus();
};

onMounted(() => {
  nextTick(() => focusInput());
});

// 核心：执行命令
const executeCommand = async () => {
  const rawCmd = currentCommand.value.trim();
  if (!rawCmd) return;

  const args = rawCmd.split(/\s+/);
  const cmd = args[0].toLowerCase();
  const arg1 = args[1];

  // 1. 先把空结果推入历史，占个位置
  history.value.push({
    command: rawCmd,
    output: '',
    class: ''
  });
  
  // 🟢 获取刚刚推入的那个响应式对象，稍后更新它
  const activeItem = history.value[history.value.length - 1];

  currentCommand.value = ''; // 清空输入

  let output = '';

  try {
    switch (cmd) {
      case 'help':
        // 使用 pre 标签保持格式，或者直接用 div
        output = `
            <div class="whitespace-pre-wrap">
            <span class="text-yellow-400 font-bold">Available Commands:</span>

            <span class="text-green-400">a</span>           - 查看全部文章 (Table View)
            <span class="text-green-400">open</span> <ID>   - 打开指定文章 (e.g. open 17)
            <span class="text-green-400">ls</span>          - 列出目录
            <span class="text-green-400">clear</span>       - 清屏
            <span class="text-green-400">exit</span>        - 关闭
            </div>
        `;
        break;

      case 'ls':
        output = `<div class="whitespace-pre-wrap">drwxr-xr-x  5 xiaohe  staff   160  Article/
                  drwxr-xr-x  3 xiaohe  staff   96   About/
                  -rw-r--r--  1 xiaohe  staff   4096 README.md</div>`;
        break;

      case 'a':
        // 加载状态
        activeItem.output = '<span class="animate-pulse">Fetching articles...</span>';
        
        // 发起请求
        const res = await useApi('/post', { 
          query: { page: 1, pageSize: 50, status: 1 } // 获取前50条
        });
        
        const posts = res.posts || [];
        
        if (posts.length > 0) {
          // 🟢 构建 HTML 表格
          // overflow-x-auto: 允许水平滚动
          // min-w-[300px]: 保证表格有最小宽度，触发滚动
          let tableHtml = `
            <div class="w-full overflow-x-auto mt-2 mb-2 pb-2">
              <table class="w-full text-left border-collapse min-w-[320px]">
                <thead>
                  <tr class="border-b border-gray-700 text-gray-500 text-xs">
                    <th class="py-2 pr-4 w-12 font-medium">ID</th>
                    <th class="py-2 pr-4 font-medium">文章标题 (Title)</th>
                    <th class="py-2 w-24 font-medium whitespace-nowrap">日期 (Date)</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
          `;

          posts.forEach(post => {
            const date = dayjs(post.createdAt).format('YYYY-MM-DD');
            // 高亮 ID
            const idHtml = `<span class="text-yellow-400 font-bold ">${post.postId}</span>`;
            
            tableHtml += `
              <tr class="border-b border-gray-800/50 hover:bg-white/5 transition-colors group">
                <td class="py-2 pr-4 align-middle">${idHtml}</td>
                <td class="py-2 pr-4 text-gray-300 align-middle group-hover:text-white transition-colors">${post.title}</td>
                <td class="py-2 text-gray-500 text-xs whitespace-nowrap  align-middle">${date}</td>
              </tr>
            `;
          });

          tableHtml += `
                </tbody>
              </table>
            </div>
            <div class="text-gray-500 text-xs mt-1">
              Total: ${posts.length} articles. Type <span class="text-green-400">open &lt;ID&gt;</span> to read.
            </div>
          `;
          
          output = tableHtml;
        } else {
          output = 'No articles found.';
        }
        break;

      case 'open':
      case 'cd':
        if (!arg1) {
          output = `<span class="text-yellow-400">Usage: ${cmd} <article_id></span>`;
        } else {
          output = `Opening article <span class="text-green-400 font-bold">${arg1}</span>...`;
          setTimeout(() => {
            emit('close');
            router.push(`/article/${arg1}`);
          }, 500);
        }
        break;
      
      case 'about':
        output = `<div class="whitespace-pre-wrap">👋 Hi, I'm XiaoHe.
Front-end Developer | Nuxt 4 Enthusiast | macOS Lover</div>`;
        break;

      case 'clear':
        history.value = []; 
        return; 

      case 'exit':
        // emit('close');
        windowStore.close('terminal');
        return;

      default:
        output = `<span class="text-red-500">zsh: command not found: ${cmd}</span>`;
    }
  } catch (err) {
    output = `<span class="text-red-500">Error: ${err.message}</span>`;
  }

  // 更新内容
  activeItem.output = output;

  // 滚动到底部
  nextTick(() => {
    if (inputRef.value?.parentElement?.parentElement) {
      inputRef.value.parentElement.parentElement.scrollTop = inputRef.value.parentElement.parentElement.scrollHeight;
    }
  });
};
</script>

<style scoped>
/* 输入框文字发光效果 */
input {
  text-shadow: 0 0 2px rgba(74, 246, 38, 0.3);
}

/* 滚动条美化 */
.terminal-scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px; /* 横向滚动条高度 */
}
.terminal-scroll::-webkit-scrollbar-track {
  background: #1e1e1e;
}
.terminal-scroll::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}
.terminal-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>