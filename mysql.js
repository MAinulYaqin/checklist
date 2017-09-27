"use strict";

const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");
const connection = mysql.createConnection({
  host: "localhost",
  database: "TodoApp",
  user: "root",
  password: "",
  port: 13306
});
const PORT = 2017;

// take this before the handling server function IMPORTANT
app.use(bodyParser.urlencoded({
  extended: false
}));

// setup view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname + "view"));

app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/js"));

// Serving main page
app.get("/", (req, res) => {
  connection.query('SELECT * FROM imaginary', (err, row, field) => {
    if (err) throw err

    res.render(path.join(__dirname + "/view/index.hbs"), {
      items: row
    });
  })
});

app.post("/", (req, res) => {
  let data = {
    name: req.body.name,
    option: req.body.option
  };
  connection.query("INSERT INTO imaginary SET ?", data, function (err, row) {
    if (err) console.error(err);

    console.log(row);
    res.redirect("/");
  });
});

app.post('/update', (req, res) => {
  let data = {
    name: req.body.name,
    option: req.body.option
  }
  connection.query("UPDATE imaginary SET ? WHERE ?", [{
    option: data.option
  }, {
    name: data.name
  }], (err, field) => {
    if (err) throw err

    console.log(field)
    res.redirect('/')
  })
})

app.listen(PORT || process.env.PORT, () => {
  console.log("http://localhost:" + PORT);
});