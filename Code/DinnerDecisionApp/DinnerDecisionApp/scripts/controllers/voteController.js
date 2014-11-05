angular.module('dinnerDecisionApp')
.controller('voteController', function ($scope, $location, $routeParams, $timeout, modelService) {

    var restaurantNumber = parseInt($routeParams.restaurantNumber);
    var guestNumber = parseInt($routeParams.guestNumber);    
    var previousGuestNumber = modelService.getCurrentGuestNumber();
    var isVotingClosed = modelService.isVotingClosed();
    
    // Prevent back button from letting guests see earlier guests' votes.
    if (previousGuestNumber > guestNumber) {
        if (isVotingClosed)
            $location.path('/result');
        else
            $location.path('/guest/' + previousGuestNumber);
        return;
    }

    modelService.setCurrentGuestNumber(guestNumber);
    var restaurants = modelService.getRestaurants();
    $scope.restaurant = restaurants[restaurantNumber -1];
    $scope.score = $scope.restaurant.votes[guestNumber - 1];
    
    $scope.vote = function (score) {
        $scope.score = score;
        modelService.updateVote(guestNumber, restaurantNumber, score);

        $timeout(function () {
            if (restaurantNumber < restaurants.length) {
                var nextRestaurantNumber = restaurantNumber + 1;
                $location.path('/guest/' + guestNumber + '/restaurant/' + nextRestaurantNumber);
            } else {
                var nextGuestNumber = guestNumber + 1;
                $location.path('/guest/' + nextGuestNumber);
            }
        }, 150);
    };
});