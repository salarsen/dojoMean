const express = require('express');
const path = require('path');
const port = process.env.port || 8000;

const app = express();

app.set('views', path.resolve('views'));
// app.use(express.static(__dirname + "/static"));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.render('index');
});

const server = app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});

const io = require('socket.io').listen(server);

var users = [];
var chat = [];
var game = [];

var mapDefault = [
    [1,0,1],
    [1,1,1],
    [1,-1,1]
];

io.on('connection', function (socket) {
    // console.log(socket);
    console.log(`Sockets engaged: ${socket.id}`);
    socket.on('new_user', function (request){
        // console.log(request);
        users.push(request.data);
        io.emit('user_response', {
            'response' : {
                'users' : users.join(', '), 
                'name' : request.data,
                'id' : socket.id,
            }
        });
    });

    socket.on('chat_add', function(data){
        io.emit('chat_response', { response: `<p>${data.reason.user} : ${data.reason.userText}</p>`});
    });

    socket.on('user_world_add', function(request){
        console.log(request.world);
        socket.broadcast.emit('new_user_world', request);
    })

    socket.on('movement',function(request){
        // console.log('movement',request);
    })

    socket.on('user_start', function(data){
        // console.log(data)
    })

    socket.on('remove_user', function (data) {
        console.log(data.user);
        var i = users.indexOf(data.user);
        console.log(i)
        if (i != -1) {
            users.splice(i, 1);
            io.emit('remove_user_res', { id: data.playerId });
        }
    })
});