// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSessionStorage from 'vue-sessionstorage'

Vue.use(VueSessionStorage)

Vue.prototype.$backendUrl = process.env.BACKENDURL || 'http://localhost:3000/notes'
Vue.prototype.$backendStatusUrl = process.env.BACKENDSTATUS || 'http://localhost:3000/status'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
