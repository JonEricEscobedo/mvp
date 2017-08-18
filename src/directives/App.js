angular.module('weather-go', [])

.directive('app', function() {
  return {
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function($http) {

      this.weather;
      this.fiveDay;
      this.history;
      this.icon;

      // Search for Weather Based on Zip Code
      this.search = (query) => {
        let context = this;
        let currentLoc = null;
  
        $http.post( '/search', {zip: query} )
        .then(function successCallback(body) {
          console.log('Sucessful Search request', body);
          context.weather = body.data;
          context.fiveDay = body.data.darkSky.daily.data;
          context.history = body.data.history;
        }, function errorCallback(error) {
          console.log('Error in GET request', error);
        })
      } // End of Search

      // Get Weather at Current Location
      this.getWeather = () => {  
        let context = this;
        $http({
          method: 'GET',
          url: 'https://ipinfo.io/json'
        })
        .then((loc) => {
          let location = loc.data
          context.weather = {
            ipinfo: {
              city: location.city,
              state: location.region
            },
            darkSky: {}
          }
          currentLoc = location.loc;
          
        })
        .then(() => {
          $http.post( '/weather', {location: currentLoc} )
          .then((weather) => {
            let currentWeather = weather.data.darkSky;
            context.weather.darkSky = currentWeather;
            context.icon = currentWeather.currently.icon;
            context.fiveDay = weather.data.darkSky.daily.data;
            console.log(context.icon, context.weather)

              let skycons = new Skycons({
                "monochrome": false,
                "colors": {
                  "main": "#333333",
                  "moon": "#78586F",
                  "fog": "#78586F",
                  "fogbank": "#B4ADA3",
                  "cloud": "#B4ADA3",
                  "snow": "#7B9EA8",
                  "leaf":"#7B9EA8",
                  "rain": "#7B9EA8",
                  "sun": "#FF8C42"
                } 
              });
            // console.log(skycons, context.icon)
            skycons.add('icon1', context.icon);
            skycons.play();
          });
        });
      } // End of Current Location Weather Fetch

      this.getWeather(); // Get weather on page load

    },
    templateUrl: '/src/templates/App.html'
  }
})