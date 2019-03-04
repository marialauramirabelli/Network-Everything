## Connected Device (First Idea)
### A laptop stand with a built-in fan
(An artifact that already exists but not as an IoT device, to my knowledge)

Three types of components are connected to the Arduino MKR 1010:
- A temperature sensor placed near the bottom of the laptop (the laptop will be on a stand with an opening on its surface, so there's space for components to be placed under it)
- A motor with attached fan blades (hopefully the voltage is not a problem?)
- Three LEDs to mimic a stoplight (they will indicate ranges of heat; just an extra feature, not really necessary)  
  
![stand](/Connected-Device/Images/stand.jpg)    
  
The Arduino code communicates with Node.js code that has set up a server.
- The Arduino code interprets temperature readings and sends a "status" to Node.js (something along the lines of "cold", "mild", "hot"); this status is also shown by turning on one of the LEDs (green, yellow, and red respectively).
- Node.js make sure this information is displayed on the browser of any user connecting to the server; if the temperature is "hot", the user is given the option to turn on the fan by clicking a button. If the fan is on and the temperature status changes to "mild" or "cold", the user is given the option to turn off the fan by clicking a button. The fan status ("on" or "off") is also displayed on the browser.
- Node.js sends the instructions given by the user ("on" or "off") to the Arduino code, which acts accordingly by turning the fan (motor with blades) on or off  
  
![diagram](/Connected-Device/Images/diagram.jpg)  
