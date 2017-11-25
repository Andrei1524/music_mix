<template>
    <div class="results">
        <div class="music-card" v-for="search_result in search_results" v-bind:key="search_result.id">
            <div class="music-card-left" @click="update_youtube_id(search_result)">
                <div class="music-card-picture">
                    <img :src="search_result.thumbnails.default.url" >
                </div>
                <div class="music-card-author">
                    <h3>{{ search_result.title }}</h3>
                    <p>{{ search_result.description.substr(0, 30) }}...</p>
                </div>
            </div>
            
            <div class="music-card-right">
                <div class="more-options">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <title>dots-three-horizontal</title>
                        <path fill="#FFF" d="M10.001 7.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.985 2.199-2.2s-0.984-2.2-2.199-2.2zM3.001 7.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.986 2.199-2.2s-0.984-2.2-2.199-2.2zM17.001 7.8c-1.215 0-2.201 0.985-2.201 2.2s0.986 2.2 2.201 2.2c1.215 0 2.199-0.985 2.199-2.2s-0.984-2.2-2.199-2.2z"></path>
                    </svg>

                    <div class="options-dropdown">
                        <span>Add to Playlist</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { bus } from '../main'
export default {
    data () {
        return {
            search_results: []
        }
    },
    methods: {
        async update_youtube_id (searchResult) {
            await this.$store.dispatch('updateYoutubeCurrentPlayingSongId', searchResult.id)
            bus.$emit('clickedOnASong', searchResult)
        }
    },
    watch: {

    },
    created () {
        if (this.$store.state.search_result) {
            this.search_results = this.$store.state.search_result
        }
        bus.$on('searched', () => {
            this.search_results = this.$store.state.search_result
        })
    }
}
</script>

<style scoped>
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

.results {
    margin-top: 5px;
    background-color: rgba(15, 20, 25, 0.87);
    max-height: 350px;
    overflow: auto;
}

.music-card {
    background-color: rgba(10, 13, 17, 0.55);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 5px;
    height: 80px;
    box-sizing: border-box;
}

.music-card-left {
    display: flex;
    cursor: pointer;
    user-select: none;
}

.music-card-right {
    cursor: pointer;
    padding: 0px 5px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.music-card-picture {
    width: 60px;
    min-width: 60px;
    max-width: 60px;
    height: 46px;
    max-height: 46px;
    border: 1px solid rgb(42, 60, 82);
    box-sizing: border-box;
}

.music-card-author {
    margin-left: 5px;
}

.music-card-author h3,
p {
    font-weight: 300;
    margin: 0;
    color: #FFF;
}

.music-card-author h3 {
    font-size: 16px;
}

.music-card-author p {
    font-size: 13px;
    opacity: 0.6;
}

.music-card-picture img {
    display: block;
    width: 100%;
}

.more-options {
    position: relative;
}

.options-dropdown {
    position: absolute;
    left: -47px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* text-align: center; */
    width: 70px;
}

.options-dropdown span {
    display: block;
    color: #FFF;
    font-weight: 200;
    font-size: 13px;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
}

</style>
