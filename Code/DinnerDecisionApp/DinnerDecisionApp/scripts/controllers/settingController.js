angular.module('dinnerDecisionApp')
.controller('settingController', function ($scope, restaurantService) {

    $scope.clearSavedData = function () {
        restaurantService.delAll();
    };
});