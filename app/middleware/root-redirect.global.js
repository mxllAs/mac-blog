// 全局路由中间件
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/article/list") {
    return navigateTo("/article/list/1");
  }
});
