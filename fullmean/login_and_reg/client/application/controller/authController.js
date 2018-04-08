angular.module('myApp')
   .controller('authController',
      ['$scope','$location','UserService','AuthService',
         function($scope, $location, userService, auth){
            $scope.errors = [];
            if(auth.isAuthed()){
               return $location.path('/dashboard');
            }

            $scope.register = function(){
               userService.register($scope.newUser, $scope.passwordConf)
                  .then(function(response){
                     if(response.data.success){
                        $location.path('/dashboard');
                     } else {
                        // check if we have a new user object before attempting to reset password
                        if($scope.newUser !== undefined ) {
                           $scope.newUser.password = '';
                           $scope.passwordConf = '';
                        }
                        $scope.errors = response.data.errors;
                     }
                  })
                  .catch(function(error){
                     console.log('Register error:',error);
                  });
            };

            $scope.login = function(){
               userService.login($scope.user)
                  .then(function(response){
                     if(response.data.success){
                        $location.path('/dashboard');
                     } else {
                        // check if we have a user object before attempting to reset password
                        if($scope.user !== undefined){
                           $scope.user.password = '';
                        }
                        $scope.errors = response.data.errors;
                     }
                  })
                  .catch(function(error){
                     console.log('Login error:',error);
                  });
            };
         }
      ]
   )
