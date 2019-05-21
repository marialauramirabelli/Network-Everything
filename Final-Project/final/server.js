const express = require('express'); 
const app = express();
const path = require('path');
const http = require('http');
const httpServer = http.Server(app); 
const HTTP_SERVER_PORT = 3000; 

//used to read an ultrasonic range sensor connected to the Raspberry Pi
const Gpio = require('pigpio').Gpio;
const trigger = new Gpio(23, {mode: Gpio.OUTPUT});
const echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

//variable that monitors whether or not there's someone sufficiently close to the microphone
let currentState;

// FOLLOWING CODE (to read ultrasonic range sensor) is from https://github.com/fivdi/pigpio#measure-distance-with-a-hc-sr04-ultrasonic-sensor
//finds distance between sensor and nearest object in front of it

//"The number of microseconds it takes sound to travel 1cm at 20°C"
const MICROSECDONDS_PER_CM = 1e6/34321;

//"Make sure trigger is low" when server starts
trigger.digitalWrite(0);

const watchHCSR04 = () => {
  let startTick;

  echo.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0);

      //distance from sensor to closest object (person) in front of it
      let distance = diff / 2 / MICROSECDONDS_PER_CM;

      if(distance < 50){
        currentState = 1;
      }
      else{
        currentState = 0;
      }
    }
  });
};

watchHCSR04();

//"Trigger a distance measurement once per second"
setInterval(() => {
  trigger.trigger(10, 1); // "Set trigger high for 10 microseconds"
}, 1000);

app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));

app.get('/', function(req, res){ 
  res.render('index',{status:"Index Page"});
});


httpServer.listen(HTTP_SERVER_PORT, () => {
	//console.log('httpServer: Listening at', httpServer.address());
});

//Websockets allow webpage to communicate with server
const webSocket = require('socket.io')(httpServer);  


httpServer.on('connection', (socket) => {
  console.log("httpServer: An HTTP client has connected")
});

//Websocket event handler
webSocket.on('connect', function (socket) {
    console.log('Web server socket: Client connected');

    //if distance detected by sensor is greater than 50 (nobody "near" the microphone)
    if(currentState == 0){
      socket.emit('empty');
      console.log("EMPTY");
    }
    //if distance detected by sensor is less than 50 (there's someone near the microphone)
    else if(currentState == 1){
      socket.emit('someone');
      console.log("SOMEONE");
    }

    socket.on('disconnect', () => {
      console.log('Web server socket: user disconnected');
  	});

});