const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/my-db");
const nameSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const User = mongoose.model("User", nameSchema);

const server = express();
// tidies up the request object.
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(__dirname + '/public'));
server.set("view engine", "ejs");
// post

server.post("/addname", (req, res) => {
  const insertedData = new User(req.body);
  insertedData.save(function (err) {
    if (err) return console.error(err);
    res.send("User successfully added to DB!");
    console.log(req.body + "Saved to database.");
  });
});

// get

server.get("/hi", async (req, res) => {

  const readData = await User.find({});
  /*
  try {
    res.send(readData);
  } catch (err) {
    return console.error(err);
  }
  */
  res.render("index.ejs", {userList: readData})
});

server.listen(3000, () => {
  console.log(`Server listening on port 3000!`)
});