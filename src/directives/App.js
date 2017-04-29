angular.module('weather-go', [])

.directive('app', function() {
  return {
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function($http) {

      this.fetchWeather = () => {
        this.fiveDayForecast;
        var context = this;
        $http({
          method: 'POST',
          url: '/weather'
        })
        .then(function successCallback(body) {
          console.log('Successful POST request');
          context.fiveDayForecast = body.data;
        }, function errorCallback(error) {
          console.log('Error in POST request');
        });
      };

      this.getWeather = () => {  
        this.currentWeather;
        var context = this;
        $http({
          method: 'GET',
          url: '/weather'
        })
        .then(function successCallback(body) {
          // console.log('inside success callback');
          context.currentWeather = body.data[0];
        }, function errorCallback(error) {
          console.log('Error in GET request');
        });
      }

      this.getWeather();
      this.fetchWeather();
    },
    templateUrl: '/src/templates/App.html'
  }
})