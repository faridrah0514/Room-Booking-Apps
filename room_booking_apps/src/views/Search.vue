<template>
  <v-app>
    <v-container>
      <h3>Search Form:</h3>
      <v-form>
        <v-row>
          <v-col class="md-6">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="queries.date"
                  label="Picker without buttons"
                  readonly
                  hint="YYYY/MM/DD format"
                  persistent-hint
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="queries.date" @input="menu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col class="md-6">
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="queries.time" label="Picker in menu" readonly v-on="on"></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="queries.time"
                format="24hr"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="queries.roomCapacity" label="Room Capacity"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <header>Assets</header>
          </v-col>
          <v-checkbox
            class="mx-2"
            v-model="queries.checkedAssets"
            value="Projector"
            label="Projector"
          ></v-checkbox>
          <v-checkbox class="mx-2" v-model="queries.checkedAssets" value="Monitor" label="Monitor"></v-checkbox>
          <v-checkbox class="mx-2" v-model="queries.checkedAssets" value="Water" label="Water"></v-checkbox>
        </v-row>
        <v-btn v-on:click="sendQueries">search</v-btn>
      </v-form>
      <p> {{queriesResult }}</p>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: "Search",
  components: {

  },
  data: () => ({
    menu: false,
    modal: false,
    menu2: false,
    modal2: false,
    queries: {
      date: new Date().toISOString().substr(0, 10),
      time: null,
      checkedAssets: [],
      roomCapacity: null
    },
    queriesResult:{}
  }),
  methods: {
    sendQueries(){
      this.queriesResult = {
        date: this.queries.date,
        time: this.queries.time,
        checkedAssets: this.queries.checkedAssets,
        roomCapacity: this.queries.roomCapacity
      }
      this.$store.state.queriesResult = this.queriesResult
      this.$router.push('/searchresult')
    }
  }
};
</script>
