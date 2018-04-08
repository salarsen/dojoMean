const Comment = require('mongoose').model('Comment');
const User = require('mongoose').model('User');
const Message = require('mongoose').model('Message');

module.exports = {
   create(request,response){
      const userPromise = User.findById(request.cookies.userID);
      const messagePromise = Message.findById(request.body.messageID);

      if(!request.body.comment) return response.json({ success : false, errorMessage : 'Comments cannot be blank!'});

      Comment.create({ comment : request.body.comment, _user : request.cookies.userID, _message : request.body.messageID})
         .then(function(comment){

            return messagePromise
               .then(function(message){
                  message._comments.push(comment);
                  message.save();

                  return userPromise
                     .then(function(user){
                        user._comments.push(comment);
                        user.save();
                        response.json(comment);
                     });
               });

         })
         .catch(function(error){
            console.log(error);
            response.status(500).json(error);
         });
   },
   // getComments(request,response){
   //    // console.log('server getcomments:',request.params.id);
   //    // response.json({success: true});
   //    Comment.find({_message : request.params.id})
   //       .populate('_user','name')
   //       .then(function(comments){
   //          response.json(comments);
   //       })
   //       .catch(function(error){
   //          console.log(error);
   //          response.json(error);
   //       });
   // },
}
