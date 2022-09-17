const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

var server = express();

server.use(express.static(__dirname + '/public'));

server.listen(3000, () => {
  console.log(`Server listening on port 3000!`)
});