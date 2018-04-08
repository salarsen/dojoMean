angular.module('myApp',['ngRoute'])
   .config(['$routeProvider', function($routeProvider){
      $routeProvider
      .when('/',{
         templateUrl : 'partials/_index.html',
         controller : 'testingController',
      })
      .when('/test',{
         templateUrl : 'partials/_test.html',
         controller : 'testingController',
      })
      .otherwise({
         redirectTo : '/',
      });
   }]);
