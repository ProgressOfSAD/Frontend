import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Index from '../components/Index'
import UserShelf from '../components/UserShelf'
import UserMessage from '../components/UserMessage'
import UserComment from '../components/UserComment'
import UserSetting from '../components/UserSetting'
import Detail from '../components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
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
      component: UserShelf
    },
    {
      path: '/user/message',
      name: 'UserMessage',
      component: UserMessage
    },
    {
      path: '/user/comment',
      name: 'UserComment',
      component: UserComment
    },
    {
      path: '/user/setting',
      name: 'UserSetting',
      component: UserSetting
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
