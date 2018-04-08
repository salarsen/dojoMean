app.controller('newController', ['$scope','$location','userFactory', function($scope,$location,userFactory) {
  $scope.addUser = function(){
    userFactory.create($scope.user,function(){
      console.log($scope.user);
      $location.url('/index')
   })
  }
}]);
