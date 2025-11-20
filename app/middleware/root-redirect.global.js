// 全局路由中间件
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/article/list") {
    return navigateTo("/article/list/1");
  } else if (to.path === "/article") {
    return navigateTo("/article/list/1");
  }
});
