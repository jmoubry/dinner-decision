angular.module('dinnerDecisionApp')
.controller('voteController', function ($scope, $location, restaurantService) {
    compareObjectNames = function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };

    $scope.currentGuestNumber = 1;

    var restaurantScoresHash = {};
    var restaurants = restaurantService.getAll().sort(function (a, b) { return compareObjectNames(a, b) });

    var restaurantIndex = 0;
    $scope.currentRestaurant = restaurants[restaurantIndex];
    $scope.currentOddRestaurant = '';
    $scope.selectedScore = -1;
    $scope.selectedOddScore = -1;

    $scope.winningRestaurant = {};
    $scope.tiedWinningRestaurants = [];

    $scope.determineWinner = function () {
        var restaurantScores = [];

        Object.keys(restaurantScoresHash).forEach(function (key) {
            var totalScore = restaurantScoresHash[key];
            var numLoves = Math.floor(totalScore / 10000);
            var numLikes = totalScore % 10000;

            restaurantScores.push({
                restaurantIndex: key,
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

        $location.path('/vote/result');
    };

    isEven = function (number) {
        return number % 2 == 0;
    };

    $scope.vote = function (score) {
        if (restaurantScoresHash[restaurantIndex]) {
            restaurantScoresHash[restaurantIndex] = restaurantScoresHash[restaurantIndex] + score;
        } else {
            restaurantScoresHash[restaurantIndex] = score;
        }

        if (restaurantIndex + 1 < restaurants.length) {
            restaurantIndex = restaurantIndex + 1;

            if (isEven(restaurantIndex)) {
                $scope.selectedScore = -1;
                $scope.selectedOddScore = score;
                $scope.currentRestaurant = restaurants[restaurantIndex];
                $location.path('/vote/restaurant');
            } else {
                $scope.selectedScore = score;
                $scope.selectedOddScore = -1;
                $scope.currentOddRestaurant = restaurants[restaurantIndex];
                $location.path('/vote/restaurant-odd');
            }
        } else {
            $scope.selectedScore = -1;
            $scope.selectedOddScore = -1;
            restaurantIndex = 0;
            $scope.currentRestaurant =  restaurants[restaurantIndex];
            $scope.currentGuestNumber = $scope.currentGuestNumber + 1;
            $location.path('/vote/turn');
        }
    };    
});