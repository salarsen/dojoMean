angular.module('myApp')
   .controller('productController',
      ['$scope','productFactory',
      function($scope, productFactory){
      $scope.products = [];
      $scope.sortTarget = '';
      $scope.sortDirection = false;

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
      }
   }])
   .controller('orderController',
      ['$scope', 'productFactory',
      function($scope,productFactory){
         productFactory.getProducts(function(data){
            $scope.products = data;
         });
         $scope.buyProduct = function(index){
            productFactory.buyProducts(index);
         };

         $scope.reSort = function(target){
            $scope.sortTarget = target;
            $scope.sortDirection = !$scope.sortDirection; //set sort to opposite of current
         };
   }]);
