import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist-uni'

export function createApp() {
  const app = createSSRApp(App)
	const pinia = createPinia()
	pinia.use(piniaPersist) // 持久化存储
	app.use(pinia)
  return {
    app,
		pinia
  }
}
// #endif