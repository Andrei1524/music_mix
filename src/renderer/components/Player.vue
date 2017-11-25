<template>
    <div class="player" v-if="videoInfo">
        <youtube :style="yt_player" :video-id="videoId" :player-vars="playerVars" @ready="ready" @playing="playing" @buffering="buffering" @ended="ended"></youtube>
        <div class="player-top">
            <div class="player-ctrls">
                <div class="player-ctrls-play">
                    <span @click="previousSong">
                        <i class="fa fa-step-backward" aria-hidden="true"></i>
                    </span>
                    <span @click="play">
                        <i v-bind:class="ifMusicPlaying" aria-hidden="true"></i>
                    </span>
                    <span @click="nextSong">
                        <i class="fa fa-step-forward" aria-hidden="true"></i>
                    </span>
                </div>

                <div class="player-ctrls-shuffle">
                    <span>
                        <i class="fa fa-random" aria-hidden="true"></i>
                    </span>
                </div>

                <div class="player-ctrls-repeat" @click="setSongRepeat">
                    <span>
                        <i class="fa fa-repeat" aria-hidden="true" :style="ifSongRepeatTrue"></i>
                    </span>
                </div>

            </div>

            <div class="player-current-playing-song">
                <div class="player-current-playing-song-icon" :style="player_current_playing_song_icon">
                </div>

                <div class="player-current-playing-song-info">
                    <h3>{{ player_title_substr }}</h3>
                    <p>{{ player_description_substr }}</p>
                </div>
            </div>
        </div>
        <div class="player-bottom">
            <div class="player-bottom-line">
                <input type="range" min="0" max="100" :value="line_percentage" @change="playerInputLineRange" step="1" class="player-line-current">
                <span class="player-line" :style="lineWidthPercentageFromSeconds"></span>
            </div>

            <div class="player-bottom-seconds">
                <span class="player-seconds-run">{{ started_seconds }}</span>
                <div class="player-more-settings-middle">
                    <span class="player-volume">
                        <i :class="volume_changes_class" aria-hidden="true" @click="mute_unmute"></i>
                        <input type="range" min="0" max="100" step="1" :value="player_volume" @change="change_volume">
                    </span>
                </div>
                <span class="player-seconds-left">{{ player_length }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { bus } from '../main'
export default {
    data () {
        return {
            videoId: null,
            videoInfo: undefined,
            started_seconds: '0:00',
            started_seconds_no_format_ms: 0,
            player_length: '0:00',
            player_length_no_format_ms: 0,
            player_volume: 80,
            isMuted: false,
            line_percentage: 0,
            is_playing: false,
            set_song_repeat: false,
            playerVars: {
                autoplay: 1,
                width: 100,
                height: 100
            }
        }
    },
    methods: {
        ready (player) {
                this.player = player
            },
            async change () {
                // when you change the value, the player will also change.
                // If you would like to change `playerVars`, please change it before you change `videoId`.
                // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
                // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
            },
            ended () {
                if (!this.set_song_repeat) {
                    this.nextSong()
                }

                if (this.set_song_repeat) {
                    this.player.playVideo()
                }
            },
            async playing (player) {
                setInterval(async () => {
                    let ms = this.player.getCurrentTime()
                    let mom
                    let seconds = new Date(ms).getTime()
                    let secondsPassed = moment('1900-01-01 00:00:00').add(seconds, 'seconds').format('m:ss')

                    this.player.setVolume(this.player_volume)

                    let videoLengthMs = this.player.getDuration()
                    let videoLength = this.player.getDuration() - seconds
                    let videoLengthSeconds = moment('1900-01-01 00:00:00').add(videoLength, 'seconds').format('m:ss')

                    this.line_percentage = Math.round((ms / videoLengthMs) * 100)
                    this.started_seconds = secondsPassed
                    this.started_seconds_no_format_ms = ms
                    this.player_length = videoLengthSeconds
                    this.player_length_no_format_ms = videoLengthMs

                    if (this.setLoop) {
                        this.player.setLoop()
                    }
                }, 300)
            },
            stop () {
                this.player.stopVideo()
            },
            buffering () {

            },
            async play (player) {
                if (this.is_playing) {
                    this.is_playing = false
                } else {
                    this.is_playing = true
                }

                if (this.is_playing) {
                    this.player.playVideo()
                    this.player.setVolume(this.player_volume)
                }

                if (!this.is_playing) {
                    this.player.pauseVideo()
                    this.player.setVolume(this.player_volume)
                }
            },
            playerInputLineRange (e, player) {
                this.player.seekTo(this.player_length_no_format_ms * (e.target.value / 100))
            },
            change_volume (e) {
                this.player_volume = e.target.value
            },
            mute_unmute () {
                if (!this.isMuted) {
                    this.isMuted = true
                    this.player_volume = 0
                } else {
                    this.isMuted = false
                    this.player_volume = 80
                }
            },
            nextSong () {
                let currentPlayingSongIndex

                this.$store.state.search_result.forEach(result => {
                    if (result.id === this.videoId) {
                         currentPlayingSongIndex = this.$store.state.search_result.indexOf(result)
                    }
                })
                this.videoId = this.$store.state.search_result[currentPlayingSongIndex + 1].id
                this.videoInfo = this.$store.state.search_result[currentPlayingSongIndex + 1]
            },
            previousSong () {
                let currentPlayingSongIndex

                this.$store.state.search_result.forEach(result => {
                    if (result.id === this.videoId) {
                         currentPlayingSongIndex = this.$store.state.search_result.indexOf(result)
                    }
                })
                this.videoId = this.$store.state.search_result[currentPlayingSongIndex - 1].id
                this.videoInfo = this.$store.state.search_result[currentPlayingSongIndex - 1]
            },
            setSongRepeat () {
                if (this.set_song_repeat) {
                    this.set_song_repeat = false
                } else {
                    this.set_song_repeat = true
                }
            }
        },
        watch: {
        },
        computed: {
            ifMusicPlaying () {
                if (!this.is_playing) {
                    return {
                        'fa fa-play': !this.is_playing
                    }
                } else {
                    return {
                        'fa fa-pause': this.is_playing
                    }
                }
            },
            lineWidthPercentageFromSeconds () {
                return {
                    'width': this.line_percentage + '%'
                }
            },
            yt_player () {
                return {
                    'display': 'none'
                }
            },
            player_title_substr () {
                if (this.videoInfo) {
                    if (this.videoInfo.title.length > 30) {
                        return this.videoInfo.title.substr(0, 30) + '...'
                    } else {
                        return this.videoInfo.title
                    }
                }
            },
            player_description_substr () {
                if (this.videoInfo) {
                    if (this.videoInfo.description.length > 50) {
                        return this.videoInfo.description.substr(0, 50) + '...'
                    } else {
                        return this.videoInfo.description
                    }
                }
            },
            player_current_playing_song_icon () {
                if (this.videoInfo) {
                    return {
                        'background': `url(${this.videoInfo.thumbnails.default.url})`
                    }
                }
            },
            volume_changes_class () {
                if (this.player_volume == 0) {
                    return {
                        'fa fa-volume-off': true
                    }
                }

                if (this.player_volume > 0 && this.player_volume <= 50) {
                    return {
                        'fa fa-volume-down': true
                    }
                }

                if (this.player_volume > 50) {
                    return {
                        'fa fa-volume-up': true
                    }
                }
            },
            ifSongRepeatTrue () {
                if (this.set_song_repeat) {
                    return {
                        'color': 'rgb(40, 62, 88)',
                        'opacity': '1 !important'
                    }
                }
            }
        },
        created (player) {
            this.ready()
            bus.$on('clickedOnASong', (searchResult) => {
                this.line_percentage = 0
                this.videoInfo = searchResult
                bus.$emit('changedSongSoChangeTheAppBgToo', this.videoInfo.thumbnails.high.url)
                this.videoId = this.$store.state.youtube_current_playing_song_id
                this.is_playing = true
            })
        },
        filters: {
        }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css');
span {
    display: block;
}

i {
    font-size: 1.5em;
    color: #FFF;
}

.player {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #0F1419;
    padding: 8px 8px;
    width: calc(100% - 16px);
}

.player-top {
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    user-select: none;
    cursor: default;
}
.player-ctrls {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
}

.player-ctrls-play span:nth-child(2) {
    width: 21.95px;
}

.player-ctrls-play {
    display: flex;
    align-items: center;
}

.player-ctrls-play span {
    display: flex;
    margin-right: 15px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.player-ctrls-play span {
    opacity: 0.8;
}

.player-ctrls-play span:hover {
    opacity: 1;
}
.player-ctrls-shuffle span {
    display: flex;
    margin-right: 10px;
    opacity: 0.8;
    cursor: pointer;
}

.player-ctrls-shuffle span:hover {
    opacity: 1;
}

.player-ctrls-shuffle span i {
    font-size: 1.2em;
}

.player-ctrls-repeat span {
    display: flex;
    opacity: 0.8;
    cursor: pointer;
}

.player-ctrls-repeat span:hover {
    opacity: 1;
}

.player-ctrls-repeat span i {
    font-size: 1.2em;
}

.player-current-playing-song-info {
    margin-left: 5px;
}

.player-current-playing-song {
    width: 50%;
}

.player-current-playing-song-info p {
    margin: 0;
    color: #FFF;
    font-weight: 300;
    font-size: 10px;
    margin-top: 2px;
    opacity: 0.6;
}

.player-current-playing-song {
    display: flex;
    padding: 5px;
    border: 1px solid #0a0d11;
    box-sizing: border-box;
    max-height: 62px;
  
}
.player-current-playing-song-info h3 {
    color: #FFF;
    font-weight: 300;
    font-size: 14px;
}
.player-current-playing-song-icon {
    width: 50px;
    min-width: 50px;
    height: 50px;
    border: 1px solid rgb(42, 60, 82);
    box-sizing: border-box;
    background-image: url('');
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
}
.player-bottom {
    position: relative;
    cursor: default;
}
.player-bottom-seconds {
    display: flex;
    justify-content: space-between;
    color: #FFF;
    font-weight: 300;
    font-size: 12px;
    padding-top: 10px;
}
.player-bottom-line {
    position: relative;
    margin: 8px 0;
}

.player-bottom-line input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

.player-bottom-line input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  position: relative;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #3A7393;
  cursor: pointer;
  margin-top: -5px;
  z-index: 10;
   /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
   box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

.player-bottom-line input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

.player-bottom-line input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent; 
  border-color: transparent;
  color: transparent;
}

.player-bottom-line input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #FFF;
  border-radius: 1.3px;
}

.player-bottom-line input[type=range]:focus::-webkit-slider-runnable-track {
  background: #FFF;
}

.player-bottom-line input[type=range]::-moz-range-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #FFF;
  border-radius: 1.3px;
}

