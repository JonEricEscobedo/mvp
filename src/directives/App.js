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
      };

      this.getWeather = () => {
        $http({
          method: 'GET',
          url: '/weather'
        })
        .then(function successCallback(response) {
          console.log('Successful GET request');
          let currentWeather = response.data[0];
          let currentCity = currentWeather.city;
          let currentTemperature = currentWeather.temp;
          let currentSummary = currentWeather.summary;

          console.log(currentCity, currentTemperature, currentSummary);

        }, function errorCallback(error) {
          console.log('Error in GET request');
        });
      }
      this.getWeather();
      // this.fetchWeather();
    },
    templateUrl: '/src/templates/App.html'
  }
})