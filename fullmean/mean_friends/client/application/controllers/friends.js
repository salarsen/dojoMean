angular.module('app')
   .controller('FriendsController',
      ['$scope','$location','$routeParams','$filter','FriendFactory',
      function($scope, $location, $routeParams, $filter, FriendFactory){
         console.log(`Controller loaded`);
         // $scope.friends = [
         //    {
         //       name : 'Spencer',
         //       age : '28',
         //       sex : 'Male',
         //       friends : 'People here',
         //    },
         //    {
         //       name : 'Julia',
         //       age : '28',
         //       sex : 'Female',
         //       friends : 'Plenty',
         //    },
         // ];

         $scope.friends = FriendFactory.friends;

         $scope.index = function(){
            FriendFactory.index();
         }

         $scope.create = function(){
            FriendFactory.create($scope.friend)
            $location.url('/');
         }

         $scope.update = function(){
            FriendFactory.update($scope.friend, function(friend){
               FriendFactory.getFriend(friend._id, function(friend){
                  var index = $scope.friends.indexOf(friend);

                  $scope.friends[index] = friend;
                  $location.url('/');
               });
            });
         }

         $scope.getFriend = function(){
            var friend = $scope.friends.find(function(friend){
               return friend._id === $routeParams.id;
            })

            if(friend){
               $scope.friend = friend;
               $scope.friend.birthday = new Date(friend.birthday);
               // $scope.friend.birthday = $filter('date')($scope.friend.birthday,"MM/dd/yyyy");
            } else {
               FriendFactory.getFriend($routeParams.id, function(friend){
                  $scope.friend = friend;
                  $scope.friend.birthday = new Date(friend.birthday);
                  // $scope.friend.birthday = $filter('date')($scope.friend.birthday,"MM/dd/yyyy");
               });
            }
         }


         $scope.destroy = function(id){
            FriendFactory.destroy(id, function(success){
               $location.path('/');
            });
         }

      }
   ]);
