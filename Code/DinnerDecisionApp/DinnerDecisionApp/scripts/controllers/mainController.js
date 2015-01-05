angular.module('dinnerDecisionApp')
.controller('mainController', function ($scope, $rootScope, $location, modelService, deviceReady) {
    $scope.restart = function () {
        modelService.clearModel();
        $location.path('/');
    };

    $scope.about = function () {
        $location.path('/about');
    };

    $rootScope.showBackButton = false;

    $rootScope.$on('$locationChangeSuccess', function () {
        $rootScope.showBackButton = $location.path() !== '/search';
    });

    deviceReady(
        function () {
            $rootScope.device = {
                name: window.device.name,
                version: window.device.version,
                platform: window.device.platform,
                isAndroid: window.device.platform === 'Android',
                isIOS: window.device.platform.match(/iPhone|iPod|iPad|iOS/i)
            };
        }
    );
});