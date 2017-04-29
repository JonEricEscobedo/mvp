angular.module('weather-go')

.directive('forecast', function() {
  return {
    scope: {
      fiveDay: '<'
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