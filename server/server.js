const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/my-db");
const nameSchema = new mongoose.Schema({
  firstName: String,
  lastNameName: String
});
const User = mongoose.model("User", nameSchema);

const server = express();

server.use(express.static(__dirname + '/public'));

server.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

server.listen(3000, () => {
  console.log(`Server listening on port 3000!`)
});