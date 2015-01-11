angular.module('dinnerDecisionApp')
.factory("restaurantSearchService", ["$q", "$http", "foursquareBaseUrlService", function ($q, $http, foursquareBaseUrlService) {

    var numInPool = 25;
    var numToReturn = 10;
    var numTopToTakeBeforeRandomizing = 4;

    buildUrl = function (baseUrl, searchModel) {
        var url = baseUrl + '&limit=' + numInPool + '&categoryId=' + searchModel.category.id;

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

    shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    return {
        search: function (searchModel) {
            return foursquareBaseUrlService.getBaseUrl('explore').then(
                function (baseurl) {
                    var url = buildUrl(baseurl, searchModel);

                    return $http.get(url).then(
                        function (response) {
                            var list = response.data.response.groups[0].items;

                            var topRestaurants = [];
                            var restaurants = [];
                            var additionalRestaurants = [];
                            var uniqueNames = [];

                            $.each(list, function (index, item) {
                                if($.inArray(item.venue.name, uniqueNames) === - 1) {
                                    restaurants.push(item);
                                    uniqueNames.push(item.venue.name);
                                }
                            });

                            topRestaurants = restaurants.splice(0, numTopToTakeBeforeRandomizing);

                            shuffle(restaurants);

                            additionalRestaurants = restaurants.splice(0, numToReturn -numTopToTakeBeforeRandomizing);

                            return topRestaurants.concat(additionalRestaurants);
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