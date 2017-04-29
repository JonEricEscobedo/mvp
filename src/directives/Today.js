angular.module('weather-go')

.directive('today', function() {
  return {
    scope: {
      currentWeather: '<'
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {
      
    },
    templateUrl: '/src/templates/Today.html'
  }
})