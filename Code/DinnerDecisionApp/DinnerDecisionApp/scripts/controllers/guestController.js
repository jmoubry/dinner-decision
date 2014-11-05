angular.module('dinnerDecisionApp')
.controller('guestController', function ($scope, $routeParams) {
    $scope.guestNumber = $routeParams.guestNumber;
});