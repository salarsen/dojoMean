const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

app.set('views',path.resolve('views'));
app.set('view engine','ejs');

app.get('/',function(request,response){
   response.render('index');
});

const server = app.listen(port,function(){
   console.log(`Server listening on port ${port}`);
});

const io = require('socket.io').listen(server);

var count = 0;

io.sockets.on('connection',function(socket){
   //sets count up for new users
   socket.emit('server_response', {response : `The button has been pushed ${count} time(s)`});

   socket.on('increase_count',function(data){
      count++;
      console.log(`${data.reason} - count is: ${count}`);
      io.emit('server_response', {response : `The button has been pushed ${count} time(s)`});
   });
   socket.on('reset_count',function(data){
      count = 0;
      console.log(`${data.reason} - count is: ${count}`);
      io.emit('server_response', {response : `The button count has been reset to ${count}`});
   });
});
