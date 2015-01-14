angular.module('dinnerDecisionApp')
.controller('resultController', function ($scope, $location, $routeParams, modelService) {
    
    var restaurants = modelService.getRestaurants();

    $scope.winningRestaurant = {};
    $scope.tiedWinningRestaurants = [];

    var determineWinner = function () {
        var restaurantScores = [];

        restaurants.forEach(function (element, index, array) {
            var totalScore = element.votes.sum();
            var numLoves = Math.floor(totalScore / 10000);
            var numLikes = totalScore % 10000;

            restaurantScores.push({
                restaurantIndex: index,
                totalScore: totalScore,
                numLoves: numLoves,
                numLikes: numLikes,
                numLovesPlusLikes: numLoves + numLikes
            });
        });

        // Weight Hates really low
        restaurantScores.sort(function (a, b) {
            if (a.numLovesPlusLikes > b.numLovesPlusLikes) {
                return -1;
            }
            if (a.numLovesPlusLikes < b.numLovesPlusLikes) {
                return 1;
            }
            if (a.totalScore > b.totalScore) {
                return -1;
            }
            if (a.totalScore < b.totalScore) {
                return 1;
            }
            return 0;
        });

        var bestScore = restaurantScores[0].totalScore;

        $scope.tiedWinningRestaurants = [];

        $scope.tiedWinningRestaurants.push(restaurants[restaurantScores[0].restaurantIndex]);

        for (var i = 1; i < restaurantScores.length; i++) {
            if (restaurantScores[i].totalScore == bestScore) {
                $scope.tiedWinningRestaurants.push(restaurants[restaurantScores[i].restaurantIndex]);
            } else {
                break;
            }
        }

        $scope.winningRestaurant = $scope.tiedWinningRestaurants[Math.floor(Math.random() * $scope.tiedWinningRestaurants.length)];
        $scope.mapUrl = "maps://maps.apple.com/?q=" + $scope.winningRestaurant.formattedAddress;
        $scope.mapUrlTest = "maps://maps.apple.com/?q=4404 voss hills pl, dallas, tx 75287";
    };

    $scope.openMaps = function () {
        // TODO: configure for Android.
        window.location = "maps://maps.apple.com/?q=" + $scope.winningRestaurant.formattedAddressForMaps;
    }

    $scope.openPhone = function () {
        window.location = "tel:" + $scope.winningRestaurant.formattedPhone;
    }

    determineWinner();
});