angular.module('myApp')
   .controller('testingController',
      ['$scope','$location','testingFactory',
         function($scope, $location, testingFactory){

            console.log('Controller loaded');

            // $scope.testVar = 'This is the initial var';
            $scope.testVar = testingFactory.testVar;

            $scope.processTest = function(){
               testingFactory.processIt(function(result){
                  if(result){
                     console.log(result);
                     // $scope.testVar = 'We got a positive result';
                     $location.path('/');
                  }
               });
            };

         }
      ]
   );
