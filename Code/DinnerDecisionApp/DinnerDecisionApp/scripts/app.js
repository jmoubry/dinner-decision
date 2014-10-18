// app.js
// create our angular app and inject ngAnimate and ui-router 
var GLOBAL_SECRETS;

// =============================================================================
angular.module('dinnerDecisionApp', ['ngResource', 'ngAnimate', 'ui.router'])

// configuring our routes 
// =============================================================================
.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('settings', {
            url: '/settings',
            templateUrl: 'views/settings.html',
        	controller: 'settingController'
        })

		.state('restaurants', {
		    url: '/restaurants',
		    templateUrl: 'views/restaurants.html',
		    controller: 'restaurantController'
		})

		.state('restaurants.selectors', {
		    url: '/selectors',
		    templateUrl: 'views/restaurants-selectors.html',
		})
		.state('restaurants.list', {
		    url: '/list',
		    templateUrl: 'views/restaurants-list.html',
		})

        .state('vote', {
            url: '/vote',
            templateUrl: 'views/vote.html',
            controller: 'voteController'
        })

        // nested states 
        // each of these sections will have their own view
        // url will be nested (/vote/turn)
        .state('vote.turn', {
            url: '/turn',
            templateUrl: 'views/vote-turn.html'
        })
        .state('vote.restaurant', {
            url: '/restaurant',
            templateUrl: 'views/vote-restaurant.html'
        })
        .state('vote.restaurantodd', {
            url: '/restaurant-odd',
            templateUrl: 'views/vote-restaurant-odd.html'
        })
        .state('vote.result', {
            url: '/result',
            templateUrl: 'views/vote-result.html'
        })

    // catch all route
    // send users to the restaurants page 
    $urlRouterProvider.otherwise('/restaurants/selectors');
})
.factory("cordova", ['$q', "$window", "$timeout", function ($q, $window, $timeout) {
     var deferred = $q.defer();
     var resolved = false;

     document.addEventListener('deviceready', function () {
         resolved = true;
         deferred.resolve($window.cordova);
     }, false);

     $timeout(function () {
         if (!resolved && $window.cordova) {
             deferred.resolve($window.cordova);
         }
     });

     return { ready: deferred.promise };
 }]);