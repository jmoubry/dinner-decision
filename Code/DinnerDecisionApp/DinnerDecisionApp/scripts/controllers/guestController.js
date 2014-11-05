angular.module('dinnerDecisionApp')
.controller('guestController', function ($scope, $routeParams, modelService) {
    $scope.guestNumber = $routeParams.guestNumber;
    modelService.setCurrentGuestNumber(parseInt($routeParams.guestNumber));
});