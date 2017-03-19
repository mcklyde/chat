var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

function room(id) {
	this.id = id;
	this.users = 1;
}

var roomLimit = 5;
var rooms = [];
var roomExists = false;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', function(socket){
	console.log('User ' + socket.id + ' connected');
	socket.on('disconnect', function(){
		console.log('User ' + socket.id + ' disconnected');
	});

    socket.on('room', function(roomid) {
				for (i = 0; i < rooms.length; i++) {
					if (rooms[i].id == roomid) {
						roomExists = true;
						if (rooms[i].users < roomLimit) {
							rooms[i].users++;
							socket.join(roomid);
						}
						else {
							socket.emit('joinFailed', "room is full");
							console.log('room ' + roomid + ' is full');
						}

					}
				}
				if (!roomExists) {
					rooms.push(new room(roomid))
					socket.join(roomid);
				}
				roomExists = false;
				console.log(rooms[0].users);

    });
    socket.on('chat message', function(data){
        io.in(data.roomId).emit('chat message', data.msg);
    });
});

http.listen(3000, function(){
    console.log('server listening on *:3000');
});
