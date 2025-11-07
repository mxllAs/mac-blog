
/**
 * @description 封装的通用请求函数
 * @param {string} url - 请求的URL (相对路径)
 * @param {object} options - $fetch的配置项，例如 method, body, params等
 * @returns {Promise} - 返回$fetch的Promise
 */
export const useApi = async (url, options = {}) => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const defaultHeaders = {
    // 可以添加认证Token等
  };

  try {
    const response = await $fetch(url, {
      baseURL: apiBase,
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (response.code === 200) {
      return response.data;
    } else {
      // 主动抛出业务错误，以便useAsyncData的error可以捕获
      throw new Error(response.message || '服务器返回错误');
    }
  } catch (err) {
    // 处理网络错误或上面抛出的业务错误
    // 可以根据err.statusCode进行更细致的错误处理
    console.error(`API请求失败: ${err.message}`);
    throw err; // 重新抛出错误，让useAsyncData的error属性可以接收到
  }
};
