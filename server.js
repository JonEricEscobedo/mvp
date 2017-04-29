const express = require('express');
const app = express();
const API = require('./src/config/config.js');
const request = require('request');
const Weather = require('./database/index.js');
const bodyParser = require('body-parser');

let currentLoc;
let currentCity;
let currentState;
let currentWeatherInfo = {};

app.use(bodyParser.urlencoded({ extended: true }));
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
    let ipLocation = JSON.parse(data1);
    currentLoc = ipLocation.loc;
    currentCity = ipLocation.city;
    currentState = ipLocation.region;
    currentWeatherInfo.ipinfo = {
      city: currentCity,
      state: currentState
    }
    return getRequest(`https://api.darksky.net/forecast/${API.DARK_KEY}/${currentLoc}?exclude=minutely,hourly,flags`); // Dark Sky API Call
  })
  .then(function (data2) { // Dark Sky API data
    currentWeatherInfo.darkSky = JSON.parse(data2);
    res.end(JSON.stringify(currentWeatherInfo));
  });

}); // End of app.post to /weather

app.post('/search', function(req, res) {
  console.log('Inside POST /search');
  let zipCode = Object.keys(req.body)[0];

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

  getRequest(`http://api.zippopotam.us/us/${zipCode}`)
  .then(function (data1) {
    let zipLocation = JSON.parse(data1)
    let requestedLat = zipLocation.places[0].latitude;
    let requestedLon = zipLocation.places[0].longitude;
    currentWeatherInfo.ipinfo = {
      city: zipLocation.places[0]['place name'],
      state: zipLocation.places[0].state
    };
    return getRequest(`https://api.darksky.net/forecast/${API.DARK_KEY}/${requestedLat},${requestedLon}?exclude=minutely,hourly,flags`); // Dark Sky API Call
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

    res.end(JSON.stringify(currentWeatherInfo));
  });
    


}); // End of app.post to /weather


// Start of app.get to /weather
// app.get('/weather', function(req, res) {
//   console.log('Inside GET /weather');

//   Weather.find({}, function(error, response) {
//     if (error) {
//       throw error;
//     } else {
//       return res.send(response);
//     }
//   })
//   .sort({'date': -1});
// }); // End of app.get to /weather


app.listen(1337, function() {
  console.log('Now listening on port 1337!');
});
