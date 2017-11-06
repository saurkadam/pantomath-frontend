var app = angular.module('app', ['ngRoute','ngWebSocket','ng.epoch']);

app.config([ '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl : 'templates/dashboard.html',
            controller : 'HomeController'
        })
        $routeProvider.when('/', {
            templateUrl : 'templates/auth.html',
            controller : 'LoginController'
        }).otherwise({
            redirectTo : '/'
        });
        //$locationProvider.html5Mode(true); //Remove the '#' from URL.
    }
]);


