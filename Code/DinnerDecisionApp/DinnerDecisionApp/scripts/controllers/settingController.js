angular.module('dinnerDecisionApp')
.controller('settingController', function ($scope, restaurantGroupService) {

    $scope.clearSavedData = function () {
        restaurantGroupService.delAll();
    };
});