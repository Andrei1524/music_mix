<template>
  <div id="app">
    <app-tobBar></app-tobBar>
    <app-search></app-search>
    <app-player-menu></app-player-menu>
    <app-addToPlaylist v-if="openAddToPlaylistMenu"></app-addToPlaylist>
    <router-view></router-view>
    <app-player></app-player>
  </div>
</template>

<script>
  import { bus } from './main'
  import storage from 'electron-json-storage'
  import TopBar from './components/layout/TopBar.vue'
  import Search from './components/Search.vue'
  import PlayerMenu from './components/PlayerMenu.vue'
  import Player from './components/Player.vue'
  import AddToPlaylist from './components/AddToPlaylist.vue'
  
  export default {
    name: 'music_mix',
    data () {
      return {
      }
    },
    computed: {
      openAddToPlaylistMenu () {
        if (this.$store.state.addToPlaylistMenu) {
          return true
        }
      }
    },
    created () {
      storage.has('playlists', (err, playlists) => {
        if (err) throw err
        if (playlists) {
          // do nothing
        } else {
          storage.set('playlists', [])
        }
      })
    },
    components: {
      'app-tobBar': TopBar,
      'app-search': Search,
      'app-player-menu': PlayerMenu,
      'app-player': Player,
      'app-addToPlaylist': AddToPlaylist
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald:200,300,400,500');
@import "~normalize.css/normalize.css";

body {
  font-family: 'Oswald', sans-serif;
  background-color: #141A21;
  margin: 0;
}

#app {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

</style>