.player-bottom-line input[type=range]::-ms-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
.player-bottom-line input[type=range]::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
.player-bottom-line input[type=range]:focus::-ms-fill-lower {
  background: #3071a9;
}
.player-bottom-line input[type=range]::-ms-fill-upper {
  background: #3071a9;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
.player-bottom-line input[type=range]:focus::-ms-fill-upper {
  background: #367ebd;
}




.player-line {
    position: absolute;
    height: 2px;
    width: 100%;
    background: #2C566E;
    top: 1px;
}

.player-line-current {
    position: absolute;
    height: 4px;
    width: 100%;
    background: #2C566E;
}

.player-line-current-circle {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    height: 15px;
    width: 15px;
    background: #3A7393;
    border-radius: 50%;
}

.player-more-settings-middle {
        position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.player-more-settings-middle span {
    display: flex;
    align-items: center;
}
.player-more-settings-middle span i {
    font-size: 1.2em;
    color: rgba(255, 255, 255, 0.69);
    cursor: pointer;
}
/* VOLUME */

.player-volume input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 80px; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
margin-left: 5px;
}

.player-volume input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  position: relative;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #FFF;
  cursor: pointer;
  margin-top: -5px;
  z-index: 10;
   /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
   box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

.player-volume input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

.player-volume input[type=range]::-ms-track {
    width: 80px;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent; 
  border-color: transparent;
  color: transparent;
}

.player-volume input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 1px;
  cursor: pointer;
background: rgba(255, 255, 255, 0.11);
  border-radius: 1.3px;
}

.player-volume input[type=range]:focus::-webkit-slider-runnable-track {
background: rgba(255, 255, 255, 0.11);
}

.player-volume input[type=range]::-moz-range-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 1.3px;
}

.player-volumee input[type=range]::-ms-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
.player-volume input[type=range]::-ms-fill-lower {
background: rgba(255, 255, 255, 0.11);
  border-radius: 2.6px;

}
.player-volume input[type=range]:focus::-ms-fill-lower {
background: rgba(255, 255, 255, 0.11);
}
.player-volume input[type=range]::-ms-fill-upper {
background: rgba(255, 255, 255, 0.11);
  border-radius: 2.6px;

}
.player-volume input[type=range]:focus::-ms-fill-upper {
background: rgba(255, 255, 255, 0.11);
}

</style>
