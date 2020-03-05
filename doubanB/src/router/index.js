import Vue from 'vue'
import Router from 'vue-router'
import Movie from '@/components/Movie'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
