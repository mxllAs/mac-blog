import RSS from 'rss';

export default defineEventHandler(async (event) => {
    // 1. 初始化 RSS Feed 信息
    // 请把下面的信息替换成你自己的
    const feed = new RSS({
        title: '小贺的博客',
        description: '基于 Nuxt 4 构建的沉浸式 Web OS 风格博客，分享技术与生活。',
        site_url: 'https://www.xiaohev.com',
        feed_url: 'https://www.xiaohev.com/rss.xml',
        image_url: 'https://www.xiaohev.com/favicon.ico',
        language: 'zh-cn',
        pubDate: new Date(),
        copyright: `Copyright © ${new Date().getFullYear()} XiaoHe`,
    });

    try {
        // 2. 请求后端 API 获取最新文章
        // RSS 一般只需要最新的 10-20 篇文章即可，不需要全部爬取
        const response = await $fetch('https://www.xiaohev.com/api/post', {
            query: { page: 1, pageSize: 20, status: 1 }
        });

        // 兼容数据结构
        const posts = response.data?.posts || response.posts || [];

        // 3. 遍历文章，添加到 Feed 中
        posts.forEach((post) => {
            feed.item({
                title: post.title,
                // 如果你有文章摘要字段(excerpt/summary)，用那个更好
                description: post.excerpt || post.title,
                url: `https://www.xiaohev.com/article/${post.postId}`,
                guid: String(post.postId),
                author: 'XiaoHe', // 或者 post.author
                date: new Date(post.createdAt || post.updatedAt),
                // 如果有分类
                categories: post.category ? [post.category.name] : [],
            });
        });

    } catch (error) {
        console.error('RSS generation failed:', error);
        // 出错时虽然不能返回 RSS，但至少不要崩掉整个服务
    }

    // 4. 设置响应头，告诉浏览器这是 XML 文件
    event.node.res.setHeader('Content-Type', 'application/xml');

    // 5. 输出生成的 XML 字符串
    return feed.xml();
});