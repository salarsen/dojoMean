const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

app.set('views',path.resolve('views'));
app.set('view engine','ejs');

app.get('/',function(request,response){
   response.render('index');
});

const server = app.listen(port, function(){
   console.log(`Server listening on port ${port}`);
});

const io = require('socket.io').listen(server);

var users = [];
var chat = [];

io.sockets.on('connection',function(socket){
   console.log('Sockets engaged');
   console.log(socket.id);
   socket.on('new_user',function(data){
      users.push(data.reason);
      io.emit('user_response', {response : {users : users.join(', '), user : data.reason}});
   });
   socket.on('chat_add',function(data){
      // console.log(data.reason);
      io.emit('chat_response', {response : `<p>${data.reason.user} : ${data.reason.userText}</p>`});
   });
   socket.on('remove_user',function(data){
      // console.log(data.reason);
      var i = users.indexOf(data.reason);
      if( i != -1){
         users.splice(i,1);
         io.emit('remove_response', {response : {users : users, user_update : `${data.reason} left the chat.`}});
      }
   })
});
