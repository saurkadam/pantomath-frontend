

var app = angular.module('app', ['ngRoute','ngWebSocket','chart.js']);

app.config([ '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl : 'app/templates/dashboard.html',
            controller : 'HomeController'
        })
        $routeProvider.when('/', {
            templateUrl : 'app/templates/auth.html',
            controller : 'LoginController'
        }).otherwise({
            redirectTo : '/'
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);

