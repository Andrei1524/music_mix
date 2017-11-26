import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'


import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

export const bus = new Vue()

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
