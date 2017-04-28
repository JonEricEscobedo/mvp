var express = require('express');
var app = express();

app.use(express.static('./'))

app.get('/', function(req, res) {
  res.send('Hello World, up and running!');
});

app.listen(1337, function() {
  console.log('Now listening on port 1337!');
});