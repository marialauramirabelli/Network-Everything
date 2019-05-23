# Whispering Gallery  
  
### Concept and Description  
  
New York City's Grand Central Terminal is one of the city's most popular locations, providing transportation and other services to travellers but also representing the history of the city for tourists. One of the station's most popular feature (as described by the [official website](https://www.grandcentralterminal.com/what-to-see/)) is a whispering gallery between the arches "next to the Grand Central Oyster Bar & Restaurant."  
  
[A whispering gallery](http://mentalfloss.com/article/93018/7-whispering-galleries-around-world-you-can-visit) is an acoustical phenomenon wherein "certain curved spaces" allow people to "stand facing a sloping surface" in the structure and whisper to create a particular effect: if someone else is also standing facing a sloping surface in the structure, they will hear the first person's whisper "as clearly as if [they] were standing next to them."  
  
Whispering galleries are fascinating because they allow clear communication at a distance without any specialized devices (designed to serve this specific purpose). They enable, even if only within a restricted space, communication that we currently associated to technologies ranging from walkie-talkies to teleconferencing. But precisely because the phenomenon is dependent on certain architectural and acoustic features, and not on portable objects or a network that can be set up, the experience is not easily accessible. Having Raspberry Pis at my disposal and thinking about networks and their uses in our everyday lives, as well as considering the wide range of applications that connected devices have been given, I became interested in trying to replicate the experience of the Grand Central Terminal whispering gallery with hardware and software designed to clearly and easily transmit audio, and by creating a set up that is reminiscent of the arches in the gallery. Would this lead to an interesting experience for users? Or would it feel as commonplace as using a telephone?  
  
My project is composed of two stations with a monitor each, ideally placed quite far away from each other in a room, and in such a way that people standing in fron of the monitors can't see each other. Each monitor shows the following image:  
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/final/public/corner1.jpg)
  
### Images and Videos
  
*Station 1*  
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/station1.jpg)
  
*Station 2*  
  
(In the monitor, the size of the text on the screen looks odd because of the monitor's dimensions; the style.css file for the page is the same in Station 2 and in Station 1 - see above -, but only the latter looks as it should.)
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/station2.jpg)
  
### System Diagram (Hardware and Software)
  
### Schematics
  
*Circuit*  
  
The image below shows how to connect the ultrasonic range sensor to a RPi (4 GPIOs) with two resistors (1K and 2K Ohms). Taken from [codelectron.com](http://codelectron.com/measure-distance-ultrasonic-sensor-pi-hc-sr04/).   
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/schematic.png)  
  
*Schematic*  
  
The only change in the schematic for my own version of the circuit is the replacement of the 2K Ohms resistor for a 2.2K Ohms resistor (given I couldn't find any 2K ones). The ciruit appeared to work seamlessly despite the change.  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/schematic1.jpg)  
  
### Important Parts  
  
* Raspberry Pi (2)
* SD card (2)
* Ultrasonic range sensor (2)
* Monitor (2)
* Microphone (2)
* Speakers/headphones (2)
  
### Electronics
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/electronics.jpg) 
  
In the image above, where both station can be seen and their components are indicated, the RPis are not fully visible; connected to each of them are the monitor (HDMI), the microphone (USB A), and the speaker (3.5mm female jack). Station 2 also has an Ethernet cable that's connected to the RPi (Ethernet port).
  
### Code
  
* [Server](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/final/server.js)
* [Client](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/final/public/client.js)
* [Index](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/final/public/index.html)
  
### Process
  
* Easy RTC
  
* Forum: https://www.raspberrypi.org/forums/viewtopic.php?t=177225  
* Pigpio: https://github.com/fivdi/pigpio  
* Circuit: http://codelectron.com/measure-distance-ultrasonic-sensor-pi-hc-sr04/ 
  
### Difficulties
  
* Finding right picture
* URS circuit
* Ethernet
