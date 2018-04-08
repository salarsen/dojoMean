angular.module('myApp',['ngRoute'])
   .config(['$routeProvider',function($routeProvider){
      $routeProvider
         .when('/', {
            templateUrl : 'partials/_index.html',
            controller : 'CustomizeUsersController',
         })
         .when('/list', {
            templateUrl : 'partials/_customize.html',
            controller : 'UserListsController',
         })
         .otherwise('/');
   }]);
