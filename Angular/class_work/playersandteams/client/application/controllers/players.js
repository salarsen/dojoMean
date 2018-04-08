angular.module('app')
   .controller('PlayersController',
      ['$scope','$location','$routeParams','PlayerFactory',
      function($scope, $location, $routeParams, PlayerFactory){
         // console.log('scope loaded');
         $scope.players = PlayerFactory.players;

         $scope.index = function(){
            PlayerFactory.index();
         };

         $scope.getPlayer = function(){
            var id = $routeParams.id;

            PlayerFactory.getPlayer(id, function(player){
               $scope.player = player;
            });
         };

         $scope.create = function(){
            console.log($scope.newPlayer);
            PlayerFactory.create($scope.newPlayer, function(player){
               //do things here...
            });

            //reset form
            $scope.newPlayer = {};
         };

         $scope.update = function(){
            PlayerFactory.update($scope.player, function(player){
               PlayerFactory.getPlayer(player._id, function(player){
                  var index = $scope.players.indexOf(player);

                  $scope.players[index] = player;
               });
            });
         };

         $scope.editPlayer = function(){
            var player = $scope.players.find(function(player){
               return player._id === $routeParams.id;
            });

            if(player){
               $scope.player = player;
            } else {
               PlayerFactory.getPlayer($routeParams.id, function(player){
                  $scope.player = player;
               });
            }
         }

         $scope.destroy = function(id){
            PlayerFactory.destroy(id, function(success){
               //do things here...
               $location.path('/players');
            });
         }
      }
   ]
);
