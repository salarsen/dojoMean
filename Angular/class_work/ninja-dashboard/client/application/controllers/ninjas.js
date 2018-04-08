angular.module('app')
   .controller('ninjaController',
      ['$scope', '$routeParams', '$location', 'ninjaFactory',
      function($scope, $routeParams, $location, ninjaFactory){
      // $scope.ninjas = [{
      //    name : 'Spencer',
      //    age : 28,
      //    language : 'Javascript',
      //    blackbelt : false,
      // }];

      $scope.languages = ['Javascript','Ruby','Python','PHP','C++'];

      $scope.ninjas = [];

      $scope.addNinja = () => {
         console.log('adding ninja');
         ninjaFactory.createNinja($scope.ninja, function(ninja){
            $scope.ninjas.push(ninja);
         });

         $scope.ninja = {};
      };

      $scope.getNinjas = function(){
         ninjaFactory.getNinjas(function(ninjas){
            $scope.ninjas = ninjas;
         });
      };

      $scope.getNinja = function(){
         const ninjaID = $routeParams.id;

         let ninja = $scope.ninjas.find(function(ninja){
            return ninja._id === ninjaID;
         });

         console.log(ninja);

         if(ninja){
            $scope.ninja = ninja;
         } else {
            ninjaFactory.getNinja(ninjaID, function(ninja){
               console.log(ninja);
               if(ninja){
                  $scope.ninjas.push(ninja);
                  $scope.ninja = ninja;
               } else {
                  $location.url('/ninjas');
               }
            })
         }
      };
   }]);
