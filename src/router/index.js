import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/home/info',
    name: 'info',
    component: () => import('@/views/home/info.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: '/material/',
  routes
})

export default router
