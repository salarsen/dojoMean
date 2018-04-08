angular.module('app')
   .factory('FriendFactory',['$http',function($http){
      const factory = {};

      factory.friends = [];

      factory.index = function(){
         $http.get('/friends')
            .then(function(response){
               Object.assign(factory.friends, response.data);
            })
            .catch(function(error){
               console.log(error);
            });
      }

      factory.create = function(friend){
         $http.post('/friends',friend)
            .then(function(response){
               factory.friends.push(response.data);
            })
            .catch(function(error){
               console.log(error);
            });
      }

      factory.update = function(friend, callback){
         $http.put('/friends/' + friend._id, friend)
            .then(function(response){
               callback(response.data);
            })
            .catch(function(error){
               console.log(error);
            });
      }

      factory.getFriend = function(id, callback){
         var friend = factory.friends.find(function(friend){
            return friend._id === id;
         })

         if(friend){
            return callback(friend);
         }

         // if not in factory, fetch from db
         $http.get('/friends/' + id)
            .then(function(response){
               callback(response.data);
            })
            .catch(function(error){
               console.log(error);
            });
      }

      factory.destroy = function(id, callback){
         // remove from db first, on success, remove from factory
         $http.delete('/friends/' + id)
            .then(function(response){
               if(response.data){
                  factory.getFriend(id, function(friend){
                     var index = factory.friends.indexOf(friend);
                     factory.friends.splice(index, 1);
                  });
               }
               callback(response.data);
            })
            .catch(function(error){
               console.log(error);
            });
      }

      return factory;
   }])
