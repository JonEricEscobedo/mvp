const express = require('express');
const app = express();
const API = require('./src/config/config.js');
const request = require('request');
const Weather = require('./database/index.js');
let fiveDay = {};
let currentLoc;
let currentCity;
let currentState;

app.use(express.static('./'))

// app.get('/', function(req, res) {
//   res.send('Hello World, up and running!');
// });

// Start of app.post to /weather
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

  getRequest('https://ipinfo.io/json') // Ipinfo API Call
  .then(function (data1) { // Ipinfo API data
    let parsedData1 = JSON.parse(data1);
    currentLoc = parsedData1.loc;
    currentCity = parsedData1.city;
    currentState = parsedData1.region;
    return getRequest(`https://api.darksky.net/forecast/${API.KEY}/${currentLoc}?exclude=minutely,hourly,flags`); // Dark Sky API Call
  })
  .then(function (data2) { // Dark Sky API data
    let parsedData2 = JSON.parse(data2);
    let currentTemperature = Math.floor(parsedData2.currently.temperature);
    let currentSummary = parsedData2.currently.summary;
    let currentDate = parsedData2.currently.time;
    let currentWeather = new Weather(
      {
        city: currentCity,
        state: currentState,
        temperature: currentTemperature,
        summary: currentSummary,
        date: currentDate
      }
    );

    currentWeather.save(function(error, response) {
      if (error) {
        console.log('Dup entry detected - not saving to MongoDB...');
      } else {
        console.log('Saved!');
      }
    });

    fiveDay.today = parsedData2.daily.data[0];
    fiveDay.day2 = parsedData2.daily.data[1];
    fiveDay.day3 = parsedData2.daily.data[2];
    fiveDay.day4 = parsedData2.daily.data[3];
    fiveDay.day5 = parsedData2.daily.data[4];
  });

  res.end(JSON.stringify(fiveDay));
}); // End of app.post to /weather


// Start of app.get to /weather
app.get('/weather', function(req, res) {
  console.log('Inside GET /weather');

  Weather.find({}, function(error, response) {
    if (error) {
      throw error;
    } else {
      return res.send(response);
    }
  })
  .sort({'date': -1});
}); // End of app.get to /weather


app.listen(1337, function() {
  console.log('Now listening on port 1337!');
});
