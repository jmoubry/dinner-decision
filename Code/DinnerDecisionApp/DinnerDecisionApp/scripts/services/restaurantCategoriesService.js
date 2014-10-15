angular.module('dinnerDecisionApp')
.factory("restaurantCategoriesService", ["$q", "$http", function ($q, $http) {
    
    return {
        getCategories: function () {
            var defer = $q.defer();

            $http.get('/scripts/data/categories.json')
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function () {
                    defer.reject('Error');
                });

            return defer.promise;
        }
    }
}]);