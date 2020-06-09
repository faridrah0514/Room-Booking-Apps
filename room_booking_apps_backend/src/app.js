const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { users } = require("./public/users");
const { rooms } = require('./public/rooms')
const { booking } = require('./public/booking')

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: "success",
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const [queried_user] = users.filter(
    (user) => user.username === username && user.password === password
  );
  if (queried_user) {
    res.json({
      status: "success",
      username: queried_user.username,
      role: queried_user.role,
      user_id: queried_user.user_id
    });
  } else {
    res.json({
      status: "failed",
    });
  }
});

app.get('/rooms', (req, res) => {
  res.json(rooms)
})

app.get('/booking', (req, res) => {
  res.json(booking)
})

app.get('/booking/:user_id', (req, res) => {
  const user_id = req.params.user_id
  const room = booking.filter(item => item.user_id == user_id)
  if (room){
    for (i = 0; i < room.length; i++ ){
      room[i].room_detail = rooms.filter(item => item.room_id == room[i].room_id)
    }
  }
  res.json(room)
})

app.get('/roomsearch', (req, res) => {
  const new_rooms = rooms
  new_rooms.forEach(item => {
    item.booking_detail = booking.filter(booking_item => booking_item.room_id == item.room_id)
  })
  console.log(new_rooms)
  res.json(new_rooms)
})

app.post('/adduser', (req, res) => {
  var user_detail = req.body
  const uid = users.map(item => item.user_id)
  const new_uid = Math.max(...uid) + 1
  user_detail.user_id = new_uid
  console.log(user_detail)
  users.push(user_detail)
  res.json(users)
})

app.listen(8081, console.log("server runs in port 8081"));

