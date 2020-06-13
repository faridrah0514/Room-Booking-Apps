const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mysql = require("mysql");
const { users } = require("./public/users");
const { rooms } = require("./public/rooms");
const { booking } = require("./public/booking");
const jwt = require("jsonwebtoken");

const db_config = {
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "room_booking_apps",
};

const db = mysql.createConnection(db_config);

db.connect((err) => {
  if (err) throw err;
});

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (token == null) {
    console.log("ga ada token");
    return res.sendStatus(401);
  }

  jwt.verify(token, "secret1", (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: "success",
  });
});

app.get("/users", authenticateToken, (req, res) => {
  db.query("select * from users", (err, result) => {
    if (err) throw err;
    res.json(JSON.parse(JSON.stringify(result)));
  });
});

app.post("/users", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    `select * from users where username='${username}' and password='${password}'`,
    function (err, result, fields) {
      if (err) throw err;
      const [queried_user] = JSON.parse(JSON.stringify(result));
      // console.log(queried_user);
      if (queried_user) {
        const token = jwt.sign(username, "secret1");
        res.json({
          status: "success",
          username: queried_user.username,
          role: queried_user.role,
          user_id: queried_user.user_id,
          jwt_token: token,
        });
      } else {
        res.json({
          status: "failed",
        });
      }
    }
  );
});

app.get("/rooms", authenticateToken, (req, res) => {
  db.query("select * from rooms", (err, result) => {
    if (err) throw err;
    res.json(JSON.parse(JSON.stringify(result)));
  });
});

app.post("/booking", authenticateToken, (req, res) => {
  console.log(req.body);
  const date = req.body.date;
  const time = req.body.time.split(":")[0];
  db.query(
    `select rooms.room_id from booking join rooms on booking.room_id=rooms.room_id where booking.date='${date}' and booking.time=${time}`,
    (err, result) => {
      if (err) throw err;
      var new_result = JSON.parse(JSON.stringify(result));
      new_result = new_result.map((item) => item.room_id);
      if (new_result.length > 0) {
        db.query(`select * from rooms where room_id not in (?)`, [new_result], (err, result) => {
          if (err) throw err
          res.json(JSON.parse(JSON.stringify(result)));
        })
      } else {
        db.query("select * from rooms", (err, result) => {
          if (err) throw err
          res.json(JSON.parse(JSON.stringify(result)))
        })
      }

    }
  );
});

app.get("/booking/:user_id", authenticateToken, (req, res) => {
  const user_id = req.params.user_id;
  const query = `select booking.room_id, booking.user_id, booking.date, booking.time, rooms.name, rooms.description, rooms.capacity, rooms.assets from booking inner join rooms on booking.room_id=rooms.room_id where booking.user_id=${user_id}`;
  db.query(query, (err, result) => {
    if (err) throw err;
    const room = JSON.parse(JSON.stringify(result));
    // console.log(room)
    res.json(room);
  });
});

app.get("/roomsearch", authenticateToken, (req, res) => {
  db.query("select * from rooms", (err, result) => {
    if (err) throw err;
    res.json(JSON.parse(JSON.stringify(result)));
  });
});

app.post("/adduser", authenticateToken, (req, res) => {
  var user_detail = req.body;
  const query = `select * from users where username='${user_detail.username}'`;
  db.query(query, (err, result) => {
    if (err) throw err;
    const query_result = JSON.parse(JSON.stringify(result));
    // console.log(query_result);
    if (query_result.length > 0) {
      res.json({
        status: "error",
        message: "User already exist",
      });
    } else {
      db.query(
        `insert into users (username, password, role) values ('${user_detail.username}', '${user_detail.password}', '${user_detail.role}')`,
        (err, result) => {
          if (err) throw err;
          // console.log("ini");
          // console.log(result);
        }
      );

      db.query("select * from users", (err, result) => {
        if (err) throw err;
        // console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.parse(JSON.stringify(result)));
      });
    }
  });
});

