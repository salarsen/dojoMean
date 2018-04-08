angular.module('myApp')
   .factory('messageFactory',['$http',function($http){
      const factory = {};

      factory.messages = [];

      factory.index = function(){
         $http.get('/messages')
            .then(function(response){
               // console.log(response.data);
               Object.assign(factory.messages, response.data);
            })
            .catch(console.log);
      };

      factory.create = function(message, user){
         // console.log('factory:',message);

         $http.post('/message', { message : message})

            .then(function(response){
               // console.log('Create response:',response.data);
               // factory.messages.push(response.data);
               factory.index();
            })
            .catch(console.log);
      };

      // no delete or update needed currently

      return factory;
   }]);
