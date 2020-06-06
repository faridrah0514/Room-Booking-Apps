import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Vuex from '../views/Vuex.vue'
import Status from '../views/Status.vue'
import SearchResult from '../views/SearchResult'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Search
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: Vuex
  },
  {
    path: "/status",
    name: 'Status',
    component: Status
  },
  {
    path: '/searchresult',
    name: 'SearchResult',
    component: SearchResult
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
