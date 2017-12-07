<template>
  <div class="topbar">
    <div class="logo">
      <span>music_mix</span>
    </div>
    <div class="topbar-dragspace" style="-webkit-app-region: drag"></div>
    <div class="topbar-controls">
      <div class="minimize-app topbar-control" @click="minimize">
        <img src="../../assets/icons/268-minus.svg">
      </div>

      <div class="close-app topbar-control" @click="close">
        <img src="../../assets/icons/272-cross.svg">
      </div>
    </div>

  </div>
</template>

<script>
import { remote } from 'electron'
export default {
  data () {
    return {

    }
  },
methods: {
  minimize () {
    remote.getCurrentWindow().minimize()
  },
  close () {
    remote.getCurrentWindow().close()
  }
}

}
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  background: #0A0D11;
}

.topbar-dragspace {
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  padding-left: 8px;
}

.logo span {
  display: block;
  color: #FFF;
  font-weight: 300;
  padding-bottom: 3px;
  user-select: none;
  cursor: default;
  letter-spacing: 0.5px;
}

.topbar-controls {
  display: flex;
  align-items: center;
  user-select: none;
}

.topbar-control {
  padding: 5px 8px;
  height: 100%;
  box-sizing: border-box;
  cursor: pointer;
}

.topbar-control:hover {
  background-color: #2a313a;
}

.topbar-control img {
  display: block;
  height: 100%;
  width: 14px;
}
</style>
