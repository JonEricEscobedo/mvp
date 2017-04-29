angular.module('weather-go', [])

.directive('app', function() {
  return {
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function($http) {

      this.search = (query) => {
        $http({
          method: 'POST',
          url: '/search',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: query
        })
        .then(function successCallback(body) {
          console.log('fuck yeah')
        })
      }

      // Get Weather at Current Location
      this.getWeather = () => {  
        this.weather;
        this.fiveDay;
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
          console.log('Error in GET request');
        });
      }
      this.getWeather();

    },
    templateUrl: '/src/templates/App.html'
  }
})