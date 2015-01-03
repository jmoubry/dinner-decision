angular.module('dinnerDecisionApp')
.controller('mainController', function ($scope, $rootScope, $location, modelService) {
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
});