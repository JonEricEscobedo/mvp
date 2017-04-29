var express = require('express');
var app = express();
var API = require('./src/config/config.js');
var request = require('request');
var Weather = require('./database/index.js');

app.use(express.static('./'))

app.get('/', function(req, res) {
  res.send('Hello World, up and running!');
});

app.post('/weather', function(req, res) {
  console.log('Inside POST /weather');

  function getRequest(url) {
    return new Promise(function (success, failure) {
      request(url, function (error, response, body) {
        if (error) {
          throw error;
        } else {
          success(body);
        }
      });
    });
  }

  getRequest('https://ipinfo.io/json').then(function (body1) {
      // do something with body1
      console.log(body1);
      return getRequest(`https://api.darksky.net/forecast/${API.KEY}/37.8267,-122.4233?exclude=minutely,hourly,flags`);
  }).then(function (body2) {
      // do something with body2
      console.log(body2);
  })

  // request({
  //   method: 'GET',
  //   uri: 'https://ipinfo.io/json'
  // }, function(error, response, data) {
  //   let parsedData = JSON.parse(data);
  //   console.log(parsedData.city, parsedData.region, parsedData.loc)
  // })

  // request({ // Dark Sky API Call
  //   method: 'GET',
  //   uri: `https://api.darksky.net/forecast/${API.KEY}/37.8267,-122.4233?exclude=minutely,hourly,flags`
  // }, function(error, response, body) {
  //   if (error) {
  //     throw error;
  //   } else {
  //     var parsedBody = JSON.parse(body);
  //     var currentCity;
  //     var currentTemperature = Math.floor(parsedBody.currently.temperature);
  //     var currentSummary = parsedBody.currently.summary;
  //     var currentDate = parsedBody.currently.time;
  //     var currentWeather = new Weather(
  //     {
  //       city: 'Oakland',
  //       temp: currentTemperature,
  //       summary: currentSummary,
  //       date: currentDate
  //     });

  //     currentWeather.save(function(errror, response) {
  //       if (error) {
  //         throw error;
  //       } else {
  //         console.log('Saved!', response);
  //       }
  //     });
  //   }
  // })

  res.end();
});

app.get('/weather', function(req, res) {
  console.log('Inside GET /weather');

  Weather.find({}, function(error, response) {
    if (error) {
      throw error;
    } else {
      return res.send(response);
    }
  });
});


app.listen(1337, function() {
  console.log('Now listening on port 1337!');
});
