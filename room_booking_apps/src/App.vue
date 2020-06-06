<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Navbar from './components/Navbar'

export default {
  name: 'App',

  components: {
    Navbar
  },
  mounted(){
    if (this.$store.state.login_status === 'logout'){
      this.$router.push('/login')
    }
  },
  data: () => ({
    //
  }),
};
</script>
