<template>
  <v-app>
    <v-container>
      <h3>Home</h3>
      <h4>{{ cobaStatus }}</h4>
      <h4>lala {{ cobaExtra }}</h4>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  components: {

  },
  computed:{
    cobaStatus(){
      return this.$store.state.login_status
    },
    cobaExtra(){
      console.log(this.$store.state.extra)
      return this.$store.state.extra
    }
  }
};
</script>
