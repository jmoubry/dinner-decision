angular.module('dinnerDecisionApp')
.factory('modelService', function () {
    var model = {};

    var initModel = function () {
        model = {
            categories: [],
            searchModel: {
                category: {},
                near: "Getting location...",
                canGetLocation: false,
                useLatLong: false,
                latitude: 0,
                longitude: 0,
                prices: [false, false, false, false]
            },
            restaurants: [],
            isOrdered: false,
            currentGuestNumber: 1,
            isVotingClosed: false
        };
    };

    var addRestaurant = function (newRestaurant) {
        model.restaurants.push({
            name: newRestaurant,
            votes: []
        });

        model.isOrdered = false;
    }

    var updateVote = function (guestNumber, restaurantNumber, score) {
        model.restaurants[parseInt(restaurantNumber) - 1].votes[parseInt(guestNumber) - 1] = score;
    }

    var getRestaurants = function () {
        if (!model.isOrdered) {
            clearVotes();
            model.restaurants.sort(function (a, b) { return util.compareObjectNames(a, b) });
            model.isOrdered = true;
        }

        return model.restaurants;
    }

    var removeRestaurant = function (restaurant) {
        model.restaurants.splice(model.restaurants.indexOf(restaurant), 1);
        model.isOrdered = false;
    }

    var clearRestaurants = function () {
        model.restaurants.length = 0;
        model.isOrdered = false;
    }

    var clearVotes = function() {
        model.restaurants.forEach(function (element, index, array) {
            element.votes = [];
        });
    }

    initModel();

    return {
        clearModel: initModel,
        getSearchModel: function () { return model.searchModel; },
        setSearchModel: function (searchModel) { model.searchModel = searchModel; },
        getCategories: function () { return model.categories; },
        setCategories: function (categories) { model.categories = categories; },
        updateVote: updateVote,
        addRestaurant: addRestaurant,
        getRestaurants: getRestaurants,
        removeRestaurant: removeRestaurant,
        clearRestaurants: clearRestaurants,
        getCurrentGuestNumber: function () { return model.currentGuestNumber; },
        setCurrentGuestNumber: function (currentGuestNumber) { model.currentGuestNumber = currentGuestNumber; },
        isVotingClosed: function () { return model.isVotingClosed; },
        closeVoting: function () { model.isVotingClosed = true; }
    };
});