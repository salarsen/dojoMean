const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8000;

const Schema = mongoose.Schema;

const app = express();

app.use(express.static(path.resolve('static')));
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

app.set('view engine','ejs');
app.set('views',path.resolve('views'));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/messageboard');

mongoose.connection.on('connected',function(){
    console.log('MongoDB connected');
});

const messageSchema = new Schema({
   creator : {
      type: String,
      required: true,
      minlength:4
   },
   message : {
      type : String,
      required: true
   },
   createdDate : {
      type: Date,
      default: Date.now
   },
   comments : [{
      type: Schema.Types.ObjectId,
      ref : 'Comment'
   }]
});

const commentSchema = new Schema({
   commentor : {
      type: String,
      required: true,
      minlength : 4
   },
   comment : {
      type: String,
      required: true
   },
   createdDate : {
      type : Date,
      default : Date.now
   },
   _message : {
      type: Schema.Types.ObjectId,
      ref: 'Message'
   }
});

const Message = mongoose.model('Message',messageSchema);
const Comment = mongoose.model('Comment',commentSchema);

app.get('/',function(request, response){
   Message.find({})
      .populate('comments')
      .exec()
      .then(function(messages){
         // console.log(messages);
         response.render('index',{messages});
      })
      .catch(function(error){
         response.json(error);
      });
})
.post('/message',function(request,response){
   Message.create(request.body)
      .then(function(new_message){
         console.log(new_message);
         response.redirect('/');
      })
      .catch(function(error){
         response.json(error);
      });
})
.post('/comment/:id',function(request,response){
   request.body._message = request.params.id;
   Comment.create(request.body)
   // Comment.create({request.body, {_message:request.params.id}}) // this does not work so be warned...just an idea
      .then(function(new_comment){
         return Message.update({_id: request.params.id},{$push : {comments : new_comment.id}})
            .then(function(message_update){
               response.redirect('/');
            });
      })
      .catch(function(error){
         response.json(error);
      });

   // Message.findById({_id : request.params.id},function(err,message){
   //    var comment = new Comment(request.body);
   //    comment._message = request.params.id;
   //    message.comments.push(comment);
   //    comment.save(function(err){
   //       message.save(function(err){
   //          if(err){ console.log(err);}
   //          else {response.redirect('/');}
   //       });
   //    });
   // });

});

app.listen(port,function(){
    console.log(`Listening on port ${port}`);
});
