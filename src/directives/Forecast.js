angular.module('weather-go')

.directive('forecast', function() {
  return {
    scope: {
      fiveDayForecast: '<'
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {
      this.Math = window.Math;
    },
    templateUrl: '/src/templates/Forecast.html'
  }
})