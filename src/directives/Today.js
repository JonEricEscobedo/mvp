angular.module('weather-go')

.directive('today', function() {
  return {
    scope: {
      currentWeather: '<'
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: () => {
      console.log('inside today')
    },
    templateUrl: '/src/templates/Today.html'
  }
})