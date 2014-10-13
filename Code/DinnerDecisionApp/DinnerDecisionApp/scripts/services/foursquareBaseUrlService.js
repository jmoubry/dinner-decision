angular.module('dinnerDecisionApp')
.factory("foursquareBaseUrlService", function () {
    var apiBaseUrl = 'https://api.foursquare.com/v2/venues/';
    var clientId = '';
    var clientSecret = '';

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
            return apiBaseUrl + service + '?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + getFormattedDate();
        }
    };
})