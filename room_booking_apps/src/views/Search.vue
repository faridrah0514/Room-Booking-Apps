<template>
  <v-app>
    <v-container class="mt-10">
      <h3>Search for Available room:</h3>
      <v-form>
        <v-row>
          <v-col class="mb-6">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              required
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="queries.date"
                  label="Select date *"
                  readonly
                  hint="YYYY/MM/DD format"
                  persistent-hint
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="queries.date" @input="menu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col class="mb-6">
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
            
              transition="scale-transition"
              offset-y
              required
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field  v-model="queries.time" required label="Select time *" readonly v-on="on"></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="queries.time"
                format="24hr"
                full-width
                
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
        <p class="grey--text mb-6">* : Mandatory field</p>
        <v-btn v-on:click="sendQueries" :disabled="!queries.date || !queries.time">search</v-btn>
      </v-form>
      <!-- <p> {{queriesResult }}</p> -->
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
    },
    queriesResult:{}
  }),
  methods: {
    sendQueries(){
      this.queriesResult = {
        date: this.queries.date,
        time: this.queries.time,
      }
      this.$store.state.queriesResult = this.queriesResult
      this.$router.push('/searchresult')
    }
  }
};
</script>