app.post("/register", (req, res) => {
  var user_detail = req.body;
  const query = `select * from users where username='${user_detail.username}'`;
  db.query(query, (err, result) => {
    if (err) throw err;
    const query_result = JSON.parse(JSON.stringify(result));
    // console.log(query_result);
    if (query_result.length > 0) {
      res.json({
        status: "error",
        message: "User already exist",
      });
    } else {
      db.query(
        `insert into users (username, password, role) values ('${user_detail.username}', '${user_detail.password}', '${user_detail.role}')`,
        (err, result) => {
          if (err) throw err;
          console.log("ini");
          console.log(result);
        }
      );

      db.query("select * from users", (err, result) => {
        if (err) throw err;
        // console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.parse(JSON.stringify(result)));
      });
    }
  });
});

app.post("/deleteuser", authenticateToken, (req, res) => {
  db.query(
    `delete from users where user_id=${req.body.user_id}`,
    (err, result) => {
      if (err) throw err;
      db.query(
        `delete from booking where user_id=${req.body.user_id}`,
        (err, result) => {
          if (err) throw err;
          console.log(result);
        }
      );

      db.query("select * from users", (err, result) => {
        if (err) throw err;
        res.json(JSON.parse(JSON.stringify(result)));
      });
    }
  );
});

app.post("/addroom", authenticateToken, (req, res) => {
  db.query(
    `select * from rooms where name='${req.body.roomName}'`,
    (err, result) => {
      if (err) throw err;
      const query_result = JSON.parse(JSON.stringify(result));
      // console.log(query_result)
      if (query_result.length > 0) {
        res.json({
          status: "error",
          message: "room already exist",
        });
      } else {
        db.query(
          `insert into rooms (name, description, capacity, assets) values ('${
            req.body.roomName
          }', '${req.body.description}', ${
            req.body.capacity
          }, '${req.body.assets.join(", ")}')`,
          (err, result) => {
            if (err) throw err;
            console.log("room added");
          }
        );

        db.query("select * from rooms", (err, result) => {
          if (err) throw err;
          // console.log(JSON.parse(JSON.stringify(result)))
          res.json(JSON.parse(JSON.stringify(result)));
        });
      }
    }
  );
});

app.post("/deleteroom", authenticateToken, (req, res) => {
  // console.log(req.body);
  db.query(
    `delete from rooms where room_id=${req.body.room_id}`,
    (err, result) => {
      if (err) throw err;

      db.query(
        `delete from booking where room_id=${req.body.room_id}`,
        (err, result) => {
          if (err) throw err;
          console.log(result);
        }
      );

      db.query("select * from rooms", (err, result) => {
        if (err) throw err;
        res.json(JSON.parse(JSON.stringify(result)));
      });
    }
  );
});

app.post("/bookroom", authenticateToken, (req, res) => {
  db.query(`insert into booking (user_id, date, time, room_id) values (${req.body.user_id}, '${req.body.date}', '${req.body.time}', ${req.body.room_id})`, (err, result) => {
    if (err) throw err
    res.json({"status":"success"})
  })
})

app.get("/bookinglist", authenticateToken, (req, res) => {
  db.query("select booking.booking_id, users.username, booking.date, booking.time, rooms.name from booking inner join rooms on booking.room_id=rooms.room_id inner join users on booking.user_id=users.user_id", (err, result) => {
    if (err) throw err
    res.json(JSON.parse(JSON.stringify(result)))
  })
})

app.post("/deletebooking", authenticateToken, (req,res) => {
  db.query(`delete from booking where booking_id=${req.body.booking_id}`,
  (err, result) => {
    if (err) throw err
    db.query("select booking.booking_id, users.username, booking.date, booking.time, rooms.name from booking inner join rooms on booking.room_id=rooms.room_id inner join users on booking.user_id=users.user_id", (err, result) => {
      if (err) throw err
      res.json(JSON.parse(JSON.stringify(result)))
    })
  })
})

app.listen(8081, console.log("server runs in port 8081"));
