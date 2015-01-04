// app.js
// create our angular app and inject ngResource and ui-router 
var GLOBAL_SECRETS;

// =============================================================================
angular.module('dinnerDecisionApp', ['ngResource', 'ngRoute'])

// configuring our routes 
// =============================================================================
.config(function ($routeProvider, $locationProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

    $routeProvider
        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'restaurantSearchController'
        })
        .when('/restaurants/list', {
            templateUrl: 'views/restaurants-list.html',
            controller: 'restaurantListController'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'aboutController'
        })
        .when('/guest/:guestNumber', {
            templateUrl: 'views/guest.html',
            controller: 'guestController'
        })
        .when('/guest/:guestNumber/restaurant/:restaurantNumber', {
            templateUrl: 'views/vote.html',
            controller: 'voteController'
        })
        .when('/result', {
            templateUrl: 'views/result.html',
            controller: 'resultController'
        })
        .otherwise({
            redirectTo: '/search'
        });

    $locationProvider.html5Mode(true);
})
.factory('deviceReady', function(){
    return function (callback) {
        if (typeof window.cordova === 'object') {
            document.addEventListener('deviceready', function () {
                callback();
            }, false);
        } else {
            callback();
        }
    };
});