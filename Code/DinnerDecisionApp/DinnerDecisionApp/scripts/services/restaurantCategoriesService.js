angular.module('dinnerDecisionApp')
.factory("restaurantCategoriesService", ["$q", "$http", "foursquareBaseUrlService", function ($q, $http, foursquareBaseUrlService) {
    
    var url = foursquareBaseUrlService.getBaseUrl('categories');

    return {
        getCategories: function () {
            var request = $http({
                method: "get",
                url: url,
                params: {
                    action: "get"
                }
            });

            return request.then(
                function (response) {
                    var foodMatches = $.grep(response.data.response.categories, function (c) { return c.name == 'Food'; });

                    if (foodMatches && foodMatches.length == 0) {
                        return null;
                    }

                    return foodMatches[0].categories;
                },
                function (error) {
                    return null;
                });
        }
    }
}]);