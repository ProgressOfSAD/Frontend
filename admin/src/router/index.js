import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    // 权限页面
                    path: '/additem',
                    component: resolve => require(['../components/page/Additem.vue'], resolve),
                    meta: { title: '增加书目' }
                },
                {
                    // 权限页面
                    path: '/edititem',
                    component: resolve => require(['../components/page/Edititem.vue'], resolve),
                    meta: { title: '修改书目信息' }
                },
                {
                    // 权限页面
                    path: '/addborrow',
                    component: resolve => require(['../components/page/AddBorrow.vue'], resolve),
                    meta: { title: '新增借阅' }
                },
                {
                    // 权限页面
                    path: '/reservedborrow',
                    component: resolve => require(['../components/page/ReservedBorrow.vue'], resolve),
                    meta: { title: '处理预约请求' }
                },
                {
                    // 权限页面
                    path: '/return',
                    component: resolve => require(['../components/page/Return.vue'], resolve),
                    meta: { title: '书籍归还' }
                },
                {
                    // 权限页面
                    path: '/addtype',
                    component: resolve => require(['../components/page/AddType.vue'], resolve),
                    meta: { title: '增加类型' }
                },
                {
                    // 权限页面
                    path: '/edittype',
                    component: resolve => require(['../components/page/EditType.vue'], resolve),
                    meta: { title: '修改类型' }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
