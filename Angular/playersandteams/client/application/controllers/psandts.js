angular.module('app')
   .controller('PlayersController',
      ['$scope','PlayerFactory',
      function($scope, PlayerFactory){

         $scope.players = [];

         $scope.getPlayers = () => {
            PlayerFactory.getPlayers(function(players){
               $scope.players = players;
            });
         };

         $scope.addPlayer = () => {
            PlayerFactory.addPlayer($scope.player);
            $scope.player = '';
         };

         $scope.removePlayer = (index) => {
            PlayerFactory.removePlayer(index);
         }
   }])
   .controller('TeamsController',
      ['$scope','TeamFactory',
      function($scope,TeamFactory){
         $scope.teams = [];

         $scope.getTeams = () => {
            TeamFactory.getTeams(function(teams){
               $scope.teams = teams;
            });
         };

         $scope.addTeam = () => {
            TeamFactory.addTeam($scope.team);
            $scope.team = {};
         }

         $scope.removeTeam = (index) => {
            TeamFactory.removeTeam(index);
         }
   }])
   .controller('AssociationsController',
      ['$scope','PlayerFactory','TeamFactory',
      function($scope,PlayerFactory,TeamFactory){
         $scope.teams = [];
         $scope.players = [];

         $scope.getPlayers = () => {
            PlayerFactory.getPlayers(function(players){
               $scope.players = players;
            });
         };

         $scope.getTeams = () => {
            TeamFactory.getTeams(function(teams){
               $scope.teams = teams;
            });
         };

         $scope.assignPlayer = () => {
            PlayerFactory.addPlayerToTeam($scope.player);
            $scope.player = {};
         }

         $scope.clearAssignment = (index) => {
            PlayerFactory.removePlayerFromTeam(index);
         }

   }]);
