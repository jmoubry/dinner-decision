﻿angular.module('dinnerDecisionApp')
.controller('aboutController', function ($scope, cordova) {
    $scope.app_version = 'v1.5';

    cordova.ready.then(
        function () {
            $scope.device = {
                name: device.name,
                version: device.version,
                platform: device.platform
            };
        });
});