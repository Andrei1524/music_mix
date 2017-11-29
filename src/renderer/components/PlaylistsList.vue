<template>
  <div class="playlist">
    <div class="playlist-wrapper" v-for="playlist in playlists" v-bind:key="playlist.name">
      <h3>{{ playlist.name }}</h3>
      <div class="playlist-body" :style="'background-color:url('+''+')'">
        <div class="playlist-body-overlay">
            <router-link :to="'playlist/' + playlist.name" class="playlist-body-play">
              <span><i class="fa fa-play" aria-hidden="true"></i></span>
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datastore from 'nedb'


import Playlist from '../components/Playlist.vue'
import storage from 'electron-json-storage'
export default {
  data () {
    return {
      playlists: undefined
    }
  },
  created () {
    storage.get('playlists', (err, playlists) => {
      this.playlists = playlists
      console.log(playlists)
    })
     //storage.clear('playlists')
  }
}
</script>

<style scoped>

.playlist {
    display: block;
    height: 330px;
    margin: 10px;
    text-align: center;
    overflow: auto;
}

.playlist h3 {
  color: #FFF;
  font-weight: 200;
    margin-bottom: 5px;
    font-size: 14px;
    text-align: center;
}

.playlist-wrapper {
  display: inline-block;
     border: 1px solid rgb(10, 13, 17);
    padding: 5px;
    margin: 5px;
    box-sizing: border-box;
}

/* .playlist-wrapper:hover {
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.73);
} */

.playlist-body {
  display: flex;
  /* align-items: center;
  justify-content: center; */
  height: 120px;
  width: 120px;
  background-image: url('https://i1.sndcdn.com/artworks-000193112059-ejqmdr-t500x500.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  transition: 0.5s;
}

.playlist-body-overlay {
  display: flex;
  opacity: 0;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: rgba(10, 13, 17, 0.75);
  transition: 0.2s;
  box-shadow: inset 0 0 20px 0px rgba(0, 0, 0, 0.32);

}
.playlist-body-overlay a {
  text-decoration: none;
}
.playlist-body-play {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    background: transparent;
    /* border: 2px solid rgba(255, 255, 255, 0.77); */
    border-radius: 50%;
    /* box-sizing: border-box; */
    box-shadow: 0 0 0 2px white;
    cursor: pointer;
    transition: 0.5s;
}

.playlist-body-play:hover {
  transform: scale(1.1);
}

.playlist-body-play span {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
}

.playlist-body-play span i {
  font-size: 1.6em;
}

/* on hover show the play button */
.playlist-body:hover > .playlist-body-overlay {
  opacity: 1;
}

</style>
