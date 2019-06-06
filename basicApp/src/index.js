var express = require('express');
var app = express();
app.listen(9090, () => {console.log("Service running in port 9090")});
app.get("/basicApp", (req, res, next) => {
  res.json('The names are '["Uma", "Shankar", "Divya", "Vilo"]);
  res.json('success message')
}
);
