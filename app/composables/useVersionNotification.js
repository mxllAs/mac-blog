/**
 * 版本更新通知管理
 * 用于管理博客版本更新提示的显示逻辑
 */

// 全局状态：用于跨组件同步红点显示
const notificationState = ref({
    shouldShow: false,
    currentVersion: ''
})

export const useVersionNotification = () => {
    const STORAGE_KEY = 'blog_version_notification'

    /**
     * 获取通知配置
     * @returns {Object} { enabled: boolean, lastViewedVersion: string }
     */
    const getNotificationConfig = () => {
        if (process.client) {
            try {
                const stored = localStorage.getItem(STORAGE_KEY)
                if (stored) {
                    return JSON.parse(stored)
                }
            } catch (error) {
                console.error('读取版本通知配置失败:', error)
            }
        }

        // 默认配置：首次访问，启用通知
        return {
            enabled: true,
            lastViewedVersion: ''
        }
    }

    /**
     * 保存通知配置
     * @param {Object} config - { enabled: boolean, lastViewedVersion: string }
     */
    const saveNotificationConfig = (config) => {
        if (process.client) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
                // 保存后重新检查状态
                checkAndUpdateState()
            } catch (error) {
                console.error('保存版本通知配置失败:', error)
            }
        }
    }

    /**
     * 更新上次查看的版本
     * @param {string} version - 版本号
     */
    const updateViewedVersion = (version) => {
        const config = getNotificationConfig()
        config.lastViewedVersion = version
        saveNotificationConfig(config)
    }

    /**
     * 切换通知开关
     * @param {boolean} enabled - 是否启用
     */
    const toggleNotification = (enabled) => {
        const config = getNotificationConfig()
        config.enabled = enabled
        saveNotificationConfig(config)
    }

    /**
     * 检查是否应该显示红点
     * @param {string} currentVersion - 当前最新版本
     * @returns {boolean} 是否显示红点
     */
    const shouldShowNotification = (currentVersion) => {
        const config = getNotificationConfig()

        // 如果用户关闭了通知功能，不显示
        if (!config.enabled) {
            return false
        }

        // 如果没有版本号，不显示
        if (!currentVersion) {
            return false
        }

        // 首次访问（没有记录）或版本不一致，显示红点
        return !config.lastViewedVersion || config.lastViewedVersion !== currentVersion
    }

    /**
     * 检查并更新全局状态
     */
    const checkAndUpdateState = () => {
        if (notificationState.value.currentVersion) {
            notificationState.value.shouldShow = shouldShowNotification(notificationState.value.currentVersion)
        }
    }

    /**
     * 设置当前版本并更新状态
     * @param {string} version - 当前版本号
     */
    const setCurrentVersion = (version) => {
        notificationState.value.currentVersion = version
        notificationState.value.shouldShow = shouldShowNotification(version)
    }

    /**
     * 获取通知开关状态
     * @returns {boolean} 是否启用通知
     */
    const isNotificationEnabled = () => {
        const config = getNotificationConfig()
        return config.enabled
    }

    return {
        // 响应式状态
        notificationState: readonly(notificationState),
        // 方法
        getNotificationConfig,
        saveNotificationConfig,
        updateViewedVersion,
        toggleNotification,
        shouldShowNotification,
        isNotificationEnabled,
        setCurrentVersion,
        checkAndUpdateState
    }
}
