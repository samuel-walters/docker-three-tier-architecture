const express = require('express');
const mongo = require('mongodb');
const server = express();

const url = 'mongodb://localhost:27017/db-name'

server.use(express.static(__dirname + '/public'));

server.listen(3000, () => {
  console.log(`Server listening on port 3000!`)
});