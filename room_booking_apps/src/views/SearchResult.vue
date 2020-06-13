<template>
  <div class="search-result">
    <v-container>
      <h2>Room available for you at {{ search.date }} {{search.time}}</h2>
      <br />
      <h5>Filter by:</h5>
      <v-row>
        <v-col md="6" class="pb-0">
          <h5>Assets</h5>
        </v-col>
        <v-col md="6">
          <h5>Capacity 0-{{ slider }} persons</h5>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="2" class="pt-0">
          <v-checkbox
            dense
            class="mx-2"
            v-model="checkedAssets"
            value="Projector"
            label="Projector"
          ></v-checkbox>
        </v-col>
        <v-col md="2" class="pt-0">
          <v-checkbox dense class="mx-2" v-model="checkedAssets" value="Monitor" label="Monitor"></v-checkbox>
        </v-col>
        <v-col md="2" class="pt-0">
          <v-checkbox dense class="mx-2" v-model="checkedAssets" value="Water" label="Water"></v-checkbox>
        </v-col>
        <v-col md="6" lg="6">
          <v-slider v-model="slider" :thumb-size="24" thumb-label="always"></v-slider>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(item, index) in filteredResult[1]" v-bind:key="index" md="4">
          <v-card v-if="item.capacity <= slider">
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            ></v-img>
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-subtitle>{{ item.description }}</v-card-subtitle>
            <v-card-text>
              This room is available at {{ search.date }} {{ search.time }}
              <br />
              This room has capacity of {{ item.capacity }} persons
              <br />
              This room has {{ item.assets }}
            </v-card-text>
            <v-card-actions>
              <v-btn text v-on:click="bookThisRoom(item)">Book now</v-btn>
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
  name: "search-result",
  data() {
    return {
      search: [],
      result: null,
      checkedAssets: [],
      slider: 10,
      showResult: null,
      bookedRoom: []
    };
  },
  computed: {
    filteredResult() {
      return [
        "Rooms available for you",
        this.bookedRoom.filter(item => {
          if (item.capacity <= this.slider) {
            if (this.checkedAssets.length == 0) {
              return true;
            } else {
              var statement = true;
              for (let i = 0; i < this.checkedAssets.length; i++) {
                if (item.assets.includes(this.checkedAssets[i]) == false) {
                  statement = false;
                  break;
                }
              }
              return statement;
            }
          }
        })
      ];
    }
  },
  mounted() {
    Axios.get("http://localhost:8081/roomsearch", {
      headers: {
        authorization: this.$store.state.user_token
      }
    })
      .then(item => {
        this.result = item.data;
      })
      .catch(err => console.log(err));
    this.search = this.$store.state.queriesResult;

    Axios.post(
      "http://localhost:8081/booking",

      this.$store.state.queriesResult,
      {
        headers: {
          authorization: this.$store.state.user_token
        }
      }
    )
      .then(res => (this.bookedRoom = res.data))
      .catch(err => console.log(err));
  },
  methods: {
    bookThisRoom(item) {
      Axios.post(
        "http://localhost:8081/bookroom",
        {
          room_id: item.room_id,
          user_id: this.$store.state.user_id,
          date: this.search.date,
          time: this.search.time.split(":")[0]
        },
        {
          headers: {
            authorization: this.$store.state.user_token
          }
        }
      )
        .then(res => {
          if (res.data.status == "success") {
            this.$router.push("/status");
          } else {
            alert("booking failed");
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>