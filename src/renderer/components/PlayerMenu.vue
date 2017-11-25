<template>
  <div class="menu">
      <router-link to="/" class="options active" exact-active-class="active-link">
        <span>SEARCH RESULTS</span>
      </router-link>
      <router-link to="/playlists" class="options active" exact-active-class="active-link">
          <span>MY PLAYLISTS</span>
      </router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.menu {
    display: flex;
    background-color: #0A0D11;
    margin: 5px 0;
}
.options {
    text-decoration: none;
}
.options span {
    color: #FFF;
    font-weight: 200;
    font-size: 14px;
    display: block;
    cursor: pointer;
    padding: 5px;
    user-select: none;
}
.active-link {
    background: #2a3c52;
}
.options:hover {
    background: #2a3c52;
}

</style>
