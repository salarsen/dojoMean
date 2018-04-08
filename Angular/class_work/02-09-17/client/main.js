angular.module('app',['ngRoute'])
   .config(['$routeProvider',
      function($routeProvider){
         $routeProvider
            .when('/',{
               templateUrl : 'views/_index.html',
               controller : 'MainController'
            })
            .when('/animals', {
               templateUrl : 'views/_animal_list.html',
               controller : 'MainController'
            })
            .when('/animals/:id',{
               templateUrl : 'views/_animal.html',
               controller : 'MainController',
            })
      }
   ])
   .controller('MainController',
      ['$scope', '$routeParams',
      function($scope, $routeParams){
         console.dir($routeParams);
         $scope.animals = ['Cat','Dog','mouse'];

         if($routeParams.id !== undefined){
            $scope.animal = $scope.animals[$routeParams.id];
         }

         $scope.addAnimal = function(){
            if (!$scope.animal) return;

            $scope.animals.push($scope.animal);
            $scope.animal = '';
         }
   }])
