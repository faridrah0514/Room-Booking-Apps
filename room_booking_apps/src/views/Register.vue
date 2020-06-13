<template>
  <div class="register">
    <v-container>
      <v-row justify="center">
        <v-col md="6">
          <v-card outlined align="center" justify="center" class="py-10 indigo lighten-5 px-10">
            <h2 class="indigo--text text--lighten-1">Registration Form</h2>
            <br />
            <v-form>
              <v-text-field v-model='username' background-color="white" filled rounded label="Username"></v-text-field>
              <v-text-field type='password' v-model='password' background-color="white" filled rounded label="Password"></v-text-field>
              <v-text-field type='password' v-model='verify_password' background-color="white" filled rounded label="Verify Password"></v-text-field>
            </v-form>
            <v-card-subtitle class="pt-0">
              <p class="red--text" v-if='password != verify_password'>Password does not match</p>
              By clicking register, you agree to Room Boking App
              <span
                class="black--text"
              >User Agreement, Privacy Policy</span> and
              <span class="black--text">Cookie Policy</span>
            </v-card-subtitle>
            <v-card-actions>
                <v-btn v-on:click='register' class="indigo lighten-1 white--text" x-large outlined rounded min-width="100%">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import Axios from 'axios';
import Axios from 'axios'

export default {
  name: "Register",
  data() {
    return {
      username: null,
      password: null,
      verify_password: null
    }
  },
  methods:{
    register(){
      if (this.password != this.verify_password) {
        alert("Password does not match")
      } else {
        Axios.post("http://localhost:8081/register", { username: this.username, password: this.password, role: "member" })
        .then(res => {
          if (res.data.status == "error") {
            alert("user already exist")
          } else {
            // return 0
            
            this.$router.push('/login')
          }
        })
        .catch(err => console.log(err))
      }
    }
  }
};
</script>

<style>

.min-margin {
    display: block;
    /* margin-top: -100px; */
}
</style>