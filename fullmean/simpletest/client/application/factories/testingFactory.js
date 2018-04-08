angular.module('myApp')
   .factory('testingFactory',['$http',function($http){
      console.log('Factory loaded');

      const factory = {};

      factory.testVar = 'This is the inital var';

      factory.processIt = function(callback){
         // callback(true);
         console.log('Factory testVar',factory.testVar);
         factory.testVar = 'We got a positive result';
         console.log('Changed',factory.testVar);
         callback(true);
      };

      return factory;
   }]);
