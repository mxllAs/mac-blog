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
    const fetchPageSize = 10; // 抓取时的分页大小 (为了快速获取数据)
    let totalArticles = 0;    // 🟢 新增：记录总文章数

    while (true) {
        try {
            // 请求后端接口
            const response = await $fetch('https://www.xiaohev.com/api/post', {
                query: { page, pageSize: fetchPageSize, status: 1 }
            });

            const posts = response.data?.posts || response.posts || [];

            if (!posts || posts.length === 0) {
                break;
            }

            // 🟢 累计文章总数
            totalArticles += posts.length;

            // 添加【文章详情页】URL
            const postRoutes = posts.map((post) => ({
                loc: `/article/${post.postId}`,
                lastmod: post.updatedAt || post.createdAt,
                changefreq: 'daily',
                priority: 0.9
            }));

            sitemapRoutes.push(...postRoutes);

            if (posts.length < fetchPageSize) {
                break;
            }
            page++;
        } catch (error) {
            console.error('Sitemap dynamic fetch error:', error);
            break;
        }
    }

    // 3. 🟢 新增：添加【文章列表页】分页 URL (/article/list/[page])
    // 规则：前端列表页每页显示 9 条
    const listPageSize = 9;
    // 计算总页数
    const totalListPages = Math.ceil(totalArticles / listPageSize);

    // 即使没有文章，至少也要收录第 1 页
    const finalPages = totalListPages > 0 ? totalListPages : 1;

    for (let i = 1; i <= finalPages; i++) {
        sitemapRoutes.push({
            loc: `/article/list/${i}`,
            changefreq: 'daily', // 列表页经常变动(有新文章时)，建议设为 daily
            priority: 0.8,       // 优先级略低于首页(1.0)和文章详情(0.9)
            lastmod: new Date().toISOString()
        });
    }

    return sitemapRoutes;
});