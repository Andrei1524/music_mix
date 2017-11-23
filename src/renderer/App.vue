<template>
  <div id="app">
    <app-tobBar></app-tobBar>
    <router-view></router-view>
    <app-player></app-player>
  </div>
</template>

<script>
  import TopBar from './components/layout/TopBar.vue'
  import Player from './components/Player.vue'
  export default {
    name: 'music_mix',
    components: {
      'app-tobBar': TopBar,
      'app-player': Player
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald:300,400,500');
@import "~normalize.css/normalize.css";

body {
  font-family: 'Oswald', sans-serif;
  background-color: #141A21;
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

</style>
