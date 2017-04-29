angular.module('weather-go')

.directive('search', function() {
  return {
    scope: {
      search: '<'
    },
    restrict: 'E',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {
      this.onClick = function() {
        this.search(this.query);
      }
    },
    templateUrl: '/src/templates/Search.html'
  }
})