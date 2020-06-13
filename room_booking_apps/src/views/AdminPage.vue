<template>
  <div class="admin-page">
    <v-container>
      <h1>Hai from admin page</h1>
      <v-tabs>
        <v-tab>Users</v-tab>
        <v-tab>Rooms</v-tab>
        <v-tab>Booking</v-tab>
        <v-tab-item>
          <v-row>
            <v-col md="2">User_id</v-col>
            <v-col>Username</v-col>
            <v-col>Role</v-col>
            <v-col>Action</v-col>
          </v-row>
          <v-row v-for="(item, index) in users" :key="index">
            <v-col md="2">{{ item.user_id }}</v-col>
            <v-col>{{ item.username }}</v-col>
            <!-- <v-col>{{ item.password }}</v-col> -->
            <v-col>{{ item.role }}</v-col>
            <v-col>
              <v-btn text small outlined color="normal" :disabled="item.username == 'admin'">edit</v-btn>
              <v-btn
                text
                small
                outlined
                color="error"
                v-on:click="removeUser(item)"
                :disabled="item.username == 'admin'"
              >remove</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-btn v-on:click="dialog = true" text outlined color="primary">add user</v-btn>
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
              <v-btn text small outlined color="normal">Edit</v-btn>
              <v-btn text small outlined color="error" v-on:click="removeRoom(item)">Remove</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-btn v-on:click="dialog_room = true" text outlined color="primary">Add Room</v-btn>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col>Booking id</v-col>
            <v-col>Room Name</v-col>
            <v-col>Username</v-col>
            <v-col>Date</v-col>
            <v-col>Time</v-col>
            <v-col>Action</v-col>
          </v-row>
          <v-row v-for="(item, index) in booking" :key="index">
            <!-- <v-col>{{item}}</v-col> -->
            <v-col>{{ item.booking_id }}</v-col>
            <v-col>{{ item.name }}</v-col>
            <v-col>{{ item.username }}</v-col>
            <v-col>{{ item.date }}</v-col>
            <v-col>{{ item.time }}</v-col>
            <v-col>
              <v-btn text small outlined color="error" v-on:click="removeBooking(item)">Remove</v-btn>
            </v-col>
          </v-row>
          <!-- <v-row> -->
          <!-- <v-btn v-on:click="dialog_room = true" text outlined color="primary">Add Room</v-btn> -->
          <!-- </v-row> -->
        </v-tab-item>
      </v-tabs>
      <v-dialog v-model="dialog" max-width="500">
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
              <!-- <p>{{ addUser }}</p> -->
              <p v-if="user_warning" class="red--text">User already exists</p>
            </v-container>
          </v-card-text>
          <v-container>
            <v-card-actions>
              <v-btn
                v-on:click="addUsers"
                :disabled="!addUser.username || !addUser.password || !addUser.role"
              >confirm</v-btn>
              <v-btn v-on:click="dialog = false; user_warning= false">cancel</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog_room">
        <v-card>
          <v-container>
            <v-row>
              <v-col>
                <h2>Add Room</h2>
              </v-col>
            </v-row>
          </v-container>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field label="Room Name" v-model="addRoom.roomName" required></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="Description" v-model="addRoom.description" required></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Capacity (number of people)"
                    v-model="addRoom.capacity"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <h4>Assets</h4>
                </v-col>
                <v-checkbox class="mx-2" v-model="addRoom.assets" value="Monitor" label="Monitor"></v-checkbox>
                <v-checkbox
                  class="mx-2"
                  v-model="addRoom.assets"
                  value="Projector"
                  label="Projector"
                ></v-checkbox>
                <v-checkbox class="mx-2" v-model="addRoom.assets" value="Water" label="Water"></v-checkbox>
              </v-row>
              <p>{{ addRoom }}</p>
              <p v-if="room_warning" class="red--text">Room already exists</p>
            </v-container>
          </v-card-text>
          <v-container>
            <v-card-actions>
              <v-btn
                v-on:click="addRooms"
                :disabled="!addRoom.roomName || !addRoom.description || !addRoom.capacity || ! (addRoom.assets.length > 0)"
              >confirm</v-btn>
              <v-btn v-on:click="dialog_room = false">cancel</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
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
      booking: null,
      user_warning: false,
      room_warning: false,
      dialog: false,
      dialog_room: false,
      addUser: {
        username: null,
        password: null,
        role: null
      },
      addRoom: {
        roomName: null,
        description: null,
        capacity: null,
        assets: []
      }
    };
  },
  mounted() {
    Axios.get("http://localhost:8081/users", {
      headers: {
        authorization: this.$store.state.user_token
      }
    })
      .then(result => (this.users = result.data))
      .catch(err => console.log(err));

    Axios.get("http://localhost:8081/rooms", {
      headers: {
        authorization: this.$store.state.user_token
      }
    })
      .then(result => (this.rooms = result.data))
      .catch(err => console.log(err));

    Axios.get("http://localhost:8081/bookinglist", {
      headers: {
        authorization: this.$store.state.user_token
      }
    })
      .then(res => (this.booking = res.data))
      .catch(err => console.log(err));

    this.user_warning = false;
    this.room_warning = false;
  },
  methods: {
    addUsers() {
      Axios.post("http://localhost:8081/adduser", this.addUser, {
        headers: {
          authorization: this.$store.state.user_token
        }
      })
        .then(res => {
          if (res.data.status == "error") {
            return (this.user_warning = true);
          } else {
            this.dialog = false;
            this.addUser.username = null;
            this.addUser.password = null;
            this.addUser.role = null;
            return (this.users = res.data);
          }
        })
        .catch(err => console.log(err));
    },
    removeUser(item) {
      console.log(item.user_id);
      Axios.post(
        "http://localhost:8081/deleteuser",
        { user_id: item.user_id },
        {
          headers: {
            authorization: this.$store.state.user_token
          }
        }
      )
        .then(res => (this.users = res.data))
        .catch(err => console.log(err));
    },
    addRooms() {
      console.log(this.addRoom);
      Axios.post("http://localhost:8081/addroom", this.addRoom, {
        headers: {
          authorization: this.$store.state.user_token
        }
      })
        .then(res => {
          if (res.data.status == "error") {
            return (this.room_warning = true);
          } else {
            this.dialog_room = false;
            this.addRoom.roomName = null;
            this.addRoom.description = null;
            this.addRoom.capacity = null;
            this.addRoom.assets = [];
            return (this.rooms = res.data);
          }
        })
        .catch(err => console.log(err));
    },
    removeRoom(item) {
      console.log(item.room_id);
      Axios.post(
        "http://localhost:8081/deleteroom",
        { room_id: item.room_id },
        {
          headers: {
            authorization: this.$store.state.user_token
          }
        }
      )
        .then(res => (this.rooms = res.data))
        .catch(err => console.log(err));
    },
    removeBooking(item) {
      Axios.post(
        "http://localhost:8081/deletebooking",
        { booking_id: item.booking_id },
        {
          headers: {
            authorization: this.$store.state.user_token
          }
        }
      )
        .then(res => (this.booking = res.data))
        .catch(err => console.log(err));
    }
  }
};
</script>