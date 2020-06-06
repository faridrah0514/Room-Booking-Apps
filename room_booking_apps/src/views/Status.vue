<template>
  <div class="Status">
    <v-container>
      <h1>Hai from status component</h1>

      <h3>This is the room for you</h3>
      <v-row>
        <v-col v-for="(item, index) in bookedRoom" v-bind:key="index" md="4">
          <v-card>
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            ></v-img>
            <v-card-title>{{item.room_detail[0].name}}</v-card-title>
            <v-card-subtitle>
              <span>
                <span
                  v-for="(sub_item, index) in item.room_detail[0].assets"
                  :key="index"
                >{{ sub_item }},</span>
              </span>
            </v-card-subtitle>
            <v-card-text>{{ item.room_detail[0].description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
ß
<script>
import Axios from "axios";

export default {
  name: "Status",
  data() {
    return {
      bookedRoom: null
    };
  },
  mounted() {
    Axios.get("http://localhost:8081/booking/" + this.$store.state.user_id)
      .then(result => (this.bookedRoom = result.data))
      .catch(err => console.log(err));
  },
  computed: {
    userLoginDetail() {
      return {
        username: this.$store.state.user_name,
        user_id: this.$store.state.user_id
      };
    }
  }
};
</script>