//import dbFile from './dbFile';

var express = require('express');
var app = express();
app.listen(9090, () => {console.log("Service running in port 9090")});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var date = require('./modules/dateModule')
var rnd = require('./modules/randomGen')
var msg = require('./modules/dbFile.js')
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var readline = require('readline');
//var readLine = require('line-reader');

app.get("/basicApp/list_1", (req, res, next) => {
  //res.json('The names are '["Uma", "Shankar", "Divya", "Vilo"]);
  var msg = require('./modules/dbFile.js')
  res.json(msg.name01)
  console.log("response list_1 sent")
});

app.get("/basicApp/list_2", (req, res, next) => {
  //res.json('The names are '["Uma", "Shankar", "Divya", "Vilo"]);
  res.json(msg.name02)
  console.log("response list_2 sent")
});

app.get("/basicApp/list_3", (req, res, next) => {
  //res.json('The names are '["Uma", "Shankar", "Divya", "Vilo"]);
  res.json(msg.name03)
  console.log("response list_3 sent")
});
//readfile
app.get("/basicApp/readFile", (req, res, next) =>{
var data = fs.readFileSync('./files/fileText.txt', 'utf8');
res.send(data)
console.log(data)
});
//get request response with an HTML page
app.get("/basicApp/postRequest", (req, res, next) => {
console.log("This is response to your POST request");
//var date = new date();
console.log(date.dateModule());
res.sendFile('/Users/uma/github/sampleApps/basicApp/src/html/homePage.html');
});
//post request to get the input Users and write to a file
app.post("/submitDataToFile", (req, res) => {
//var date = new Date();
console.log(date.dateModule());
//var timeStamp = date.timeStamp();


var name = req.body.firstName + '' + req.body.lastName;
res.send(name+ '\r\n'+ 'submitted successfully');

console.log('about to write to a file');
fs.appendFile('./files/submitData.txt', '\r\n' + '' +
'ID = '+ rnd.randomNumber() +
'\r\n' + 'FirstName = ' + req.body.firstName +
'\r\n' + 'SecondName = ' + req.body.lastName +
'\r\n' + date.dateModule(), function (err)
{
  if(err)
  console.log(err);
  else
  console.log('Append/Write operation complete');
}
);
})

app.get("/retrieveData", (req, res, next) => {
//var data = fs.readFileSync('./files/submitData.txt', 'utf8')
//res.send(data);
res.sendFile('/Users/uma/github/sampleApps/basicApp/src/files/submitData.txt');
})

app.get("/retrieveLine", (req, res, next) => {
  //var lineRead = readline('/Users/uma/github/sampleApps/basicApp/src/files/submitData.txt');
  var myInterface = readline.createInterface({
    input: fs.createReadStream('/Users/uma/github/sampleApps/basicApp/src/files/submitData.txt')
  });
  var lineno = 0;
  res.send('response worked')
  myInterface.on('line', function(line){
    lineno++;
    console.log('line number' + ':' + lineno +':'+ line);
    //line.split(=)
  });
  /*readLine.open('./files/submitData.txt', function (err, reader) {
    if(err){console.log('error')}
    if (reader.hasNextLine()){
      reader.nextLine(function(line){
          console.log('we are inside nextline function' + line);
        }
    )}
    else {
      console.log('end of file');
    }
  });*/
})


app.post("/submitDataToDB", (req, res) => {
//var date = new Date();
console.log(date.dateModule());
//var timeStamp = date.timeStamp();
var name = req.body.firstName + '' + req.body.lastName;
res.send(name+ '\r\n'+ 'submitted successfully');

console.log('about to write to a DB');

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
if (!err){
console.log("DB Connected");
var dbo = db.db("mydb");
var myDoc = {ID: rnd.randomNumber(), FirstName: req.body.firstName, SecondName: req.body.lastName, Date: date.dateModule() }
console.log("the value is" + myDoc);
dbo.collection("customers").insertOne(myDoc, function (err, res){
  if (err) throw err;
  console.log("Number of records inserted" + res.insertedCount);
  db.close();
});
}
});

});
