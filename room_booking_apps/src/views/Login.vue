<template>
  <div class="register">
    <v-container>
      <v-row justify="center">
        
        <v-col md="5">
          <p v-if="!login_status" class="red--text">User not found</p>
          <v-card outlined align="center" justify="center" class="py-10 indigo lighten-5 px-10">
            <h2 class="indigo--text">Room Booking Apps</h2>
            <br />
            <v-form>
              <v-text-field background-color="white" v-model="email" filled rounded label="E-mail"></v-text-field>
              <v-text-field
                type="password"
                background-color="white"
                v-model="password"
                filled
                rounded
                label="Password"
              ></v-text-field>
            </v-form>
            <v-card-actions align="center" justify="center" class="my-0 py-0">
              <v-row justify="center">
                <v-col class="py-0">
                  <v-btn to="/register" class="mr-1" min-width="40%" text rounded x-large>Register</v-btn>
                  <v-btn
                    class="indigo white--text ml-1"
                    min-width="40%"
                    x-large
                    outlined
                    rounded
                    v-on:click="loginFunction"
                  >Login</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- <p>{{ email }}</p>
    <p>{{ password }}</p>
    <p>{{ server_response }}</p>
    <p>{{ user_role }}</p>
    <p>Login Status (vuex) => {{ cobaStatus }}</p> -->
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      server_response: null,
      status: "logout",
      user_role: null,
      login_status: true
    };
  },
  methods: {
    loginFunction() {
      const body = {
        username: this.email,
        password: this.password
      };
      Axios.post("http://localhost:8081/users", body)
        .then(result => {
          this.server_response = result.data;
          if (this.server_response.status === "success") {
            this.$store.state.login_status = "login"
            this.$store.state.user_role = this.server_response.role
            this.$store.state.user_name = this.server_response.username
            this.$store.state.user_id = this.server_response.user_id
            this.$router.push('/')
          } else {
            this.$store.state.login_status = "logout"
            this.email = ""
            this.password = ""
            this.login_status = false
          }

        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    cobaStatus(){
      return this.$store.state.login_status
    }
  }
};
</script>

<style>
</style>