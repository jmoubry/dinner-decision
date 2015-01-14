angular.module('dinnerDecisionApp')
.controller('restaurantListController', function ($scope, $timeout, $location, modelService, restaurantSearchService, restaurantCategoriesService, geolocationService) {

    $scope.failedValidation = false;
    $scope.newRestaurant = '';
    $scope.restaurants = modelService.getRestaurants();

    $scope.addRestaurant = function () {
        if ($scope.restaurants.length >= 1) { $scope.failedValidation = false; }

        var newRestaurant = $scope.newRestaurant.trim();
        if (!newRestaurant.length) {
            return;
        }

        modelService.addRestaurant({ name: newRestaurant });

        $scope.newRestaurant = '';
    };

    $scope.removeRestaurant = function (restaurant) {
        modelService.removeRestaurant(restaurant);
    };

    $scope.submit = function () {
        if ($scope.restaurants.length <= 1) {
            $scope.failedValidation = true;
        } else {
            $location.path('/guest/1');
        }
    };

    $scope.back = function () {        
        $location.path('/search');
    };
});