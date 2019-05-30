import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
import Recommend from './components/recommend/recommend'
import Login from './components/login/login'
import Register from './components/register/register'
import Publish from './components/publish/publish'
import Article from './components/article/article'
import Tools from './components/tools/tools'
import LearnData from './components/learn-data/learn-data'
import DataList from './components/data-list/data-list'
import PublishData from './components/publish-data/publish-data'
import Copy from './components/register/copy'

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
    path: '/learndata',
    component: LearnData
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
