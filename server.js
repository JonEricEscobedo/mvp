var express = require('express');
var app = express();
var API = require('./src/config/config.js');
var request = require('request');

app.use(express.static('./'))

app.get('/', function(req, res) {
  res.send('Hello World, up and running!');
});

app.post('/weather', function(req, res) {
  console.log('Inside /weather');
  request({
    method: 'GET',
    uri: `https://api.darksky.net/forecast/${API.KEY}/37.8267,-122.4233?exclude=minutely,hourly,flags`
  }, function(error, response, body) {
    console.log(body);
  })

  res.end();
});

app.listen(1337, function() {
  console.log('Now listening on port 1337!');
});