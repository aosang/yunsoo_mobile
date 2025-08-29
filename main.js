import App from './App'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist-uni'

export function createApp() {
  try {
    const app = createSSRApp(App)
    const pinia = createPinia()
    
    // 安全地使用 pinia 插件
    try {
      pinia.use(piniaPersist) // 持久化存储
    } catch (error) {
      console.warn('Pinia persist plugin failed to load:', error)
    }
    
    app.use(pinia)
    
    // 全局错误处理
    app.config.errorHandler = (err, vm, info) => {
      console.error('Vue error caught:', {
        error: err,
        component: vm,
        info: info
      })
    }
    
    return {
      app,
      pinia
    }
  } catch (error) {
    console.error('Failed to create app:', error)
    // 返回一个基本的错误处理应用
    const errorApp = createSSRApp({
      template: '<view>应用初始化失败，请刷新页面重试</view>'
    })
    return {
      app: errorApp,
      pinia: null
    }
  }
}