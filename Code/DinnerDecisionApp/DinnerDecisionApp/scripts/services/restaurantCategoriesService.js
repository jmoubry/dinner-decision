angular.module('dinnerDecisionApp')
.factory("restaurantCategoriesService", ["$q", "$http", "foursquareBaseUrlService", function ($q, $http, foursquareBaseUrlService) {
    
    return {
        getCategories: function () {
            return foursquareBaseUrlService.getBaseUrl('categories').then(
                function (url) {
                    return $http.get(url).then(
                        function (response) {
                            var foodMatches = $.grep(response.data.response.categories, function (c) { return c.name == 'Food'; });

                            if (foodMatches && foodMatches.length == 0) {
                                return null;
                            }

                            return foodMatches[0].categories;
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