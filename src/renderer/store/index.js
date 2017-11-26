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
    appBackground: null,
    addToPlaylistMenu: false,
    selectedSongToAddToPlaylist: undefined
  },
  mutations: {
    search_youtube (state, payload) {
      state.search_result = payload
      bus.$emit('searched', null)
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
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
