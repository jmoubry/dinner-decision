angular.module('dinnerDecisionApp')
.controller('restaurantSearchController', function ($scope, $location, restaurantService, restaurantSearchService, restaurantCategoriesService, geolocationService) {

    $scope.categories = [];
    $scope.restaurants = [];

    $scope.searchModel = {
        category: {},
        near: "Getting location...",
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

    $scope.togglePrice = function(index){
        $scope.searchModel.prices[index] = !$scope.searchModel.prices[index];
    };

    $scope.submit = function () {
        $scope.restaurants = [];

        // TODO: sanitize user input
        $scope.searchModel.useLatLong = $scope.searchModel.location === geolocation || $scope.searchModel.location === 'Current Location';

        restaurantSearchService.search($scope.searchModel).then(function (list) {
            console.log('list length: ' + list.length);
            $.each(list, function (index, item) {
                restaurantService.create(item.venue.name);
                $scope.restaurants.push({ name: item.venue.name });
            });
            $location.path('/restaurants/list');
        }, function (error) {
            alert('Could not retrieve restaurants.');
        });
    };

    updateAddress();
    loadCategories();
});