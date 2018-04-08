const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

app.use(express.static(path.resolve('static')));

app.set('views',path.resolve('views'));
app.set('view engine','ejs');

app.get('/',function(request,response){
   response.render('index');
});

const server = app.listen(port, function(){
   console.log(`Server listening on port ${port}`);
});

const io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){
   //  EMIT:
   socket.emit('my_emit_event');
   //  BROADCAST:
   socket.broadcast.emit("my_broadcast_event");
   //  FULL BROADCAST:
   io.emit("my_full_broadcast_event");
   console.log("Sockets engaged!");
   console.log(socket.id);
   socket.on('button_clicked',function(data){
      console.log(`Someone clicked a button! Reason: ${data.reason}`);
      socket.emit('server_response',{response:'sockets are the best'});
   });
});
