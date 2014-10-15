angular.module('dinnerDecisionApp')
.factory("restaurantSearchService", ["$q", "$http", "foursquareBaseUrlService", function ($q, $http, foursquareBaseUrlService) {

    buildUrl = function (baseUrl, searchModel) {
        var url = baseUrl + '&limit=10&categoryId=' + encodeURIComponent(searchModel.category.id);

        if (searchModel.useLatLong || searchModel.location === 'Current Location') {
            url += '&ll=' + encodeURIComponent(searchModel.latitude + ',' + searchModel.longitude);
        } else {
            url += '&near=' + encodeURIComponent(searchModel.location);
        }

        // TODO: PRICE

        return url;
    };

    return {
        search: function (searchModel) {
            return foursquareBaseUrlService.getBaseUrl('explore').then(
                function (baseurl) {
                    var url = buildUrl(baseurl, searchModel);

                    return $http.get(url).then(
                        function (response) {                            
                            return response.data.response.groups[0].items;
                        },
                        function (error) {
                            return null;
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