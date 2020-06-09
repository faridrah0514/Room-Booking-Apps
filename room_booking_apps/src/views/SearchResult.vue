<template>
  <div class="search-result">
    <v-container>
      <h1>{{ filteredResult[0] }}</h1>
      <v-row>
        <v-col v-for="(item, index) in filteredResult[1]" v-bind:key="index" md="4">
          <v-card>
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            ></v-img>
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-subtitle>
              <span>
                <span v-for="(sub_item, index) in item.assets" :key="index">{{ sub_item }},</span>
              </span>
            </v-card-subtitle>
            <v-card-text>{{ item.description }}</v-card-text>
            <v-card-actions>
              <v-btn text>Book now</v-btn>
              <v-btn text>Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name:"search-result",
  data() {
    return {
      search: null,
      result: null,
      showResult: null
    };
  },
  computed: {
    filteredResult() {
      console.log("ini dari filteredResult");
      console.log(this.result);
      // return this.result;
      var lala = null;
      if (this.result) {
        lala = this.result.filter(item => {
          for (let i = 0; i < item.booking_detail.length; i++) {
            if (item.booking_detail[i].date == this.search.date) {
              return true;
            }
          }
        });
        console.log("panjang lala", lala.length);
        console.log(typeof lala);
        console.log(lala);
        if (lala.length == 0) {
          return ["All rooms available", this.result];
        } else {
          return ["Rooms for you", lala];
        }
      } else {
        return []
      }
    }
  },
  mounted() {
    Axios.get("http://localhost:8081/roomsearch")
      .then(item => {
        console.log("ini pas mounted");
        console.log(item.data);
        this.result = item.data;
      })
      .catch(err => console.log(err));

    //
    this.search = this.$store.state.queriesResult;
  }
};
</script>