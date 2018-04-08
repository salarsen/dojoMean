angular.module('app',['ngRoute'])
   .config(['$routeProvider',function($routeProvider){
      $routeProvider
         .when('/players',{
            templateUrl : 'partials/players/_players.html',
            controller : 'PlayersController',
         })
         .when('/players/new',{
            templateUrl : 'partials/players/_new.html',
            controller : 'PlayersController',
         })
         .when('/players/:id',{
            templateUrl : 'partials/players/_show.html',
            controller : 'PlayersController',
         })
         .when('/players/:id/edit',{
            templateUrl : 'partials/players/_edit.html',
            controller : 'PlayersController',
         })
         .when('/teams',{
            templateUrl : 'partials/teams/_teams.html',
            controller : 'TeamsController',
         })
         .when('/teams/new',{
            templateUrl : 'partials/teams/_new.html',
            controller : 'TeamsController',
         })
         .when('/teams/:id',{
            templateUrl : 'partials/teams/_show.html',
            controller : 'TeamsController',
         })
         .when('/teams/:id/edit',{
            templateUrl : 'partials/teams/_edit.html',
            controller : 'TeamsController',
         })
         .otherwise({
            redirectTo : '/'
         });
   }]);
