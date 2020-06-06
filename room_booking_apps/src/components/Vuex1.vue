<template>
    <div class="vuex-1">
        <h1>ini dari vuex-1</h1>
        <!-- <p>{{ this.$store.state.name }}</p> -->
        <p>{{ coba }}</p>
    </div>
</template>

<script>
export default {
    name: 'vuex-1',
    computed: {
        coba(){
            return this.$store.state.nama
        }
    }
}
</script>