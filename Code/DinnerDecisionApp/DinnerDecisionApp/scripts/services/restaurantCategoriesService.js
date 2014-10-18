angular.module('dinnerDecisionApp')
.factory("restaurantCategoriesService", ["$q", "$http", function ($q, $http) {
    
    return {
        getCategories: function () {
            var defer = $q.defer();

            defer.resolve(GLOBAL_CATEGORIES);
            
            return defer.promise;
        }
    }
}]);