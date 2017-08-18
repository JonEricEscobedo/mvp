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

      // Search for Weather Based on Zip Code
      this.search = (query) => {
        var context = this;
        $http({
          method: 'POST',
          url: '/search',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: query
        })
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
        .then((success) => {
          console.log(success);
        })
        // var context = this;
        // $http({
        //   method: 'POST',
        //   url: '/weather'
        // })
        // .then(function successCallback(body) {
        //   console.log('Successful GET request');
        //   context.weather = body.data;
        //   context.fiveDay = body.data.darkSky.daily.data;
        // }, function errorCallback(error) {
        //   console.log('Error in GET request', error);
        // });
      } // End of Current Location Weather Fetch

      this.getWeather(); // Get weather on page load

    },
    templateUrl: '/src/templates/App.html'
  }
})