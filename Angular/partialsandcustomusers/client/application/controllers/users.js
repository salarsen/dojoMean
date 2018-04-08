angular.module('myApp')
   .controller('CustomizeUsersController',
      ['$scope','$routeParams','$location','UserFactory',
       function($scope,$routeParams,$location, UserFactory){
          $scope.users = [];
         // $scope.users = [{
         //    first_name : 'Spencer',
         //    last_name : 'Larsen',
         //    fav_lang : 'Javascript',
         // }];

         $scope.getUsers = () => {
            UserFactory.getUsers(function(users){
               $scope.users = users;
            });
         }

         $scope.addUser = () => {
            UserFactory.addUser($scope.user);
            $scope.user = {};
            $location.url('/list')
         };

         $scope.deleteUser = (index) => {
            UserFactory.deleteUser(index);
         }

      }])
   .controller('UserListsController',
      ['$scope','UserFactory',
      function($scope, UserFactory){

         $scope.users = [];

         $scope.getUsers = () => {
            UserFactory.getUsers(function(users){
               $scope.users = users;
            });
         };
   }]);
