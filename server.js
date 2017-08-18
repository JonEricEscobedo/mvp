const express = require('express');
const app = express();
const DARK_KEY = process.env.DARK_KEY || require('./src/config/config.js').DARK_KEY;
const request = require('request');
const Weather = require('./database/index.js');
const bodyParser = require('body-parser');
let PORT = process.env.PORT || 1337;
let currentLoc;
let currentCity;
let currentState;
let currentWeatherInfo = {};

app.use(bodyParser.json());
app.use(express.static('./'))


// Start of app.post to /weather
app.post('/weather', function(req, res) {
  console.log('Inside POST /weather');

  let getRequest = (url) => {
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

  let currentLoc = req.body.location;
  getRequest(`https://api.darksky.net/forecast/${DARK_KEY}/${currentLoc}?exclude=minutely,hourly,flags`) // Dark Sky API Cal
  .then((weatherData) => {
    currentWeatherInfo.darkSky = JSON.parse(weatherData);
    res.end(JSON.stringify(currentWeatherInfo));
  });
  
}); // End of app.post to /weather


// Start of /search function
app.post('/search', function(req, res) {
  console.log('Inside POST /search');
  let zipCode = req.body.zip;

  let getRequest = (url) => {
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

  getRequest(`http://api.zippopotam.us/us/${zipCode}`)
  .then(function (data1) {
    let zipLocation = JSON.parse(data1)
    let requestedLat = zipLocation.places[0].latitude;
    let requestedLon = zipLocation.places[0].longitude;

    currentWeatherInfo.ipinfo = {
      city: zipLocation.places[0]['place name'],
      state: zipLocation.places[0].state
    };

    return getRequest(`https://api.darksky.net/forecast/${DARK_KEY}/${requestedLat},${requestedLon}?exclude=minutely,hourly,flags`); // Dark Sky API Call
  })
  .then(function (data2) { // Dark Sky API data
    currentWeatherInfo.darkSky = JSON.parse(data2);

    // MongoDB services here...
    let currentWeather = new Weather(
      {
        city: currentWeatherInfo.ipinfo.city,
        state: currentWeatherInfo.ipinfo.state,
        temperature: currentWeatherInfo.darkSky.currently.temperature,
        summary: currentWeatherInfo.darkSky.currently.summary,
        date: currentWeatherInfo.darkSky.currently.time
      }
    );

    currentWeather.save(function(error, response) {
      if (error) {
        console.log('Dup entry detected - not saving to MongoDB...');
      } else {
        console.log('Saved!');
      }
    });
  })
  .then(function() {
    Weather.find({}, function(error, response) {
      if (error) {
        throw error;
      } else {
        currentWeatherInfo.history = response;
        res.end(JSON.stringify(currentWeatherInfo));
      }
    }).sort({_id: -1});
  });
    
}); // End of app.post to /search


app.listen(PORT, function() {
  console.log('Now listening on port 1337!');
});
