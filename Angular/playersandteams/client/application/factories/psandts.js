angular.module('app')
   .factory('PlayerFactory',[function(){
      const factory = {};

      // factory.players = [{
      //    name : 'Spencer',
      //    team : 'Seahawks',
      // },{
      //    name : 'Julia',
      //    team : 'Seahawks',
      // }];

      factory.players = [];

      factory.getPlayers = function(callback){
         callback(factory.players);
      }

      factory.addPlayer = function(player){
         factory.players.push({ name : player, team : ''});
      }

      factory.removePlayer = function(index){
         factory.players.splice(index,1);
      }

      factory.addPlayerToTeam = function(player){
         factory.players[player.id].team = player.team;
      }

      factory.removePlayerFromTeam = function(index){
         factory.players[index].team = '';
      }

      return factory;
   }])
   .factory('TeamFactory',[function(){
      const factory = {};

      // factory.teams = [
      //    { name : 'Seahawks' },
      //    { name : 'Patriots' },
      // ];

      factory.teams = [];

      factory.getTeams = function(callback){
         callback(factory.teams);
      }

      factory.addTeam = function(team){
         factory.teams.push(team);
      }

      factory.removeTeam = function(index){
         factory.teams.splice(index,1);
      }

      return factory;
   }])
