const express = require('express');
const app = express();
const API = require('./src/config/config.js');
const request = require('request');
const Weather = require('./database/index.js');
const bodyParser = require('body-parser');

let currentLoc;
let currentCity;
let currentState;
let weatherInfo = {};

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
    weatherInfo.ipinfo = {
      city: currentCity,
      state: currentState
    }
    return getRequest(`https://api.darksky.net/forecast/${API.KEY}/${currentLoc}?exclude=minutely,hourly,flags`); // Dark Sky API Call
  })
  .then(function (data2) { // Dark Sky API data
    weatherInfo.darkSky = JSON.parse(data2);
    
    // MongoDB services here...
    // let currentTemperature = Math.floor(weatherInfo.currently.temperature);
    // let currentSummary = weatherInfo.currently.summary;
    // let currentDate = weatherInfo.currently.time;
    // let currentWeather = new Weather(
    //   {
    //     city: currentCity,
    //     state: currentState,
    //     temperature: currentTemperature,
    //     summary: currentSummary,
    //     date: currentDate
    //   }
    // );

    // currentWeather.save(function(error, response) {
    //   if (error) {
    //     console.log('Dup entry detected - not saving to MongoDB...');
    //   } else {
    //     console.log('Saved!');
    //   }
    // });

    res.end(JSON.stringify(weatherInfo));
  });

}); // End of app.post to /weather

app.post('/search', function(req, res) {
  console.log('Inside POST /search');
  console.log(req.body)

  // function getRequest(url) {
  //   return new Promise(function (success, failure) {
  //     request(url, function (error, response, body) {
  //       if (error) {
  //         throw error;
  //       } else {
  //         success(body);
  //       }
  //     });
  //   });
  // }

  // getRequest('https://ipinfo.io/json') // Ipinfo API Call
  // .then(function (data1) { // Ipinfo API data
  //   let ipLocation = JSON.parse(data1);
  //   currentLoc = ipLocation.loc;
  //   currentCity = ipLocation.city;
  //   currentState = ipLocation.region;
  //   weatherInfo.ipinfo = {
  //     city: currentCity,
  //     state: currentState
  //   }
  //   return getRequest(`https://api.darksky.net/forecast/${API.KEY}/${currentLoc}?exclude=minutely,hourly,flags`); // Dark Sky API Call
  // })
  // .then(function (data2) { // Dark Sky API data
  //   weatherInfo.darkSky = JSON.parse(data2);
    
  //   // MongoDB services here...
  //   // let currentTemperature = Math.floor(weatherInfo.currently.temperature);
  //   // let currentSummary = weatherInfo.currently.summary;
  //   // let currentDate = weatherInfo.currently.time;
  //   // let currentWeather = new Weather(
  //   //   {
  //   //     city: currentCity,
  //   //     state: currentState,
  //   //     temperature: currentTemperature,
  //   //     summary: currentSummary,
  //   //     date: currentDate
  //   //   }
  //   // );

  //   // currentWeather.save(function(error, response) {
  //   //   if (error) {
  //   //     console.log('Dup entry detected - not saving to MongoDB...');
  //   //   } else {
  //   //     console.log('Saved!');
  //   //   }
  //   // });

    // res.end(JSON.stringify(weatherInfo));
    res.end();
  // });

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
