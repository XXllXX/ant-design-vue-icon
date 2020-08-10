import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//复制到粘贴板插件
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(ant)

// 导入自定义svg图标
import VueIcon from '@ant-design/icons-vue'
import * as cusIcons from './svg/index'
VueIcon.add.apply(
  VueIcon,
  Object.keys(cusIcons).map(function(key) {
    return cusIcons[key]
  })
)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
