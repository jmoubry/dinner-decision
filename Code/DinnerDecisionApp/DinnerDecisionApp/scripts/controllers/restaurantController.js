angular.module('dinnerDecisionApp')
.controller('restaurantController', function ($scope, $location, restaurantService) {
    var refresh = function () {
        $scope.restaurants = restaurantService.getAll();
    }

    $scope.failedValidation = false;
    $scope.newRestaurant = '';

    $scope.addRestaurant = function () {
        if ($scope.restaurants.length >= 1) { $scope.failedValidation = false; }

        var newRestaurant = $scope.newRestaurant.trim();
        if (!newRestaurant.length) {
            return;
        }

        restaurantService.create(newRestaurant)
                         .then(function (restaurant) {
                             $scope.restaurants.push(restaurant);
                             return restaurant;
                         });

        $scope.newRestaurant = '';
    };

    $scope.removeRestaurant = function (restaurant) {
        restaurantService.del(restaurant)
                         .then(function (restaurant) {
                             var index = $scope.restaurants.indexOf(restaurant);
                             $scope.restaurants.splice(index, 1);
                         });
    };

    $scope.submit = function() {
        if ($scope.restaurants.length <= 1) {
            $scope.failedValidation = true;
        } else {
            $location.path('/vote/turn');
        }
    };

    refresh();
});