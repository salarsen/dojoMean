angular.module('myApp')
   .service('AuthService', ['$cookies', '$http', function($cookies, $http){
      this.isAuthed = function(){
         var expires = $cookies.get('expiration');

         return expires && expires > Date.now();
      };

      this.getMe = function(){
         return $http.get('/user/' + $cookies.get('userID'));
      }

      this.logout = function(){
         return $http.delete('/logout/' + $cookies.get('userID'));
      };
   }]);
