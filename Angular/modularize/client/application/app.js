var app = angular.module('app', ['ngRoute']);
/* configuration for angular route */
app.config(function($routeProvider) {
  $routeProvider
    .when('/index', {
      templateUrl: '/partials/_index.html',
      controller: 'indexController'
    })
    .when('/edit/:id', {
      templateUrl: '/partials/_edit.html',
      controller: 'editController',
      controllerAs: 'eC'
    })
    .when('/new', {
      templateUrl: '/partials/_new.html',
      controller: 'newController',
    })
    .otherwise('/index');
});
