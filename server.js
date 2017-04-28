var express = require('express');
var app = express();
var API = require('./src/config/config.js');

app.use(express.static('./'))

app.get('/', function(req, res) {
  res.send('Hello World, up and running!');
});

app.post('/weather', function(req, res) {
  console.log('Inside /weather');
  res.end();
});

app.listen(1337, function() {
  console.log('Now listening on port 1337!');
});