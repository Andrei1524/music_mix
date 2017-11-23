<template>
  <div id="app">
    <app-tobBar></app-tobBar>
    <app-search></app-search>
    <app-player-menu></app-player-menu>
    <router-view></router-view>
    <app-player></app-player>
  </div>
</template>

<script>
  import { bus } from './main'
  import TopBar from './components/layout/TopBar.vue'
  import Search from './components/Search.vue'
  import PlayerMenu from './components/PlayerMenu.vue'
  import Player from './components/Player.vue'
  export default {
    name: 'music_mix',
    data () {
      return {
      }
    },
    computed: {
    },
    created () {
    },
    components: {
      'app-tobBar': TopBar,
      'app-search': Search,
      'app-player-menu': PlayerMenu,
      'app-player': Player
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
