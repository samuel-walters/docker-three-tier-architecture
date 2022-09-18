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
  age: {
    type: Number,
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
  const re = /^[A-Za-z]+$/;
  const firstInput = insertedData.firstName;
  const secondInput = insertedData.secondName;
  const age = insertedData.age;
  const isnum = /^\d+$/.test(age);
  if (re.test(firstInput) && re.test(secondInput) && isnum) {
    if (age != null && age >= 18 && age <= 100) {
      insertedData.save(function (err) {
        if (err) return console.error(err);
          res.render("successful.ejs");
          console.log(insertedData.firstName + "Saved to database.");
      });
     } else {
       res.render("invalid_age.ejs");
     }
  } else {
    res.render("invalid_name.ejs");
  }
});

// get

server.get("/users", async (req, res) => {
  const readData = await User.find({});
  res.render("list.ejs", {userList: readData})
});

server.listen(3000, () => {
  console.log(`Server listening on port 3000!`)
});