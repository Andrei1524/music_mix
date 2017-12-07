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
          <span v-on:hover="song_more_show = true"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></span>
          <div class="options-dropdown">
              <span @click="removeSongFromPlaylist(song)">remove from playlist</span>
          </div>
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
      playlistToUpdate: [],
      song_more_show: false
    }
  },
  methods: {
    playSong (song) {
      this.$store.dispatch('updateYoutubeCurrentPlayingSongId', song.info.id)
      bus.$emit('clickedOnASong', song.info)
      this.$store.dispatch('updateCurrentPlaylistArray', this.playlistToUpdate)
    },
    removeSongFromPlaylist (song) {
      let currentPlaylist
      let getThePlaylists = new Promise(resolve => {
        storage.get('playlists', (err, playlists) => {
          playlists.forEach(playlist_array => {
            if (this.playlist.name === playlist_array.name) {
              resolve(playlist_array)
            }
          })
        })
      })
      
      getThePlaylists.then(playlist_array => {
          let newPlaylist = new Promise(resolve => {
            let filteredPlaylistArray = playlist_array.songs.filter(song_from_playlist_array => {
              return song_from_playlist_array.title !== song.title
            })

            resolve(filteredPlaylistArray)
          })

          newPlaylist.then(filteredPlaylistArray => {
            let newStorage = new Promise(resolve => {
                storage.get('playlists', (err, playlists) => {
                playlists.forEach(playlist_array => {
                  if (this.playlist.name === playlist_array.name) {
                    playlist_array.songs = filteredPlaylistArray
                    resolve(playlists)
                  }
                })
              })
            })

            newStorage.then(playlists => {
              storage.set('playlists', playlists)
            })
          })
      })
      
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
  /* margin-bottom: 15px; */
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
  position: relative;
}

.playlist-right span {
  color: #FFF;
  cursor: pointer;
}
.playlist-right span i {
  font-size: 1.2em;
}

.options-dropdown {
    position: absolute;
    left: -74px;
    display: none;
    align-items: center;
    justify-content: center;
    /* text-align: center; */
    width: 100px;
    padding: 5px 0;
    background: #141a21;
    height: 100%;
}

.options-dropdown span {
    display: block;
    color: #FFF;
    font-weight: 200;
    font-size: 13px;
     padding: 5px;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
}
.options-dropdown span:hover {
    background-color: #2a3c52;
}

.playlist-right:hover .options-dropdown {
    display: flex;
}
</style>
