# Whispering Gallery  
  
## Concept and Description  
  
New York City's Grand Central Terminal is one of the city's most popular locations, providing transportation and other services to travellers but also representing the history of the city for tourists. One of the station's most popular feature (as described by the [official website](https://www.grandcentralterminal.com/what-to-see/)) is a whispering gallery between the arches "next to the Grand Central Oyster Bar & Restaurant."  
  
[A whispering gallery](http://mentalfloss.com/article/93018/7-whispering-galleries-around-world-you-can-visit) is an acoustical phenomenon wherein "certain curved spaces" allow people to "stand facing a sloping surface" in the structure and whisper to create a particular effect: if someone else is also standing facing a sloping surface in the structure, they will hear the first person's whisper "as clearly as if [they] were standing next to them."  
  
Whispering galleries are fascinating because they allow clear communication at a distance without any specialized devices (designed to serve this specific purpose). They enable, even if only within a restricted space, communication that we currently associated to technologies ranging from walkie-talkies to teleconferencing. But precisely because the phenomenon is dependent on certain architectural and acoustic features, and not on portable objects or a network that can be set up, the experience is not easily accessible. Having Raspberry Pis at my disposal and thinking about networks and their uses in our everyday lives, as well as considering the wide range of applications that connected devices have been given, I became interested in trying to replicate the experience of the Grand Central Terminal whispering gallery with hardware and software designed to clearly and easily transmit audio, and by creating a set up that is reminiscent of the arches in the gallery. Would this lead to an interesting experience for users? Or would it feel as commonplace as using a telephone?  
  
My project is composed of two stations with a monitor each, ideally placed quite far away from each other in a room, and in such a way that people standing in fron of the monitors can't see each other. Each monitor shows the following image (found online) of one of the arch pillars in Grand Central Terminal's whispering gallery:  
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/final/public/corner1.jpg)  
  
A microphone is found in front of the monitor, which the user can approach to speak directly into. The audio captured by the microphone is streamed to the opposite station, such that there is open communication between both stations. This system is set up with Raspberry Pis, and in order to take further advantage of the RPis capabilities, an ultrasonic range sensor was added to each station so that the users can get some indication of the presence or lack thereof of another person in the opposite station. If nobody is standing in front of the opposite station's microphone, the monitor shows a "loading" animation, showing that it's waiting for someone else to appear. Once another person approaches the opposite microphone, the animation disappears and the users are encouraged to speak to each other.
  
## Images and Video
  
*Station 1*  
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/station1.jpg)
  
*Station 2*  
  
(In the monitor, the size of the text on the screen looks odd because of the monitor's dimensions; the style.css file for the page is the same in Station 2 and in Station 1 - see above -, but only the latter looks as it should.)
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/station2.jpg)  
  
*Video*: https://youtu.be/JEBjbSguLDI  
  
The video above shows how the project works. In it, the two stations are closer to each other than they ideally would be; Station 2 required ethernet connection (as the RPi was having issues connecting to WiFi), thus why it needed to be in the center of the room. If this hadn't been the case, it would've been located in the opposite end of the room. Because of the stations' proximity, you can hear Yufei and I talking to each other not only through the microphones and speakers. Another shortcoming that the video shows is the delay in the audio streaming; when a user says something through the microphone, it takes a few seconds to reach the speaker in the opposite station. This will be further discussed later on in the documentation.
  
## System Diagram (Hardware and Software)  
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/diagram.jpg)  
  
The diagram above shows the system where Station 1 is the server and Station 2 is the client; in reality, the inverse is occurring simulatenously (Station 2 is also a server, and Station 1 is also a client; Station 2 also streams audio, and Station 1 also receives audio).
  
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
