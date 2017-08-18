angular.module('weather-go')

.directive('today', function() {
  return {
    scope: {
      weather: '<',
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {

    },
    templateUrl: '/src/templates/Today.html'
  }
})