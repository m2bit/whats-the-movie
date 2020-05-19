import Vue from 'vue'
import App from './App.vue'

import './plugins/axios'
import store from './store/store'
import router from './routers'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
