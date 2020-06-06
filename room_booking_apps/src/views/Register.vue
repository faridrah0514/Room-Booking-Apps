<template>
  <div class="register">
    <v-container>
      <v-row justify="center">
        <v-col md="6">
          <v-card outlined align="center" justify="center" class="py-10 indigo lighten-5 px-10">
            <h2 class="indigo--text text--lighten-1">Registration Form</h2>
            <br />
            <v-form>
              <v-text-field background-color="white" filled rounded label="First Name"></v-text-field>
              <v-text-field background-color="white" filled rounded label="Last Name"></v-text-field>
              <v-text-field background-color="white" filled rounded label="E-mail"></v-text-field>
              <v-text-field background-color="white" filled rounded label="Password"></v-text-field>
            </v-form>
            <v-card-subtitle class="pt-0">
              By clicking register, you agree to Room Boking App
              <span
                class="black--text"
              >User Agreement, Privacy Policy</span> and
              <span class="black--text">Cookie Policy</span>
            </v-card-subtitle>
            <v-card-actions>
                <v-btn class="indigo lighten-1 white--text" x-large outlined rounded min-width="100%">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Register"
};
</script>

<style>

.min-margin {
    display: block;
    /* margin-top: -100px; */
}
</style>