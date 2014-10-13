﻿angular.module('dinnerDecisionApp')
.factory("geolocationService", ["$rootScope", "$q", "$window", "$resource", "cordova", "foursquareBaseUrlService", function ($rootScope, $q, $window, $resource, cordova, foursquareBaseUrlService) {
    var url = foursquareBaseUrlService.getBaseUrl('explore');
    
    return {
        getCurrentPosition: function () {
            return cordova.ready.then(function () {
                var deferred = $q.defer();
                $window.navigator.geolocation.getCurrentPosition(function (successValue) {
                    $rootScope.$apply(function () {
                        deferred.resolve(successValue);
                    });
                }, function (errorValue) {
                    $rootScope.$apply(function () {
                        deferred.reject(errorValue);
                    });
                });

                return deferred.promise;
            });
        },

        getAddressFromPosition: function (position) {
            return $resource(url, {})
                .get({ limit: 1, ll: position.coords.latitude + ',' + position.coords.longitude })
                .$promise.then(function (response) {
                    var location = response.response.headerFullLocation;
                    if (location == 'Current map view') {
                        location = 'Current Location'; // Not near a known city.
                    }

                    return location;
                }, function (error) {
                    return position.coords.latitude + ',' + position.coords.longitude
                });
        }
    }
}]);