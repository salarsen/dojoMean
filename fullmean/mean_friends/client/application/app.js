angular.module('app',['ngRoute'])
   .config(['$routeProvider', function($routeProvider){
      $routeProvider
         .when('/friends',{
            templateUrl : 'partials/_index.html',
            controller : 'FriendsController',
         })
         .when('/friends/new',{
            templateUrl : 'partials/_new.html',
            controller : 'FriendsController',
         })
         .when('/friends/:id',{
            templateUrl : 'partials/_show.html',
            controller : 'FriendsController',
         })
         .when('/friends/:id/edit',{
            templateUrl : 'partials/_edit.html',
            controller : 'FriendsController',
         })
         .otherwise({
            redirectTo : '/friends'
         });
   }]);
