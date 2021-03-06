// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import {ToastPlugin} from 'vux'
Vue.use(ToastPlugin)

import routes from './routes'
import store from './store'

import 'normalize.css/normalize.css'
import 'animate.css/animate.css'

const router = new VueRouter({
  routes
})

router.beforeEach(({meta, path}, from, next) => {
  console.log(store.state.user)
  var {auth = true} = meta
  var isLogin = Boolean(store.state.user.access_token) // true用户已登录， false用户未登录

  if (auth && !isLogin && (path !== '/login' && path !== '/register')) {
    return next({path: '/login'})
  }
  next()
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store: store,
  router: router
}).$mount('#app-box')
