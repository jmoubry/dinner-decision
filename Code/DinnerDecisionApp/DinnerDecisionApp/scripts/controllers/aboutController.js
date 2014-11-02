angular.module('dinnerDecisionApp')
.controller('aboutController', function ($scope, cordova) {
    cordova.ready.then(
        function () {
            $scope.device = {
                name: device.name,
                version: device.version,
                platform: device.platform
            };
        });
});