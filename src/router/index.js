import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend.vue'
import TopList from '@/views/TopList'
import HomeView from '@/views/HomeView'
import MyMusic from '@/views/MyMusic'
import PlayList from '@/views/PlayList'
import DJRadio from '@/views/DJRadio'
import Artist from '@/views/Artist'
import Album from '@/views/Album'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: "home",
    component: HomeView,
    children: [
      {
        path: '',
        redirect: 'recommend'
      },
      {
        path: 'recommend',
        name: 'recommend',
        component: Recommend
      },
      {
        path: 'toplist',
        name: 'toplist',
        component: TopList
      },
      {
        path: 'playlist',
        name: 'playlist',
        component: PlayList
      },
      {
        path: 'djradio',
        name: 'djradio',
        component: DJRadio
      },
      {
        path: 'artist',
        name: 'artist',
        component: Artist
      },
      {
        path: 'album',
        name: 'album',
        component: Album
      }
    ]
  },
  {
    path: '/mymusic',
    name: 'mymusic',
    component: MyMusic
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   // ...
//   // 返回 false 以取消导航
//   console.log(to, from)
//   if(to.name == from.name && JSON.stringify(to.params)==JSON.stringify(from.params) && JSON.stringify(to.query)==JSON.stringify(from.query)){
//     return false
//   }
//   next()
// })

export default router
