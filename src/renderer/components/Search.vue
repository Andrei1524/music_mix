<template>
    <div style="display: flex;justify-content: center;">
        <div class="search">
            <input v-if="this.search_on_youtube" v-on:change="search_youtube" v-model="youtube_text_search" type="text" placeholder="SEARCH">
            <input v-if="this.search_on_soundcloud" type="text" placeholder="SOUNDCLOUD URL">
            <div class="select-search">
                <div class="youtube-search" @click="SearchOnYoutube">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="22" viewBox="0 0 16 16">
                        <path :style="ytb_path_color" fill="#000000" d="M15.841 4.8c0 0-0.156-1.103-0.637-1.587-0.609-0.637-1.291-0.641-1.603-0.678-2.237-0.163-5.597-0.163-5.597-0.163h-0.006c0 0-3.359 0-5.597 0.163-0.313 0.038-0.994 0.041-1.603 0.678-0.481 0.484-0.634 1.587-0.634 1.587s-0.159 1.294-0.159 2.591v1.213c0 1.294 0.159 2.591 0.159 2.591s0.156 1.103 0.634 1.588c0.609 0.637 1.409 0.616 1.766 0.684 1.281 0.122 5.441 0.159 5.441 0.159s3.363-0.006 5.6-0.166c0.313-0.037 0.994-0.041 1.603-0.678 0.481-0.484 0.637-1.588 0.637-1.588s0.159-1.294 0.159-2.591v-1.213c-0.003-1.294-0.162-2.591-0.162-2.591zM6.347 10.075v-4.497l4.322 2.256-4.322 2.241z"></path>
                    </svg>
                </div>

                <div class="soundcloud-search" @click="SearchOnSoundcloud">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="22" viewBox="0 0 16 16">
                        <path :style="soundcloud_path_color" fill="#000000" d="M13.937 8.034c-0.283 0-0.552 0.055-0.798 0.154-0.164-1.787-1.723-3.188-3.625-3.188-0.465 0-0.917 0.088-1.317 0.237-0.156 0.058-0.197 0.117-0.197 0.233v6.292c0 0.121 0.098 0.222 0.221 0.234 0.005 0.001 5.68 0.003 5.717 0.003 1.139 0 2.062-0.888 2.062-1.983s-0.924-1.983-2.063-1.983zM6.25 12h0.5l0.25-3.503-0.25-3.497h-0.5l-0.25 3.497zM4.75 12h-0.5l-0.25-2.543 0.25-2.457h0.5l0.25 2.5zM2.25 12h0.5l0.25-2-0.25-2h-0.5l-0.25 2zM0.25 11h0.5l0.25-1-0.25-1h-0.5l-0.25 1z"></path>
                    </svg>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { ytKey } from '../../config/config.js'
import search from 'youtube-search'

let opts = {
  maxResults: 15,
  type: 'video',
  videoEmbeddable: true,
  key: ytKey
}

export default {
    data () {
        return {
            youtube_text_search: '',
            search_on_youtube: true,
            search_on_soundcloud: false
        }
    },

    methods: {
        SearchOnYoutube () {
            if (this.search_on_youtube) {
                this.search_on_youtube = false
            } else {
                this.search_on_youtube = true
                this.search_on_soundcloud = false
            }
        },

        SearchOnSoundcloud () {
            if (this.search_on_soundcloud) {
                this.search_on_soundcloud = false
            } else {
                this.search_on_soundcloud = true
                this.search_on_youtube = false
            }
        },

        search_youtube () {
            search(this.youtube_text_search, opts, (err, results) => {
            if (err) return console.log(err)
                this.$store.dispatch('search_youtube', results)
            })
        }
    },
    computed: {
        ytb_path_color () {
            if (this.search_on_youtube) {
                return {
                    'fill': '#aac5e4'
                }
            }
        },

        soundcloud_path_color () {
            if (this.search_on_soundcloud) {
                return {
                    'fill': '#aac5e4'
                }
            }
        }
    }
}
</script>

<style scoped>

.search {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
}

.search input {
    background: #0A0D11;
    border: none;
    color: #FFF;
    font-weight: 300;
    padding: 10px 5px;
    text-align: center;
    border-radius: 10px;
}

.search input::placeholder {
    color: #FFF;
    font-weight: 300;
    opacity: 0.5;
}
.search input:focus {
    outline: none;
}

.select-search {
    display: flex;
    align-items: center;
    margin-top: 5px;
}

.select-search div {
    background-color: #2A3C52;
    padding: 5px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.select-search div svg path {
    fill: #141a21;
}


</style>
