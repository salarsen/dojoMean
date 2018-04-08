angular.module('myApp',[])
   .factory('productFactory',['$http', function($http){
      var factory = {};
      var products = [{
         name : 'Laptop',
         price: 2000,
      },
      {
         name : 'Broom',
         price : 30,
      },
      {
         name : 'Pencil',
         price: 2,
      },
      {
         name : 'Film',
         price: 20,
      }];

      factory.getProducts = function(callback){
         callback(products);
      }

      factory.addProduct = function(name, price, callback){
         products.push({
            name : name,
            price : price
         });
         callback(products);
      }

      factory.deleteProduct = function(index,callback){
         products.splice(index,1);
      }
      return factory;
   }])
   .controller('mainController', ['$scope','productFactory',function($scope, productFactory){
      $scope.products = [];
      $scope.sortTarget = '';
      $scope.sortDirection = false;
      // $scope.addProduct = function(){
      //    if(!$scope.name || !$scope.price) return;
      //
      //    $scope.products.push({
      //       name : $scope.name,
      //       price : $scope.price
      //    });
      //    $scope.name = '';
      //    $scope.price = '';
      // };
      $scope.addProduct = function(){
         productFactory.addProduct($scope.name,$scope.price,function(data){
            $scope.products = data;
            $scope.name = '';
            $scope.price = '';
         });
      }
      productFactory.getProducts(function(data){
         $scope.products = data;
      });
      $scope.deleteProduct = function(index){
         productFactory.deleteProduct(index);
      };
      $scope.reSort = function(target){
         $scope.sortTarget = target;
         $scope.sortDirection = !$scope.sortDirection; //set sort to opposite of current
      };
   }]);
