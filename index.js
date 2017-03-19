var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', function(socket){
    console.log('User ' + socket.id + ' connected');
    socket.on('disconnect', function(){
        console.log('User ' + socket.id + ' disconnected');
    });
    socket.on('room', function(roomid) {
        socket.join(roomid, function() {
            console.log(socket.id + ' has joined a room ' + roomid);
            io.to('roomid', 'a new user has joined');
        });

    });
    socket.on('chat message', function(data){
        io.in(data.roomId).emit('chat message', data.msg);
    });
});

http.listen(3000, function(){
    console.log('server listening on *:3000');
});
