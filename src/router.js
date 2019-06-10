import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routes = [
  {
    // 首页： 推荐页面
    path: '/',
    name: 'Recommend',
    component: resolve => require(['./components/recommend/recommend'], resolve)
  },
  {
    // 登录页面
    path: '/login',
    name: 'Login',
    component: resolve => require(['./components/login/login'], resolve)
  },
  {
    // 注册页面
    path: '/register',
    name: 'Register',
    component: resolve => require(['./components/register/register'], resolve)
  },
  {
    // 发布文章页面
    path: '/publish',
    name: 'Publish',
    component: resolve => require(['./components/publish/publish'], resolve)
  },
  {
    // 文章详情页面
    path: '/article/:id',
    name: 'Article',
    component: resolve => require(['./components/article/article'], resolve)
  },
  {
    // 学习资源页面
    path: '/datalist',
    name: 'DataList',
    component: resolve => require(['./components/data-list/data-list'], resolve)
  },
  {
    // 发布学习资源页面
    path: '/publishdata',
    name: 'PublishData',
    component: resolve => require(['./components/publish-data/publish-data'], resolve)
  },
  {
    // 搜索学习资源结果页面
    path: '/searchInfo',
    name: 'SearchInfo',
    component: resolve => require(['./components/search-info/search-info'], resolve)
  },
  {
    // 个人信息：个人主页
    path: '/user-home',
    name: 'UserHome',
    component: resolve => require(['./components/user-info/user-home'], resolve)
  },
  {
    // 个人信息：个人中心
    path: '/user-center',
    name: 'UserCenter',
    component: resolve => require(['./components/user-info/user-center'], resolve)
  },
  {
    // 测试页面
    path: '/copy',
    name: 'Copy',
    component: resolve => require(['./components/register/copy'], resolve)
  },
]

const router = new Router({
  routes
})

export default router;
