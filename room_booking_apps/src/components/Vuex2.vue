<template>
    <div class="vuex-2">
        <h1>ini dari vuex 2</h1>
        <h2> {{ coba }}</h2>
    </div>
</template>

<script>
export default {
    computed: {
        coba(){
            return this.$store.state.nama
        }
    }
}
</script>