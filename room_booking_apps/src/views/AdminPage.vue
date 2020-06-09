<template>
  <div class="admin-page">
    <v-container>
      <h1>Hai from admin page</h1>
      <v-tabs>
        <v-tab>Users</v-tab>
        <v-tab>Rooms</v-tab>
        <v-tab-item>
          <v-row>
            <v-col md="2">User_id</v-col>
            <v-col>Username</v-col>
            <v-col>Password</v-col>
            <v-col>Role</v-col>
            <v-col>Action</v-col>
          </v-row>
          <v-row v-for="(item, index) in users" :key="index">
            <!-- <v-col v-for="(sub_item, index) in item" :key="index">{{sub_item}}</v-col> -->
            <v-col md="2">{{ item.user_id }}</v-col>
            <v-col>{{ item.username }}</v-col>
            <v-col>{{ item.password }}</v-col>
            <v-col>{{ item.role }}</v-col>
            <v-col>
              <v-btn>edit</v-btn>
              <v-btn>remove</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-btn v-on:click="dialog = true">add user</v-btn>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col>Room id</v-col>
            <v-col>Name</v-col>
            <v-col>Description</v-col>
            <v-col>Capacity</v-col>
            <v-col>Assets</v-col>
            <v-col>Action</v-col>
          </v-row>
          <v-row v-for="(item, index) in rooms" :key="index">
            <v-col>{{ item.room_id }}</v-col>
            <v-col>{{ item.name }}</v-col>
            <v-col>{{ item.description }}</v-col>
            <v-col>{{ item.capacity }}</v-col>
            <v-col>{{ item.assets }}</v-col>
            <v-col>
              <v-btn>Edit</v-btn>
              <v-btn>Remove</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-btn v-on:click="dialog_room = true">Add Room</v-btn>
          </v-row>
        </v-tab-item>
      </v-tabs>
      <v-dialog v-model="dialog">
        <v-card>
          <v-container>
            <v-row>
              <v-col>
                <h2>Add user</h2>
              </v-col>
            </v-row>
          </v-container>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field label="username" v-model="addUser.username" required></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Password"
                    type="password"
                    v-model="addUser.password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-select
                    :items="['admin', 'member']"
                    label="Role"
                    required
                    v-model="addUser.role"
                  ></v-select>
                </v-col>
              </v-row>
              <p>{{ addUser }}</p>
            </v-container>
          </v-card-text>
          <v-container>
            <v-card-actions>
              <v-btn v-on:click="add">confirm</v-btn>
              <v-btn v-on:click="dialog = false">cancel</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
        <v-dialog v-model="dialog_room">
        <v-card>
          <v-container>
            <v-row>
              <v-col>
                <h2>Add user</h2>
              </v-col>
            </v-row>
          </v-container>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field label="username" v-model="addUser.username" required></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Password"
                    type="password"
                    v-model="addUser.password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-select
                    :items="['admin', 'member']"
                    label="Role"
                    required
                    v-model="addUser.role"
                  ></v-select>
                </v-col>
              </v-row>
              <p>{{ addUser }}</p>
            </v-container>
          </v-card-text>
          <v-container>
            <v-card-actions>
              <v-btn v-on:click="add">confirm</v-btn>
              <v-btn v-on:click="dialog = false">cancel</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>

      <!-- <p>{{users}}</p>
      <p>{{rooms}}</p> -->
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "admin-page",
  data() {
    return {
      users: null,
      rooms: null,
      dialog: false,
      dialog_room: false,
      addUser: {
        username: null,
        password: null,
        role: null
      }
    };
  },
  mounted() {
    Axios.get("http://localhost:8081/users")
      .then(result => (this.users = result.data))
      .catch(err => console.log(err));

    Axios.get("http://localhost:8081/rooms")
      .then(result => (this.rooms = result.data))
      .catch(err => console.log(err));
  },
  methods: {
    // diEdit(e) {
    //   console.log(e);
    // },
    add() {
      const body = this.addUser;
      console.log(body);
      Axios.post("http://localhost:8081/adduser", this.addUser)
        .then(res => (this.users = res.data))
        .catch(err => console.log(err));

      this.dialog = false;
    }
  }
};
</script>