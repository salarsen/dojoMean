angular.module('myApp')
   .factory('productFactory',['$http', function($http){
      var factory = {};
      var products = [{
         name : 'Laptop',
         price: 2000,
         qty: 50,
      },
      {
         name : 'Broom',
         price : 30,
         qty : 50,
      },
      {
         name : 'Pencil',
         price: 2,
         qty : 50,
      },
      {
         name : 'Film',
         price: 20,
         qty : 50,
      }];

      factory.getProducts = function(callback){
         callback(products);
      }

      factory.addProduct = function(name, price, callback){
         products.push({
            name : name,
            price : price,
            qty : 50,
         });
         callback(products);
      }

      factory.deleteProduct = function(index,callback){
         products.splice(index,1);
      }

      factory.buyProducts = function(index){
         if(products[index].qty > 0){
            products[index].qty--;
         }
      }
      return factory;
   }]);
