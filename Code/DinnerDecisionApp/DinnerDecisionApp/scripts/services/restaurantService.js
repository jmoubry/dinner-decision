angular.module('dinnerDecisionApp')
.service('restaurantService', function () {
    var restaurantList = [];

    var create = function (newRestaurant) {
        restaurantList.push({
            name: newRestaurant
        });
    }

    var getAll = function () {
        return restaurantList;
    }

    var del = function (restaurant) {
        restaurantList.splice(restaurantList.indexOf(restaurant), 1);
    }

    var delAll = function () {
        restaurantList.length = 0;
    }

    return {
        create: create,
        getAll: getAll,
        del: del,
        delAll: delAll
    };

});