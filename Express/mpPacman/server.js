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

io.sockets.on('connection', function (socket) {
    console.log(`Sockets engaged: ${socket.id}`);
    socket.on('new_user', function (request){
        console.log(request);
        users.push(request.data);
        io.emit('user_response', {
            'response' : {
                'users' : users.join(', '), 
                'name' : request.data,
                'id' : socket.id,
            }
        });
    });

    socket.on('movement',function(request){
        console.log('movement',request);
    })

    socket.on('user_start', function(data){
        console.log(data)
    })
});