var express = require('express');
var mongo = require('mongodb');
var server = express();

var url = 'mongodb://localhost:27017/db-name'

server.use(express.static(__dirname + '/public'));

server.listen(3000, () => {
  console.log(`Server listening on port 3000`)
});