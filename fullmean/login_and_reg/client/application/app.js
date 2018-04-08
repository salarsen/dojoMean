angular.module('myApp', ['ngRoute', 'ngCookies'])
   .config(['$routeProvider', function($routeProvider){
      $routeProvider
      .when('/', {
         templateUrl : 'partials/auth/_index.html',
         controller : 'authController',
      })
      .when('/dashboard',{
         templateUrl : 'partials/auth/_dashboard.html',
         controller : 'userController',
      })
      .when('/test',{
         templateUrl : 'partials/auth/_test.html',
         controller : 'userController',
      })
      .otherwise({
         redirectTo : '/',
      });
   }])
