angular.module('weather-go')

.directive('history', function() {
  return {
    scope: {
      history: '<'
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {

    },
    templateUrl: '/src/templates/History.html'
  }
})