angular.module('myApp')
   .controller('userController',
      ['$scope','$location','AuthService',
         function($scope, $location, auth){
            if(!auth.isAuthed()){
               return $location.path('/');
            }

            $scope.user = {};

            $scope.logout = function(){
               auth.logout()
               .then(function(response){
                  $location.path('/');
               })
               .catch(function(error){
                  console.log(error);
               });
            };

            $scope.getMe = function(){
               auth.getMe()
                  .then(function(response){
                     $scope.user = response.data.user;
                     console.log($scope.user);
                  })
                  .catch(function(error){
                     console.log(error);
                  });
            };

         }
      ]
   )
