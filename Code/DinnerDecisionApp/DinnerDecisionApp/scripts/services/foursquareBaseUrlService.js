angular.module('dinnerDecisionApp')
.factory("foursquareBaseUrlService", ["$q", "$http", function ($q, $http) {
    var apiBaseUrl = 'https://api.foursquare.com/v2/venues/';

    getFormattedDate = function () {
        var today = new Date();

        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        return today.getFullYear().toString() + mm.toString() + dd.toString();
    };

    return {
        getBaseUrl: function (service) {
            var defer = $q.defer();

            $http.get('/secrets.json')
                .success(function (data) {
                    var url = apiBaseUrl + service + '?client_id=' + data.foursquareClientId + '&client_secret=' + data.foursquareClientSecret + '&v=' + getFormattedDate();
                    defer.resolve(url);
                })
                .error(function () {
                    defer.reject('could not find secrets');
                });

            return defer.promise;
        }
    };
}]);