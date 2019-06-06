//import dbFile from './dbFile';

var express = require('express');
var app = express();
app.listen(9090, () => {console.log("Service running in port 9090")});

app.get("/basicApp/list_1", (req, res, next) => {
  //res.json('The names are '["Uma", "Shankar", "Divya", "Vilo"]);
  var msg = require('./dbFile.js')
  res.json(msg.name01)
  console.log("response list_1 sent")
});

app.get("/basicApp/list_2", (req, res, next) => {
  //res.json('The names are '["Uma", "Shankar", "Divya", "Vilo"]);
  var msg = require('./dbFile.js')
  res.json(msg.name02)
  console.log("response list_2 sent")
});

app.get("/basicApp/list_3", (req, res, next) => {
  //res.json('The names are '["Uma", "Shankar", "Divya", "Vilo"]);
  var msg = require('./dbFile.js')
  res.json(msg.name03)
  console.log("response list_3 sent")
}

);
