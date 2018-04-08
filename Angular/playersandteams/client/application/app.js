angular.module('app',['ngRoute'])
   .config(['$routeProvider', function($routeProvider){
      $routeProvider
         .when('/players', {
            templateUrl : 'partials/_players.html',
            controller : 'PlayersController',
         })
         .when('/teams',{
            templateUrl : 'partials/_teams.html',
            controller : 'TeamsController',
         })
         .when('/associations',{
            templateUrl : 'partials/_associations.html',
            controller : 'AssociationsController',
         })
         .otherwise('/');
   }]);
