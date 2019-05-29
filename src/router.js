import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
import Recommend from './components/recommend/recommend'
import Login from './components/login/login'
import Register from './components/register/register'
import Publish from './components/publish/publish'
import Article from './components/article/article'
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
    path: '/copy',
    component: Copy
  },
]

const router = new Router({
  routes
})

export default router;
