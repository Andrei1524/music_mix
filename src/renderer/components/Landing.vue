<template>
    <div class="main">
        <app-search></app-search>
        <app-searchResults></app-searchResults>
    </div>
</template>

<script>
import Search from '../components/Search.vue'
import SearchResults from '../components/SearchResults.vue'
export default {

    components: {
        'app-search': Search,
        'app-searchResults': SearchResults
    }
}
</script>

<style scoped>
.main {
    padding: 0 8px;
}
</style>
