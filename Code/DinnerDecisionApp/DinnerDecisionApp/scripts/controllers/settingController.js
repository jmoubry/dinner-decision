angular.module('dinnerDecisionApp')
.controller('settingController', function ($scope, restaurantService, guestService) {

    $scope.clearSavedData = function () {
        restaurantService.delAll();
        guestService.delAll();
    };
});