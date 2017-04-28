angular.module('weather-go', [])

.directive('app', function() {
  return {
    controllerAs: 'ctrl',
    bindToController: true,
    controller: ($http) => {
      this.fetchWeather = () => {
        $http({
          method: 'POST',
          url: '/weather'
        })
        .then(function successCallback(response) {
          console.log('Successful POST request');
        }, function errorCallback(error) {
          console.log('Error in POST request');
        });
      }
      this.fetchWeather();
    },
    templateUrl: '/src/templates/App.html'
  }
})