/* UDP server talks to Arduino */
var dgram = require('dgram');
var udpServer = dgram.createSocket('udp4')
var ARDUINO_UDP_PORT = 7000;
var ARDUINO_LISTENING_AT= 5000;
var ARDUINO_ADDRESS = '192.168.1.7';

/* HTTP server talks to browser */
const http = require('http')
const express = require('express'); // web server application
const app = express();        // instantiate express server
const httpServer = http.Server(app);  // connects http library to server
const HTTP_SERVER_PORT = 8000; 

// Express creates the simple web page
// The argument says where to find pages and scripts
app.use(express.static('public'));  

// websockets so that webpage can talk back to server
const webSocket = require('socket.io')(httpServer);  

/* UDP server callback functions */

function UDPServerIsListening() {
	console.log('UDP Server is listening');
}

function UDPServerReceivedMessage(message, sender) {

	// print the message
	console.log(
		'Received message from: ' +
		sender.address + 
		':' + 
		sender.port);
	console.log(
		'Message length: ' +
		message.length + 
		' Message contents: ' +
		message);
}

/* Register the UDP callback functions */
udpServer.bind(ARDUINO_UDP_PORT );
udpServer.on('listening', UDPServerIsListening);
udpServer.on('message', UDPServerReceivedMessage);

/* HTTP callback functions */

httpServer.listen(HTTP_SERVER_PORT, () => {
	console.log('httpServer: Listening at', httpServer.address());
});

httpServer.on('connection', (socket) => {
  console.log("httpServer: An HTTP client has connected")
});


/* and here is the websocket event handler */

webSocket.on('connect', function (socket) {
    console.log('Web server socket: Client connected');

    socket.on('Data added', function ({namePerson, email}) {
      var data = {person: namePerson, emailAddress: email};
      var dataJSON = JSON.stringify(data);
      console.log('Web server socket: received DATA ADDED message from web client');

      var fs = require('fs');
	  fs.writeFile('userData.json', dataJSON, 'utf8', (err) => {
  		if (err) throw err;
  	 	console.log('The file has been saved!');
  	  });

  	  //how do I append/concatenate new users to the JSON file, so that every email alert can be sent to all users?
  	  // email code is missing for now
  	  
  	  var obj;
	  fs.readFile('userData.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  	obj = JSON.parse(data);
	  	console.log(obj)
	  });
    });

    socket.on('Show data', function () {
      var showData= new Buffer('Show data');
      console.log('Web server socket: received SHOW DATA message from web client');

      // use socket.emit() to send arduino readings to client.js???
      // how to I access the data from arduino?

});
