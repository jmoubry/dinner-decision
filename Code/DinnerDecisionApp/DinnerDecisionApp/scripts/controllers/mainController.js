angular.module('dinnerDecisionApp')
.controller('mainController', function ($scope, $location, modelService) {
    $scope.restart = function () {
        modelService.clearModel();
        $location.path('/');
    }
});