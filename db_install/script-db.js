const mysql = require("mysql");
const { users } = require("./dummy-data/users");
const { rooms } = require("./dummy-data/rooms");
const { booking } = require("./dummy-data/booking");


var config = {
  host: "localhost",
  user: "admin",
  password: "admin",
};

const con = mysql.createConnection(config);

con.connect((err) => {
  if (err) throw err;
  console.log("connected");
  let sql = "create database if not exists room_booking_apps";
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("now creating table");
    config.database = "room_booking_apps";
    const db = mysql.createConnection(config);
    db.connect((err) => {
      if (err) throw err;
    //   console.log("terkoneksi di dalam callback dalam koneksi kedua");
      const users_table =
        "create table if not exists users(user_id int not null primary key auto_increment, username varchar(25) not null, password varchar(25) not null, role varchar(25) not null)";
      const rooms_table =
        "create table if not exists rooms(room_id int not null primary key auto_increment, name varchar(100) not null, description varchar(255), capacity int not null, assets varchar(100) not null)";
      const booking_table =
        "create table if not exists booking(booking_id int not null primary key auto_increment, user_id int not null, date varchar(25) not null, time varchar(25) not null, room_id int not null)";

      db.query(users_table, (err, result) => {
        if (err) throw err;
        console.log("users table created");
      });

      const user_data = users.map((item) => Object.values(item));
    //   console.log(user_data);
      db.query(
        "insert into users (user_id, username, password, role) values ?",
        [user_data],
        (err, result) => {
          if (err) throw err;
          console.log(result.affectedRows);
        }
      );

      db.query(rooms_table, (err, result) => {
        if (err) throw err;
        console.log("rooms table created");
      });

      const room_data = rooms.map((item) => {
        item.assets = item.assets.join(', ');
        return Object.values(item);
      });
    //   console.log(room_data);
      db.query(
        "insert into rooms (room_id, name, description, capacity, assets) values ?",
        [room_data],
        (err, result) => {
          if (err) throw err;
          console.log(result.affectedRows);
        }
      );

      db.query(booking_table, (err, result) => {
        if (err) throw err;
        console.log("booking table created");
      });

      const booking_data = booking.map(item => Object.values(item))
      db.query("insert into booking (booking_id, user_id, date, time, room_id) values ?",
      [booking_data], (err, result) => {
          if (err) throw err
          console.log(result.affectedRows)
      })


    //   db.query("select * from users", (err, result, fields) => {
    //       if (err) throw err
    //       console.log(result)
    //   })
      db.end();
    });
  });
  con.end();
});
