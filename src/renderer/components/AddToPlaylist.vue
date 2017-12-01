<template>
  <div class="add-to-playlist-menu">
      <div class="new-playlist">
          <h3 @click="PlaylistAddOptions = true">new playlist</h3>
          <span class="close-add-to-playlist-menu" @click="closeAddToPlaylistMenu"><i class="fa fa-times" aria-hidden="true"></i></span>
      </div>

      <div class="new-playlist-add" v-if="PlaylistAddOptions">
          <div class="new-playlist-add-name">
              <input type="text" v-model="PlaylistName">
          </div>
          <div class="new-playlist-add-options">
              <button @click="PlaylistAddOptions = false">cancel</button>
              <button @click="createNewPlaylist">create</button>
          </div>
      </div>

      <div class="new-playlist-list-current-playlists">
          <div class="playlist">
            <div class="playlist-wrapper" v-for="playlist in playlists" v-bind:key="playlist.name">
            <h3>{{ playlist.name }}</h3>
            <div class="playlist-body" @click="addSongToSelectedPlaylist(playlist)">
                <div class="playlist-body-overlay">
                    <span class="playlist-body-play">
                    <span><i class="fa fa-plus" aria-hidden="true"></i></span>
                    </span>
                </div>
            </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Datastore from 'nedb'
import { bus } from '../main'
import storage from 'electron-json-storage'
export default {
    data () {
        return {
            songInfo: undefined,
            selectedPlaylistName: "",
            playlists: [],
            PlaylistAddOptions: false,
            PlaylistName: ""
        }
    },
    methods: {
        createNewPlaylist () {
            let playlist_config = {
                    name: this.PlaylistName,
                    songs: []
            }

            storage.get('playlists', (err, playlists) => {
                let current_playlist = playlists

                current_playlist.push(playlist_config)
                storage.set('playlists', current_playlist)
            })
             this.playlists.push(playlist_config)
            bus.$emit('createdPlaylist')
            this.PlaylistAddOptions = false
        },
        addSongToSelectedPlaylist (playlist) {
            storage.get('playlists', (err, playlists) => {
                // song config
                let song_to_add = {
                    title: this.songInfo.title,
                    info: this.songInfo
                }

                let isSongAlreadyInThePlaylist = false
                // check if song is already in the playlist
                playlists.forEach(playlistArray => {
                    if (playlistArray.name === playlist.name) {
                        playlistArray.songs.forEach(song => {
                            if (song.info.id === song_to_add.info.id) {
                                isSongAlreadyInThePlaylist = true
                            }
                        })
                    }
                })
                //
               if (!isSongAlreadyInThePlaylist) {
                   playlists.forEach(playlistArray => {
                       if (playlistArray.name === playlist.name) {
                           playlistArray.songs.push(song_to_add)
                           storage.set('playlists', playlists)
                            // close the playlist menu
                            this.$store.dispatch('AddToPlaylistMenu', false)
                       }
                   })
               }
            })
        },
        getPlaylists () {
            storage.get('playlists', (err, playlists) => {
                this.playlists = playlists
            })
        },
        closeAddToPlaylistMenu () {
            this.$store.dispatch('AddToPlaylistMenu', false)
        }
    },
    created () {
        if (this.$store.state.selectedSongToAddToPlaylist) {
            this.songInfo = this.$store.state.selectedSongToAddToPlaylist
        }

        this.getPlaylists()

        bus.$on('createdPlaylist', () => {
            this.$forceUpdate()
        })
        
    }
}
</script>

<style scoped>
.add-to-playlist-menu {
    position: fixed;
    background: rgba(10, 13, 17, 0.92);
    height: 100%;
    width: 100%;
    z-index: 900;
}

.new-playlist {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    position: relative;
}

.new-playlist h3 {
    color: #FFF;
    font-weight: 300;
    text-transform: uppercase;
    background: #2a3c52;
    padding: 5px;
    font-size: 16px;
    cursor: pointer;
}

.new-playlist-add {
    position: relative;
    display: flex;
    flex-direction: column;
    background: #2a3c52;
    justify-content: center;
    position: relative;
    margin-top: 5px;
    padding: 10px;
    width: 200px;
    left: 50%;
    transform: translateX(-50%);
}

.new-playlist-add-name {
    display: flex;
    justify-content: center;
}

.new-playlist-add-name input {
    border: none;
    background: #0a0d11;
    color: #FFF;
    font-size: 15px;
    padding: 6px 5px;
    text-align: center;
}

.new-playlist-add-options {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    justify-content: space-between;
}

.new-playlist-add-options button {
    border: none;
    background: #0a0d11;
    color: #FFF;
    font-weight: 300;
    font-size: 16px;
    padding: 5px;
    cursor: pointer;
}

.new-playlist-add-options button:nth-child(1) {
    width: 50%;
    margin-right: 0.5px;
}

.new-playlist-add-options button:nth-child(2) {
    width: 50%;
    margin-left: 0.5px;
}

.close-add-to-playlist-menu {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #FFF;
    cursor: pointer;
}

.close-add-to-playlist-menu i {
    font-size: 1.5em;
}

/* Playlist style */
.playlist {
    display: block;
    height: 330px;
    margin: 10px;
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
