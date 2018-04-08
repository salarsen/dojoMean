const express = require('express');
const path = require('path');
const parser = require('body-parser'); // needed?
const querystring = require('querystring');
const port = process.env.PORT || 8000;

const app = express();

// app.use(express.static(path.resolve('static'))); //no static content to serve...
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

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
   console.log('Sockets engaged!');
   console.log(socket.id);
   socket.on('form_submitted',function(data){
      var parsedData = querystring.parse(data.reason);
      socket.emit('server_response', {response: `<p>You emitted the following information to the server: { name: '${parsedData.name}', location: '${parsedData.location}', language: '${parsedData.language}', comment: '${parsedData.comment}'}</p>`});

      var lucky_number = Math.floor(Math.random()*1000) + 1;
      socket.emit('random_number', {response : `<p>Your lucky number emitted by the server is ${lucky_number}</p>`});
   });
});
