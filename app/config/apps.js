// app/config/apps.js

export const dockApps = [
    {
        id: 'finder',
        name: '首页',
        // 使用自定义 SVG (假设你已经放到了 public/icons/finder.svg)
        icon: '/icons/finder-icon.svg',
        path: '/',
        // 保留你喜欢的渐变背景
        dockColor: 'bg-gradient-to-br from-blue-400 to-blue-600'
    },
    {
        id: 'article',
        name: '文章列表',
        // 也可以混用 Iconify 图标 (如果没有现成的 SVG)
        icon: '/icons/article-list-icon.svg',
        path: '/article/list/1',
        dockColor: 'bg-gradient-to-br from-green-400 to-emerald-600'
    },
    {
        id: 'changelog',
        name: '更新日志',
        icon: '/icons/log.svg', // 你的自定义图标
        path: '/changeLog',
        dockColor: 'bg-gradient-to-br from-orange-400 to-pink-500'
    },
    {
        id: 'about',
        name: '关于我',
        icon: '/icons/about.svg', // 你的自定义图标
        path: '/about',
        dockColor: 'bg-gradient-to-br from-purple-400 to-purple-600'
    },

];