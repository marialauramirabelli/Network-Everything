# Whispering Gallery  
  
## Concept and Description  
  
## Images and Videos
  
*Station 1*  
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/station1.jpg)
  
*Station 2*  
  
(In the monitor, the size of the text on the screen looks odd because of the monitor's dimensions; the style.css file for the page is the same in Station 2 and in Station 1 - see above -, but only the latter looks as it should.)
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/station2.jpg)
  
## System Diagram (Hardware and Software)
  
## Schematics
  
*Circuit*  
  
The image below shows how to connect the ultrasonic range sensor to a RPi (4 GPIOs) with two resistors (1K and 2K Ohms). Taken from [codelectron.com](http://codelectron.com/measure-distance-ultrasonic-sensor-pi-hc-sr04/).   
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/schematic.png)  
  
*Schematic*  
  
The only change in the schematic for my own version of the circuit is the replacement of the 2K Ohms resistor for a 2.2K Ohms resistor (given I couldn't find any 2K ones). The ciruit appeared to work seamlessly despite the change.  
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/schematic1.jpg)  
  
## Important Parts  
  
* Raspberry Pi (2)
* SD card (2)
* Ultrasonic range sensor (2)
* Monitor (2)
* Microphone (2)
* Speakers/headphones (2)
  
## Electronics
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/electronics.jpg) 
  
In the image above, where both station can be seen and their components are indicated, the RPis are not fully visible; connected to each of them are the monitor (HDMI), the microphone (USB A), and the speaker (3.5mm female jack). Station 2 also has an Ethernet cable that's connected to the RPi (Ethernet port).
  
## Code
  
* [Server](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/final/server.js)
* [Client](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/final/public/client.js)
* [Index](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/final/public/index.html)
  
## Process
  
* Easy RTC
  
* Forum: https://www.raspberrypi.org/forums/viewtopic.php?t=177225  
* Pigpio: https://github.com/fivdi/pigpio  
* Circuit: http://codelectron.com/measure-distance-ultrasonic-sensor-pi-hc-sr04/ 
  
## Difficulties
  
* Finding right picture
* URS circuit
* Ethernet
