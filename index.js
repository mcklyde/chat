var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', function(socket){
	console.log('A user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
	});
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
	console.log('server listening on *:3000');
});