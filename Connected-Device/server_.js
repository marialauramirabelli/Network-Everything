/* UDP server talks to Arduino */
var dgram = require('dgram');
var udpServer = dgram.createSocket('udp4')
var ARDUINO_UDP_PORT = 7000;
var ARDUINO_LISTENING_AT= 5000;
var ARDUINO_ADDRESS = '192.168.1.44';

/* HTTP server talks to browser */
const http = require('http')
const express = require('express'); // web server application
const app = express();        // instantiate express server
const httpServer = http.Server(app);  // connects http library to server
const HTTP_SERVER_PORT = 8000; 


var sensorValue;
var state;
var statePrev = -1;

// Express creates the simple web page
// The argument says where to find pages and scripts
app.use(express.static('public'));  

// websockets so that webpage can talk back to server
const webSocket = require('socket.io')(httpServer);  

var fs = require('fs');
var nodemailer = require('nodemailer');
const smmdEmail = 'succulentmmd@gmail.com';

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: smmdEmail,
        pass: 'SMMDnetworkeverything'
    }
});

var mailOptions = {
  from: smmdEmail, // sender address
  to: "", // list of receivers
  subject: "", // Subject line
  html: "" // plain text body
};

function defineMessageReceiver(name, email, typeOfEmail){
	mailOptions["to"] = email;
	if(typeOfEmail == "alert"){
	  mailOptions["html"] = '<p>Hi ' + name + ', we just watered your succulent!<br><br>'+
	  'MAKE SURE you refill the water container as soon as you can. You do not want to be a plant murderer! '+
	  'Do you???<br><br>'+
	  'You can check the moisture level of your succulent any time you want going to this link: '+ 
	  '<a href="url">192.168.1.9:8000</a></p>';;
	  mailOptions["subject"] = "Time to Refill Water!";
	}
	else if(typeOfEmail == "confirmation"){
	  mailOptions["html"] = '<p>Hi ' + name + ', we have added you to our database.<br><br>'+
	  'You made the right choice. You are fighting the good fight. Good for you! '+
	  'Your only task is to make sure that the water container is always at full capacity. That should be easy. '+
	  'Do not mess it up.<br><br>'+
	  'You can check the moisture level of your succulent any time you want going to this link: '+ 
	  '<a href="url">192.168.1.9:8000</a></p>';
	  mailOptions["subject"] = "Hello Caretaker!";
	}
	
}

function sendEmail(){
	transporter.sendMail(mailOptions, function (err, info) {
	   if(err)
	     console.log(err)
	   //else
	     //console.log(info);
	});
}

/* UDP server callback functions */

function UDPServerIsListening() {
	console.log('UDP Server is listening');
}

function UDPServerReceivedMessage(message, sender) {

	// print the message
	// console.log(
	// 	'Received message from: ' +
	// 	sender.address + 
	// 	':' + 
	// 	sender.port);
	// console.log(
	// 	'Message length: ' +
	// 	message.length + 
	// 	' Message contents: ' +
	// 	message);

	var bufferJson = JSON.stringify(message);
	var bufferJson2 = JSON.parse(bufferJson);
	var bufferJsonData = JSON.stringify(bufferJson2.data);
	var bufferJsonSub = bufferJsonData.substr(1)
	var bufferJsonSub2 = bufferJsonSub.slice(0, -1);
	var bufferJsonArray = bufferJsonSub2.split(",");
	
	sensorValue = parseInt(bufferJsonArray[0]);
	var potState = parseInt(bufferJsonArray[1]);
	//console.log(sensorValue+","+potState);

	if(potState < 50){
		state = -1;
	}
	else{
		state = 1;
	}

	if(state == (statePrev*(-1))){
		statePrev = state;
		console.log("EMAIL TIME!");
		checkMessage();
	}
}

function checkMessage(){
	var list;
	if(sensorValue < 15){
	    try {
		    fs.statSync('userData.json');
		    console.log('file or directory exists');
		    fs.readFile('userData.json', (err, data) => {
			  if (err) throw err;

			  var str = String(data)
			  var noComma = remove_character(str,str.length - 1);
			  list = noComma.split(",");

			  for (var i = 0; i < list.length/2; i++) {
			  	defineMessageReceiver(list[i*2], list[i*2+1], "alert");
			  	sendEmail();
			  	waterPlant();
			  }
			});
		}
		catch (err) {
		  if (err.code === 'ENOENT') {
		    console.log('file or directory does not exist');
		  }
		}
	}
};

function remove_character(str, char_pos) 
 {
  part1 = str.substring(0, char_pos);
  part2 = str.substring(char_pos + 1, str.length);
  return (part1 + part2);
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

function waterPlant(){
	var data = 'waterPlant';
    udpServer.send(
		data,
		0, // offset to the message start in the buffer
		data.length,
		ARDUINO_LISTENING_AT, 
		ARDUINO_ADDRESS);
}

/* and here is the websocket event handler */

webSocket.on('connect', function (socket) {
    console.log('Web server socket: Client connected');

    socket.emit('water', sensorValue)

    socket.on('dataAdded', function ({namePerson, email}) {
      defineMessageReceiver(namePerson, email, "confirmation");
	  sendEmail();

      var dataJSON = namePerson+","+email+",";
      console.log('Web server socket: received DATA ADDED message from web client');

	  fs.appendFile("userData.json", dataJSON, function (err) {
	     if (err) throw err;
	     console.log('The "data to append" was appended to file!');
	  });
    });

    socket.on('email', () => {
      checkMessage();
    });


    socket.on('disconnect', () => {
      console.log('Web server socket: user disconnected');
  	});

});