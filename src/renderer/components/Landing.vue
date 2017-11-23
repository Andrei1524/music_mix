<template>
    <div class="main">
        <app-searchResults></app-searchResults>
    </div>
</template>

<script>
import SearchResults from '../components/SearchResults.vue'
export default {

    components: {
        'app-searchResults': SearchResults
    }
}
</script>

<style scoped>
.main {
    padding: 0 8px;
    background: rgba(15, 20, 25, 0.59);
}
</style>
