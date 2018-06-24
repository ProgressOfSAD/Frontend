import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Index from '../components/Index'
import UserShelf from '../components/UserShelf'
import UserMessage from '../components/UserMessage'
import UserComment from '../components/UserComment'
import UserSetting from '../components/UserSetting'
import Detail from '../components/Detail'
import Comment from '../components/Comment'
import Search from '../components/Search'
import Edit from '../components/Edit'
import err from '../components/err'

/* eslint-disable */


Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/404',
      name: 'err',
      component: err
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/bookshelf',
      name: 'UserShelf',
      meta: {
        requireAuth: true // 添加该字段，说明进入该路由需要登录
      },
      component: UserShelf
    },
    {
      path: '/user/message',
      name: 'UserMessage',
      meta: {
        requireAuth: true // 添加该字段，说明进入该路由需要登录
      },
      component: UserMessage
    },
    {
      path: '/user/comment',
      name: 'UserComment',
      meta: {
        requireAuth: true // 添加该字段，说明进入该路由需要登录
      },
      component: UserComment
    },
    {
      path: '/user/setting',
      name: 'UserSetting',
      meta: {
        requireAuth: true // 添加该字段，说明进入该路由需要登录
      },
      component: UserSetting
    },
    {
      path: '/detail/:bid',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/edit',
      name: 'Edit',
      meta: {
        requireAuth: true // 添加该字段，说明进入该路由需要登录
      },
      component: Edit
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
router.beforeEach((to, from, next) => {
  // var vm = to.router.app
  // console.log(vm.isLogin)
  // console.log(to.meta.requireAuth)
  // if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
  //     if (isLoin) {  // 通过vuex state获取当前的token是否存在
  //         next();
  //     }
  //     else {
  //         next({
  //             path: '/login',
  //             query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //         })
  //     }
  // }
  // else {
  //     next();
  // }
  next()
})
export default router