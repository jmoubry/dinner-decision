angular.module('dinnerDecisionApp')
.controller('restaurantSearchController', function ($scope, $location, restaurantService, restaurantSearchService, restaurantCategoriesService, geolocationService) {

    $scope.categories = [];
    $scope.restaurants = [];

    $scope.searchModel = {
        category: {},
        near: "Getting location...",
        canGetLocation: false,
        useLatLong: false,
        latitude: 0,
        longitude: 0,
        prices: [false, false, false, false]
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
            .then(geolocationService.getAddressFromPosition, function (error) { setLocationToNotFound(); })
            .then(function (address) {
                if (address) {
                    geolocation = address.location;
                    $scope.searchModel.location = address.location;
                    $scope.searchModel.latitude = address.latitude;
                    $scope.searchModel.longitude = address.longitude;
                    $scope.searchModel.canGetLocation = true;
                } else {
                    setLocationToNotFound();
                }
            }, function (errorMessage) {
                setLocationToNotFound();
            });
    };

    setLocationToNotFound = function () {
        geolocation = undefined;
        $scope.searchModel.location = '';
    };

    $scope.resetLocation = function () {
        updateAddress();
    };

    $scope.togglePrice = function(index){
        $scope.searchModel.prices[index] = !$scope.searchModel.prices[index];
    };

    $scope.skip = function () {
        restaurantService.delAll();
        $location.path('/restaurants/list');
    };

    $scope.submit = function () {
        restaurantService.delAll();

        if (!geolocation && !$scope.searchModel.location) {
            $('#noLocationModal').modal('show');
            return;
        }

        $scope.searchModel.useLatLong = $scope.searchModel.location === geolocation || $scope.searchModel.location === 'Current Location';

        restaurantSearchService.search($scope.searchModel).then(function (list) {
            if (list == null) {
                $('#noInternetModal').modal('show');
            } else if (list.length === 0) {
                $('#noMatchesModal').modal('show');
            } else {
                var uniqueNames = [];

                $.each(list, function (index, item) {
                    if ($.inArray(item.venue.name, uniqueNames) === -1) {
                        restaurantService.create(item.venue.name);
                        uniqueNames.push(item.venue.name);
                    }
                });

                $location.path('/restaurants/list');
            }
        }, function (error) {
            $('#noInternetModal').modal('show');
        });
    };

    updateAddress();
    loadCategories();
});