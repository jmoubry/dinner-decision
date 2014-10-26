angular.module('dinnerDecisionApp')
.factory("restaurantSearchService", ["$q", "$http", "foursquareBaseUrlService", function ($q, $http, foursquareBaseUrlService) {

    buildUrl = function (baseUrl, searchModel) {
        var url = baseUrl + '&limit=20&categoryId=' + searchModel.category.id;

        if (searchModel.useLatLong) {
            url += '&ll=' + searchModel.latitude + ',' + searchModel.longitude;
        } else {
            url += '&near=' + encodeURIComponent(searchModel.location);
        }

        pricesToSearch = [];

        $.each(searchModel.prices, function (index, item) {
            if (item) {
                pricesToSearch.push(index + 1);
            }
        });

        if (pricesToSearch.length > 0) {
            url += '&price=' + pricesToSearch.join();
        }

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
                            return [];
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