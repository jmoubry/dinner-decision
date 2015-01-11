angular.module('dinnerDecisionApp')
.controller('restaurantSearchController', function ($scope, $location, modelService, restaurantSearchService, restaurantCategoriesService, geolocationService) {

    $scope.categories = [];
    $scope.restaurants = [];

    $scope.searchModel = modelService.getSearchModel();
    
    var geolocation = "Getting location...";

    var loadCategories = function () {
        restaurantCategoriesService.getCategories().then(function (categories) {
            modelService.setCategories(categories);
            $scope.categories = categories;
            $scope.searchModel.category = categories[0];
        });
    };

    var updateAddress = function () {
        geolocationService.getCurrentPosition(function (position) {
            geolocationService.getAddressFromPosition(position)
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
        });            
    };

    setLocationToNotFound = function () {
        geolocation = undefined;
        $scope.searchModel.location = '';
    };

    $scope.resetLocation = function () {
        $scope.searchModel.location = "Getting location...";
        updateAddress();
    };

    $scope.togglePrice = function(index){
        $scope.searchModel.prices[index] = !$scope.searchModel.prices[index];
    };

    $scope.skip = function () {
        $location.path('/restaurants/list');
    };

    $scope.isSubmitting = false;

    $scope.submit = function () {
        if ($scope.isSubmitting)
            return;

        $scope.isSubmitting = true;

        try {
            if (!geolocation && !$scope.searchModel.location) {
                $scope.isSubmitting = false;
                $('#noLocationModal').modal('show');
                return;
            }

            $scope.searchModel.useLatLong = $scope.searchModel.location === geolocation || $scope.searchModel.location === 'Current Location';

            restaurantSearchService.search($scope.searchModel).then(function (list) {
                if (list == null) {
                    $scope.isSubmitting = false;
                    $('#noInternetModal').modal('show');
                } else if (list.length === 0) {
                    $scope.isSubmitting = false;
                    $('#noMatchesModal').modal('show');
                } else {
                    $.each(list, function (index, item) {
                        modelService.addRestaurant(item.venue.name);
                    });

                    modelService.setSearchModel($scope.searchModel);

                    $location.path('/restaurants/list');
                }
            }, function (error) {
                $('#noInternetModal').modal('show');
                $scope.isSubmitting = false;
            });
        } catch (err) {
            $scope.isSubmitting = false;
        }
    };

    modelService.clearRestaurants();

    if (!$scope.searchModel.canGetLocation) {
        updateAddress();
    }

    if ($scope.categories.length == 0) {
        loadCategories();
    }
});