import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
// 首页： 推荐页面
import Recommend from './components/recommend/recommend'
// 登录页面
import Login from './components/login/login'
// 注册页面
import Register from './components/register/register'
// 发布文章页面
import Publish from './components/publish/publish'
// 文章详情页面
import Article from './components/article/article'
// 
import Tools from './components/tools/tools'
// 学习资源页面
import DataList from './components/data-list/data-list'
// 发布学习资源页面
import PublishData from './components/publish-data/publish-data'
// 搜索学习资源结果页面
import SearchInfo from './components/search-info/search-info'
import Copy from './components/register/copy'
// 个人信息：个人主页&&个人中心
import UserHome from './components/user-info/user-home'
import UserCenter from './components/user-info/user-center'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Recommend
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/publish',
    component: Publish
  },
  {
    path: '/article/:id',
    component: Article
  },
  {
    path: '/datalist',
    component: DataList
  },
  {
    path: '/publishdata',
    component: PublishData
  },
  {
    path: '/searchInfo',
    component: SearchInfo
  },
  {
    path: '/user-home',
    component: UserHome
  },
  {
    path: '/user-center',
    component: UserCenter
  },
  {
    path: '/copy',
    component: Copy
  },
]

const router = new Router({
  routes
})

export default router;
