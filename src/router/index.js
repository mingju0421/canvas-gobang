import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login'
import Game from '../components/game'
import Home from '../components/home'

 Vue.use(Router)

 let router = new Router({
   routes: [
    {
      path: '/',
      component: Home
    },{
      path: '/login',
      component: Login
    },{
      path: '/game',
      component: Game
    }
   ],
 })

 router.beforeEach((to, from, next) => {
   if (to.path === '/login') {
     next();
   }else {
     let token = localStorage.getItem('token')
     console.log(token)
     if (token === null || token === '') {
       next('/login');
     }else {
       next();
     }
   }
  next()
})

export default router
 