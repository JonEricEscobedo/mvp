angular.module('weather-go', [])

.directive('app', function() {
  return {
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function($http) {

      this.weather;
      this.fiveDay;

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
        }, function errorCallback(error) {
          console.log('Error in GET request', error);
        })
      }

      // Get Weather at Current Location
      this.getWeather = () => {  
        // this.weather;
        // this.fiveDay;
        var context = this;
        $http({
          method: 'POST',
          url: '/weather'
        })
        .then(function successCallback(body) {
          console.log('Successful GET request');

          context.weather = body.data;
          context.fiveDay = body.data.darkSky.daily.data;
        }, function errorCallback(error) {
          console.log('Error in GET request', error);
        });
      }
      this.getWeather();

    },
    templateUrl: '/src/templates/App.html'
  }
})