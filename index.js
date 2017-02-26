
//yes this is more or less plagiarized but this is the basic idea of a node js server

// content of index.js
const http = require('http')  
const port = 1234

const requestHandler = (request, response) => {  
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler);

server.listen(1234, (err) => {
    console.log((new Date()) + ' Server is listening on port 1234');
});

var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(r){
    var connection = r.accept('echo-protocol', r.origin);
	var count = 0;
	var clients = {};
	var id = count++;
	clients[id] = connection
	 console.log((new Date()) + ' Connection accepted [' + id + ']');
	 
	 connection.on('message', function(message) {

		// The string message that was sent to us
		var msgString = message.utf8Data;

		// Loop through all clients
		for(var i in clients){
			// Send a message to the client with the message
			clients[i].sendUTF(msgString);
		}
	 });
	
	connection.on('close', function(reasonCode, description) {
		delete clients[id];
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
	});
});

