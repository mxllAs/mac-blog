import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    // 定义一个名为 'changelog' 的集合
    changelog: defineCollection({
      type: "page",
      source: "changeLog/*.md", // 扫描 content/changeLog 下的所有 md 文件
      schema: z.object({
        title: z.string(),
        date: z.string(),
      }),
    }),
  },
});
