<template>
  <div>
    <v-toolbar class="indigo ligthen-4" flat dense>
      <v-toolbar-title></v-toolbar-title>
      <v-toolbar-items>
        <v-btn to="/" v-if="login" text class="white--text">Home</v-btn>
        <v-btn to="/status" text v-if="login" class="white--text">Status</v-btn>
        <v-btn to="/login" v-if="logout" text class="white--text">Login</v-btn>
        <v-btn
          v-if="login && isAdmin === 'admin'"
          to="/adminpage"
          text
          class="white--text"
        >Admin Page</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/login" v-if="login" v-on:click="userLogout" text class="white--text">Logout</v-btn>
      </v-toolbar-items>
      <!-- <v-toolbar-item> -->

      <!-- </v-toolbar-item> -->
    </v-toolbar>
  </div>
</template>

<script>
export default {
  methods: {
    userLogout() {
      return this.$store.commit("userLogout");
    }
  },
  computed: {
    login() {
      if (this.$store.state.login_status === "login") {
        return true;
      } else {
        return false;
      }
    },
    logout() {
      if (this.$store.state.login_status === "logout") {
        return true;
      } else {
        return false;
      }
    },
    isAdmin() {
      return this.$store.state.user_role;
    }
  }
};
</script>