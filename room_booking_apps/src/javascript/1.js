const { Client } = require('pg')
const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'postgres',
    password: 'admin'
  })

client.connect()
// client.query("drop type if exists roles")
client.query("create type if not exists roles as enum ('member','admin')", (err, res) => {
    if (err){
        return;
    }
})
client.query("create table if not exists users( \
user_id int primary key not null,\
username varchar(50) not null,\
password varchar(50) not null,\
role roles not null)" , (err,res) => {
    if (err) {
        console.error(err)
        return;
    }
    console.log("success")
})

client.query("create table if not exists rooms(\
room_id int primary key not null,\
name varchar(50) not null,\
description varchar(100),\
capacity int not null,\
assets varchar(100) not null\
)")

client.query("select * from users", (err, res) => {
    console.log(err)
    console.log(res.rows)
})

// console.log("sebelum di end ======")
// client.end()