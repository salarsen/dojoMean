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
   .factory('AnimalFactory',['$http',
      function($http){
         var factory = {};

         factory.getAnimals = function(callback){
            $http.get('/animals')
               .then(function(response){
                  // console.log(response.data);
                  factory.animals = response.data.animals;
                  callback(factory.animals);
               })
               .catch(function(errorResponse){
                  console.log(errorResponse);
               });
         };

         factory.getAnimal = function(index, callback){
            if (factory.animals[index] === undefined){
               factory.getAnimals(function(){
                  callback(factory.animals[index]);
               });
            } else {
               callback(factory.animals[index]);
            }
         };

         return factory;
      }
   ])
   .controller('MainController',
      ['$scope', '$routeParams', 'AnimalFactory',
      function($scope, $routeParams, AnimalFactory){
         $scope.animals = [];

         if($routeParams.id !== undefined){
            AnimalFactory.getAnimal($routeParams.id, function(animal){
               $scope.animal = animal;
               console.log($scope.animal);
            });
         }

         $scope.getAnimals = function(){
            AnimalFactory.getAnimals(function(animals){
               $scope.animals = animals;
            });
         };

         $scope.addAnimal = function(){
            if (!$scope.animal) return;

            $scope.animals.push($scope.animal);
            $scope.animal = '';
         }
      }
   ])
