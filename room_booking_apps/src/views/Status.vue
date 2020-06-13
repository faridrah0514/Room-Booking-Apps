<template>
  <div class="Status">
    <v-container>
      <h2>This is the room for you have booked</h2>
      <v-row>
        <v-col v-for="(item, index) in bookedRoom" v-bind:key="index" md="4">
          <v-card>
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            ></v-img>
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-subtitle>{{ item.description }}</v-card-subtitle>
            <v-card-text>You book this room at {{ item.date }} {{item.time}}:00
              <br>
              This room has capacity of {{ item.capacity }} persons
              <br>
              This room has {{ item.assets }}
            </v-card-text>
            
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

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
    Axios.get("http://localhost:8081/booking/" + this.$store.state.user_id, {
      headers: {
        authorization: this.$store.state.user_token
      }
    })
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