angular.module('dinnerDecisionApp')
.controller('guestController', function ($scope, $rootScope, $location, $timeout, guestService) {
    var refresh = function () {
        $scope.guests = guestService.getAll();
    }

    $scope.failedValidation = false;
    $scope.newGuest = '';

    $scope.addGuest = function () {
        $scope.failedValidation = false;

        var newGuest = $scope.newGuest.trim();
        if (!newGuest.length) {
            return;
        }

        guestService.create(newGuest)
                         .then(function (guest) {
                             $scope.guests.push(guest);
                             return guest;
                         });

        $scope.newGuest = '';
    };

    $scope.removeGuest = function (guest) {
        guestService.del(guest)
                         .then(function (guest) {
                             var index = $scope.guests.indexOf(guest);
                             $scope.guests.splice(index, 1);
                         });
    };

    $scope.goBackTo = function (path) {
        $rootScope.animationClass = 'slide-right';

        $timeout(function () {
            $rootScope.animationClass = '';
            }, 350);
        
        $location.path(path)
    }

    $scope.submit = function () {
        if ($scope.guests.length == 0) {
            $scope.failedValidation = true;
        } else {
            $location.path('/vote/turn');
        }
    };

    refresh();
});