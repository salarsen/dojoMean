angular.module('app')
   .factory('PlayerFactory',['$http',function($http){
      const factory = {};

      factory.players = [];

      console.log(`player factory hit`);

      factory.index = function(){
         $http.get('/players')
            .then(function(response){
               // factory.players.concat(response.data.players);
               Object.assign(factory.players, response.data);
            })
            .catch(function(error){
               console.error(error);
            });
      }

      factory.create = function(player, callback){
         $http.post('/players', player)
            .then(function(response){
               factory.players.push(response.data);
               callback(response.data);
            })
            .catch(function(error){
               console.error(error);
            });
      }

      factory.update = function(player, callback){
         $http.put('/players/' + player.id, player)
            .then(function(response){
               callback(response.data);
            })
            .catch(function(error){
               console.error(error);
            });
      }

      factory.getPlayer = function(id, callback){
         var player = factory.players.find(function(player){
            return player._id === id;
         })

         if(player){
            return callback(player);
         }

         $http.get('/players/' + id)
            .then(function(response){
               callback(response.data);
            })
            .catch(function(error){
               console.error(error);
            });
      }

      factory.destroy = function(id, callback){
         $http.delete('/players/' + id)
            .then(function(response){
               if(response.data){
                  factory.getPlayer(id, function(player){
                     var index = factory.players.indexOf(player);
                     factory.players.splice(index,1);
                  });
               }

               callback(response.data);
            })
            .catch(function(error){
               console.error(error);
            });
      }

      return factory;
   }]);
