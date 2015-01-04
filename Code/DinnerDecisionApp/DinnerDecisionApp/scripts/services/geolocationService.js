angular.module('dinnerDecisionApp')
.factory("geolocationService", ["$rootScope", "$q", "$window", "$resource", "deviceReady", "foursquareBaseUrlService", function ($rootScope, $q, $window, $resource, deviceReady, foursquareBaseUrlService) {
    return {
        getCurrentPosition: function (callback) {
            deviceReady(function () {
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                    $rootScope.$apply(function () {
                        callback(position);
                    });
                }, function (error) {
                    $rootScope.$apply(function () {
                        throw new Error('Unable to retrieve position');
                    });
                });
            })
        },

        getAddressFromPosition: function (position) {
            return foursquareBaseUrlService.getBaseUrl('explore').then(
                function (url) {
                    return $resource(url, {})
                        .get({ limit: 1, ll: position.coords.latitude + ',' + position.coords.longitude })
                        .$promise.then(
                            function (response) {
                                var location = response.response.headerFullLocation;
                                if (location == 'Current map view') {
                                    location = 'Current Location'; // Not near a known city.
                                }
                                return {
                                    location: location,
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude
                                };
                            },
                            function (error) {
                                return {
                                    location: 'Current Location',
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude
                                };
                            }
                            );
                },
                function (error) {
                    return null;
                }
        );
        }
    }
}]);