<template>
  <div class="playlist" v-if="playlist">
      <div v-for="song in playlist.songs" v-bind:key="song.id" class="playlist-song">
        <div class="playlist-left">
          <span @click="playSong(song)" class="playlist-left-play"><i class="fa fa-play" aria-hidden="true"></i></span>
        </div>

        <div class="playlist-middle">
          <div class="playlist-middle-title" @click="playSong(song)"><h4>{{ song.title }}</h4></div>
          <div class="playlist-middle-channel"><p>{{ song.info.channelTitle }}</p></div>
        </div>

        <div class="playlist-right">
          <span><i class="fa fa-ellipsis-h" aria-hidden="true"></i></span>
        </div>
      </div>
  </div>
</template>

<script>
import storage from 'electron-json-storage'
import { bus } from '../main'
export default {
  data () {
    return {
      playlist: undefined,
      playlistToUpdate: []
    }
  },
  methods: {
    playSong (song) {
      this.$store.dispatch('updateYoutubeCurrentPlayingSongId', song.info.id)
      bus.$emit('clickedOnASong', song.info)
      this.$store.dispatch('updateCurrentPlaylistArray', this.playlistToUpdate)
    }
  },
  created () {
    // enable play from playlists
    this.$store.dispatch('playFromPlaylist', true)
    let playlist_name  = this.$route.params.name
    let playlist_to_update = []
    storage.get('playlists', (err, playlists) => {
      playlists.forEach(playlist => {
        if (playlist.name === playlist_name) {
          this.playlist = playlist

          playlist.songs.forEach(playlist_song => {
            this.playlistToUpdate.push(playlist_song.info)
          })
        }
      })
    })
  }
}
</script>

<style scoped>

.playlist {
  max-height: 330px;
  overflow: auto;
}

::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #0A0D11;
}

::-webkit-scrollbar {
	width: 12px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb {

	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #232e3c;
}


span {
  display: block;
}
.playlist-song {
  display: flex;
  background-color: rgba(10, 13, 17, 0.55);
  padding: 10px 15px;
  margin-bottom: 5px;
  align-items: center;
}

.playlist-left {
  padding-right: 10px;
}

.playlist-left-play {
  color: #FFF;
  cursor: pointer;
}

.playlist-left-play i {
  font-size: 1.2em;
}

.playlist-middle-title {
  cursor: pointer;
}

.playlist-middle-title h4 {
  color: #FFF;
  font-weight: 200;
}

.playlist-middle-channel p {
  margin: 0;
  color: rgba(255, 255, 255, 0.66);
  font-weight: 200;
  font-size: 12px;
}

.playlist-right {
  margin-left: auto;
}

.playlist-right span {
  color: #FFF;
}
.playlist-right span i {
  font-size: 1.2em;
}
</style>
