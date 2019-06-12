import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from 'axios'
// 引入 echarts
import echarts from 'echarts'


Vue.config.productionTip = false
// 使用 ElementUI
Vue.use(ElementUI, echarts)
// 将sxios绑定到vue上
Vue.prototype.$http = axios
//一般都要加个$加到vue的原型链上，方便引用
Vue.prototype.$echarts = echarts 


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
