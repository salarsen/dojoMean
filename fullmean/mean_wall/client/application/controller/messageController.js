angular.module('myApp')
   .controller('messageController',
      ['$scope','$location','AuthService', 'messageFactory', 'commentFactory',
         function($scope, $location, auth, messageFactory, commentFactory){
            if(!auth.isAuthed()){
               console.log('Not Authorized');
               return $location.path('/');
            }

            // console.log(auth.getUser());

            $scope.logout = function(){
               auth.logout()
                  .then(function(response){
                     $location.path('/');
                  })
                  .catch(function(error){
                     console.log(error);
                  });
            };

            $scope.messages = messageFactory.messages;

            $scope.index = function(){
               messageFactory.index();
            }

            $scope.getUser = function(){
               auth.getUser()
                  .then(function(response){
                     $scope.userName = response.data.user.name.first + " " + response.data.user.name.last;
                  })
                  .catch(function(error){
                     console.log(error);
                  });
            }();

            // $scope.getUser();

            $scope.addMessage = function(){
               // console.log('addMessage:',$scope.newMessage);
               messageFactory.create($scope.newMessage);
               $scope.newMessage = '';
            }

            $scope.addComment = function(messageID){
               // console.log('AddComment:',messageID);
               var message = $scope.messages.find(function(message){
                  return message._id === messageID;
               });

               if(message){
                  //pass scope.index to rebuild page after create comment
                  commentFactory.createComment(messageID, message.newComment, $scope.index);
                  message.newComment = '';
               }
               // console.dir($scope);
               // $scope.newComment = '';
            }

            $scope.getComments = function(messageID){
               // console.log(messageID);
               var message = $scope.messages.find(function(message){
                  return message._id === messageID;
               });
               if(message){
                  commentFactory.getComments(messageID, function(comments){
                     message._comments = comments;
                  });
               }
                  // .then(function(response){
                  //    console.log(response);
                  // })
                  // .catch(console.log);
            };
         }
      ]
   )
