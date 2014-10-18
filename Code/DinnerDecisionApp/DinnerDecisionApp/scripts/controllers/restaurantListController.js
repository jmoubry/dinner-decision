angular.module('dinnerDecisionApp')
.controller('restaurantListController', function ($scope, $location, restaurantService, restaurantSearchService, restaurantCategoriesService, geolocationService) {

    $scope.failedValidation = false;
    $scope.newRestaurant = '';
    $scope.restaurants = restaurantService.getAll();

    $scope.addRestaurant = function () {
        if ($scope.restaurants.length >= 1) { $scope.failedValidation = false; }

        var newRestaurant = $scope.newRestaurant.trim();
        if (!newRestaurant.length) {
            return;
        }

        restaurantService.create(newRestaurant);

        $scope.newRestaurant = '';
    };

    $scope.removeRestaurant = function (restaurant) {
        restaurantService.del(restaurant);
    };

    $scope.submit = function () {
        if ($scope.restaurants.length <= 1) {
            $scope.failedValidation = true;
        } else {
            $location.path('/vote/turn');
        }
    };
});