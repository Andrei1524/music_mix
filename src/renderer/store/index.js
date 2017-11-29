import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import { bus } from '../main'
Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state: {
    current_playing_song: null,
    youtube_current_playing_song_id: null,
    search_result: [],
    current_playlist_array: [],
    play_from_playlists: false,
    play_from_search_results: false,
    appBackground: null,
    addToPlaylistMenu: false,
    selectedSongToAddToPlaylist: undefined
  },
  mutations: {
    search_youtube (state, payload) {
      state.search_result = payload
      bus.$emit('searched', null)
    },
    updateCurrentPlaylistArray (state, payload) {
      state.current_playlist_array = payload
    },
    playFromSearchList (state, payload) {
      state.play_from_playlists = false
      state.play_from_search_results = payload
    },
    playFromPlaylist (state, payload) {
      state.play_from_search_results = false
      state.play_from_playlists = payload
    },
    updateYoutubeCurrentPlayingSongId (state, payload) {
      state.youtube_current_playing_song_id = payload
    },
    setAppBackground (state, payload) {
      state.appBackground = payload
    },
    AddToPlaylistMenu (state, payload) {
      state.addToPlaylistMenu = payload
    },
    selectedSongToAddToPlaylist (state, payload) {
      state.selectedSongToAddToPlaylist = payload
    }
  },
  actions: {
    search_youtube ({commit}, payload) {
      commit('search_youtube', payload)
    },
    updateCurrentPlaylistArray ({commit}, payload) {
      commit('updateCurrentPlaylistArray', payload)
    },
    updateYoutubeCurrentPlayingSongId ({commit}, payload) {
      commit('updateYoutubeCurrentPlayingSongId', payload)
    },
    setAppBackground ({commit}, payload) {
      commit('setAppBackground', payload)
    },
    AddToPlaylistMenu ({commit}, payload) {
      commit('AddToPlaylistMenu', payload)
    },
    selectedSongToAddToPlaylist ({commit}, payload) {
      commit('selectedSongToAddToPlaylist', payload)
    },
    // play from search list
    playFromSearchList ({commit}, payload) {
      commit('playFromSearchList', payload)
    },
    // play from playlist
    playFromPlaylist ({commit}, payload) {
      commit('playFromPlaylist', payload)
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
