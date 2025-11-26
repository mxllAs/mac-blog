// server/api/sitemap-urls.js
export default defineEventHandler(async () => {
    // 1. 定义静态路由
    const sitemapRoutes = [
        { loc: '/', changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() },
        { loc: '/about', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
        { loc: '/changeLog', changefreq: 'weekly', priority: 0.7, lastmod: new Date().toISOString() },
    ];

    // 2. 动态抓取文章路由
    let page = 1;
    const pageSize = 10;

    while (true) {
        try {
            // 使用 $fetch 请求你的后端接口
            // 纯 JS 中不需要 <any> 泛型
            const response = await $fetch('https://www.xiaohev.com/api/post', {
                query: { page, pageSize, status: 1 }
            });

            // 兼容数据结构 (根据你之前的调试，数据可能在 data.posts 或直接在 posts)
            const posts = response.data?.posts || response.posts || [];

            // 如果没有数据了，停止循环
            if (!posts || posts.length === 0) {
                break;
            }

            // 转换格式
            // 去掉了 (post: any) 中的类型注解
            const postRoutes = posts.map((post) => ({
                loc: `/article/${post.postId}`,
                lastmod: post.updatedAt || post.createdAt,
                changefreq: 'daily',
                priority: 0.9
            }));

            sitemapRoutes.push(...postRoutes);

            // 如果返回的数据少于一页，说明是最后一页了，停止循环
            if (posts.length < pageSize) {
                break;
            }

            // 下一页
            page++;
        } catch (error) {
            console.error('Sitemap dynamic fetch error:', error);
            // 出错时跳出循环，防止死循环导致构建卡死
            break;
        }
    }

    return sitemapRoutes;
});