angular.module('myApp')
   .factory('UserFactory',['$http', function($http){
      const factory = {};

      factory.users = [];

      factory.getUsers = function(callback){
         callback(factory.users);
      };

      factory.addUser = function(user){
         factory.users.push(user);
         // console.log('here');
      }

      factory.deleteUser = function(index){
         factory.users.splice(index,1);
      }

      return factory;
   }]);
