import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/Landing').default
    },
    {
      path: '/playlist',
      name: 'user-playlists',
      component: require('@/components/Playlist.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
