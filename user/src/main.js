// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Vuex from './store'

Vue.config.productionTip = false

// Vue.use(VueRouter)
Vue.use(iView)
// Vue.use(Router)

// const RouterConfig = {
//   routes: routers,
//   modes: 'history'
// }
// const router = new Router(RouterConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: Vuex,
  components: { App },
  template: '<App/>'
})
