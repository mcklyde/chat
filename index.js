var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', function(socket){
<<<<<<< HEAD
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
=======
	console.log('User ' + socket.id + ' connected');
	socket.on('disconnect', function(){
		console.log('User ' + socket.id + ' disconnected');
	});
	socket.on('room', function(roomid) {
		socket.join(roomid, function() {
			console.log(socket.id + ' has joined a room ' + roomid);
			socket.to(roomid).emit('chat message', 'a new user has joined');
		});	
	socket.on('chat message', function(msg, username){
		io.in(roomid).emit('chat message', msg);
		});
	});		
	
>>>>>>> d3c30e7a0676bac57e7669102bf5e89a691910c3
});

http.listen(3000, function(){
    console.log('server listening on *:3000');
});
