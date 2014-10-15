angular.module('dinnerDecisionApp')
.controller('restaurantController', function ($scope, $location, restaurantService, restaurantSearchService, restaurantCategoriesService, geolocationService) {
    var refresh = function () {
        $scope.restaurants = restaurantService.getAll();
    }

    $scope.failedValidation = false;
    $scope.newRestaurant = '';
    $scope.categories = [];

    $scope.searchModel = {
        category: {},
        near: "Getting location...",
        useLatLong: false,
        latitude: 0,
        longitude: 0,
        prices: []
    };
    
    var geolocation = "Getting location...";

    var loadCategories = function () {
        restaurantCategoriesService.getCategories().then(function (categories) {
            $scope.categories = categories;
            $scope.searchModel.category = categories[0];
        });
    };

    var updateAddress = function () {
        geolocationService.getCurrentPosition()
            .then(geolocationService.getAddressFromPosition, function (error) { $scope.currentLocation = error; })
            .then(function (address) {
                geolocation = address.location;
                $scope.searchModel.location = address.location;
                $scope.searchModel.latitude = address.latitude;
                $scope.searchModel.longitude = address.longitude;
            }, function (errorMessage) {
                $scope.searchModel.location = errorMessage;
            });
    };

    $scope.resetLocation = function () {
        $scope.searchModel.location = geolocation;
    };

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

    $scope.submitSelectors = function() {
        console.log('cat: ' + $scope.searchModel.category.name);
        console.log('loc: ' + $scope.searchModel.location);

        // TODO: sanitize user input

        if ($scope.searchModel.location === geolocation) {
            $scope.searchModel.useLatLong = true;
        }

        restaurantSearchService.search($scope.searchModel).then(function (list) {
            console.log('list length: ' + list.length);
            $.each(list, function (index, item) {
                restaurantService.create(item.venue.name)
                                 .then(function (restaurant) {
                                     $scope.restaurants.push(restaurant);
                                 });
            });
            $location.path('/restaurants/list');
        }, function (error) {
            alert('Could not retrieve restaurants.');
        });        

    };

    $scope.submitList = function () {
        if ($scope.restaurants.length <= 1) {
            $scope.failedValidation = true;
        } else {
            $location.path('/vote/turn');
        }
    };

    updateAddress();
    loadCategories();
    refresh();
});