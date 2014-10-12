angular.module('dinnerDecisionApp')
.controller('restaurantController', function ($scope, restaurantService) {
    var refresh = function () {
        $scope.restaurants = restaurantService.getAll();
    }

    $scope.newRestaurant = '';

    $scope.addRestaurant = function () {
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

    refresh();
});