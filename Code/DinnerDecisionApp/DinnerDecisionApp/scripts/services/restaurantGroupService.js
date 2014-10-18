angular.module('dinnerDecisionApp')
.factory("restaurantGroupService", ['$q', "$window", "guidGenerator", function ($q, $window, guidGenerator) {
    var localStorageKey = "restaurantGroups";

    var loadFromStorage = function () {
        return angular.fromJson($window.localStorage.getItem(localStorageKey)) || [];
    };

    var saveToStorage = function (items) {
        $window.localStorage.setItem(localStorageKey, angular.toJson(items));
    }

    return {
        getAll: function () {
            return loadFromStorage();
        },

        create: function (name, restaurants) {
            var item = {
                id: guidGenerator(),
                name: name,
                restaurants: restaurants
            }
            var items = loadFromStorage();
            items.push(item);
            saveToStorage(items);
            return $q.when(item);
        },

        update: function (item) {
            var items = loadFromStorage();
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === item.id) {
                    items[i] = item;
                    break;
                }
            }

            saveToStorage(items);
            return $q.when(item);
        },

        del: function (item) {
            var items = loadFromStorage();
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === item.id) {
                    items.splice(i, 1);
                    break;
                }
            }

            saveToStorage(items);
            return $q.when(item);
        },

        delAll: function () {
            var items = [];
            saveToStorage(items);
        },
    }
}])