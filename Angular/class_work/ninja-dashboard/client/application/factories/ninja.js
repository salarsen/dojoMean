angular.module('app')
   .factory('ninjaFactory', ['$http', function($http){
      const factory = {};

      factory.ninjas = [];

      // pass callback or utilize promise pattern
      factory.createNinja = function(ninja, callback){
         $http.post('/ninjas',ninja)
            .then(function(response){
               if(response.data.success){
                  factory.ninjas.push(response.data.ninja);
                  return callback(response.data.ninja)
               }

               // handle no success here...
            })
            .catch(function(errorResponse){
               console.log(errorResponse);
            })
      };

      factory.getNinjas = function(callback){
         $http.get('/ninjas')
            .then(function(response){
               console.log(response.data);
               if(response.data.success){
                  factory.ninjas = response.data.ninjas;
                  return callback(response.data.ninjas);
               }
            })
            .catch(function(errorResponse){
               console.log(errorResponse);
            });
      };

      factory.getNinja = function(id, callback){
         const ninja = factory.ninjas.find( ninja => ninja._id === id);

         if(ninja){
            return callback(ninja);
         }

         $http.get(`/ninjas/${id}`)
            .then(function(response){
               if (response.data.success){
                  callback(response.data.ninja);
               } else {
                  callback(false);
               }
            })
            .catch(function(errorResponse){
               callback(false);
            });
      }
      return factory;
   }])
