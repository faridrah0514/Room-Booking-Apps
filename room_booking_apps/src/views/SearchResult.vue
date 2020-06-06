<template>
  <div class="search-result">
    <v-container>
      <!-- <h3>{{ queriesResult }}</h3>
      <p>{{ search }}</p>
      <hr />
      <p>{{ result }}</p>
      <hr />-->
      <!-- <p>{{ filteredResult[0] }}</p> -->
      <!-- <h1>{{ filteredResult[0] }}</h1> -->
      <!-- <h1>{{ filteredResult[0] }}</h1> -->
      <!-- <h1>{{ filteredResult }}</h1> -->
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
    <p>{{ result }}</p>
    <hr>
    <p>Search</p>
    <p>{{ search }}</p>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      search: null,
      result: null,
      showResult: null
    };
  },
  computed: {
    queriesResult() {
      return this.$store.state.queriesResult;
    },
    filteredResult() {

        var lala = this.result.filter(item => {
          for (let i = 0; i < item.booking_detail.length; i++) {
            if (item.booking_detail[i].date == this.search.date) {
              return true;
            }
          }
        });

        if (lala.length > 0) {
          //   this.showResult == lala
          return ["booked rooms", lala];
        } else {
          //   this.showResult = this.result
          return ["All rooms available", this.result];
        }
      } 
    
  },
  mounted() {
    Axios.get("http://localhost:8081/roomsearch")
      .then(item => {
        console.log(item.data);
        this.result = item.data;
      })
      .catch(err => console.log(err));

    //
    this.search = this.$store.state.queriesResult;
  }
};
</script>