import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//复制到粘贴板插件
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

import { Icon, Radio, BackTop } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Icon)
Vue.use(Radio)
Vue.use(BackTop)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
