import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
// import Matches from '@/components/Matches'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
