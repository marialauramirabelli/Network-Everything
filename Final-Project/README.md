# Whispering Gallery  
  
## Concept and Description  
  
New York City's Grand Central Terminal is one of the city's most popular locations, providing transportation and other services to travellers but also representing the history of the city for tourists. One of the station's most popular feature (as described by the [official website](https://www.grandcentralterminal.com/what-to-see/)) is a whispering gallery between the arches "next to the Grand Central Oyster Bar & Restaurant."  
  
[A whispering gallery](http://mentalfloss.com/article/93018/7-whispering-galleries-around-world-you-can-visit) is an acoustical phenomenon wherein "certain curved spaces" allow people to "stand facing a sloping surface" in the structure and whisper to create a particular effect: if someone else is also standing facing a sloping surface in the structure, they will hear the first person's whisper "as clearly as if [they] were standing next to them."  
  
Whispering galleries are fascinating because they allow clear communication at a distance without any specialized devices (designed to serve this specific purpose). They enable, even if only within a restricted space, communication that we currently associated to technologies ranging from walkie-talkies to teleconferencing. But precisely because the phenomenon is dependent on certain architectural and acoustic features, and not on portable objects or a network that can be set up, the experience is not easily accessible. Having Raspberry Pis at my disposal and thinking about networks and their uses in our everyday lives, as well as considering the wide range of applications that connected devices have been given, I became interested in trying to replicate the experience of the Grand Central Terminal whispering gallery with hardware and software designed to clearly and easily transmit audio, and by creating a set up that is reminiscent of the arches in the gallery. Would this lead to an interesting experience for users? Or would it feel as commonplace as using a telephone?  
  
My project is composed of two stations with a monitor each, ideally placed quite far away from each other in a room, and in such a way that people standing in fron of the monitors can't see each other. Each monitor shows the following image (found online) of one of the arch pillars in Grand Central Terminal's whispering gallery:  
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/final/public/corner1.jpg)  
  
A microphone is found in front of the monitor, which the user can approach to speak directly into. The audio captured by the microphone is streamed to the opposite station, such that there is open communication between both stations. This system is set up with Raspberry Pis, and in order to take further advantage of the RPis capabilities, an ultrasonic distance sensor was added to each station so that the users can get some indication of the presence or lack thereof of another person in the opposite station. If nobody is standing in front of the opposite station's microphone, the monitor shows a "loading" animation, showing that it's waiting for someone else to appear. Once another person approaches the opposite microphone, the animation disappears and the users are encouraged to speak to each other.
  
## Images and Video
  
*Station 1*  
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/station1.jpg)
  
*Station 2*  
  
(In the monitor, the size of the text on the screen looks odd because of the monitor's dimensions; the style.css file for the page is the same in Station 2 and in Station 1 - see above -, but only the latter looks as it should.)
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/station2.jpg)  
  
*Video* (needs high-ish volume!): https://youtu.be/JEBjbSguLDI  
  
[![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/video.JPG)](https://youtu.be/JEBjbSguLDI)
  
The video above shows how the project works. In it, the two stations are closer to each other than they ideally would be; Station 2 required ethernet connection (as the RPi was having issues connecting to WiFi), thus why it needed to be in the center of the room. If this hadn't been the case, it would've been located in the opposite end of the room. Because of the stations' proximity, you can hear Yufei and I talking to each other not only through the microphones and speakers. Another shortcoming that the video shows is the delay in the audio streaming; when a user says something through the microphone, it takes a few seconds to reach the speaker in the opposite station. This will be further discussed later on in the documentation.
  
## System Diagram (Hardware and Software)  
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/diagram.jpg)  
  
The diagram above shows the system where Station 1 is the server and Station 2 is the client; in reality, the inverse is occurring simulatenously (Station 2 is also a server, and Station 1 is also a client; Station 2 also streams audio, and Station 1 also receives audio).
  
## Schematics
  
*Circuit*  
  
The image below shows how to connect the ultrasonic distance sensor to a RPi (4 GPIOs) with two resistors (1K and 2K Ohms). Taken from [codelectron.com](http://codelectron.com/measure-distance-ultrasonic-sensor-pi-hc-sr04/).   
  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/schematic.png)  
  
*Schematic*  
  
The only change in the schematic for my own version of the circuit is the replacement of the 2K Ohms resistor for a 2.2K Ohms resistor (given I couldn't find any 2K ones). The ciruit appeared to work seamlessly despite the change.  
![img](https://github.com/marialauramirabelli/Network-Everything/blob/master/Final-Project/schematic1.jpg)  
  
## Important Parts  
  
* Raspberry Pi (2)
* SD card (2)
* Ultrasonic distance sensor (2)
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
  
## Process and Difficulties  
  
As is clear from the previous sections, both stations in this project are essentially divided into two parts: (1) distance-sensing and a dynamic website in response, and (2) audio streaming. 
  
To tackle the first one, my professor suggested using [ultrasonic distance sensors](https://www.sparkfun.com/products/13959), which "[include] an ultrasonic transmitter, a receiver and a control circuit" to calculate the distance between the sensor and the closest object in front of it. I needed to connect the sensor to the RPi, so that the system's server (running on the RPi) could read the distance values and use them to change an element on the website run by the server. While looking up how to do this online, I found a [RPi forum](https://www.raspberrypi.org/forums/viewtopic.php?t=177225) that indicated a simple solution: [pigpio](https://github.com/fivdi/pigpio) is a node.js package that can "enable fast GPIO, PWM, servo control, state change notification and interrupt handling on the Raspberry Pi Zero, 1, 2 or 3." The forum gave a link to [sample code](https://github.com/fivdi/pigpio#measure-distance-with-a-hc-sr04-ultrasonic-sensor) that allows the RPi to read the sensor's values. 
  
I implemented the sample code into the node.js server template that we had reviewed in class previously, using http, express, and sockets. The sockets serve the purpose of communicating with client.js, to change the presence of the loading gif in the website. This part of the process is fairly simple, as it was very similar to what we were asked to do in our midterm projects. Yet I did encounter an issue that took more time and experiments to solve than I imagined it would. My original plan was to change not only the presence of the loading gif on the website based on distance, but also the text that is shown (the instructions). However, when I instructed the sockets to change as much, the website would not carry out the changes. I thought it might have something to do with the constant refreshing of the page (which was set automatically, so I tried other alternatives for this), or with the looping of the server program, or with the connection to the network, etc. In the end, my hypothesis is that it was a problem with changing so much of the website in such a short amount of time. When I decided to have the text be static but to have the loading gif be responsive, the website changed as the sockets instructed every time, with minimal delay.
  
In terms of the sensor,  I did initially encounter a problem: the circuit that's shown in the same website as the example code did not work for me (no values were being read by the server file). In trying to figure out what the problem was, I found [another website](http://codelectron.com/measure-distance-ultrasonic-sensor-pi-hc-sr04/) with a somewhat different circuit (different resistor values) that actually worked.  
  
This said, I must point out that it took me some time to figure out how the connection between the two stations would work out. The original idea was to have each RPi detect whether or not someone was close enough to the microphone in its own station and then receive an "alert" from the other RPi when someone was near the microphone in the other station. Essentially, each station would know when someone is "using" it and when someone is "using" the other one. I tried to work out the logic for this if one RPi acts as server and client, and the second only as client, but that was not effective. To have each RPi read their own sensor, they would both have to be servers. To be aware of each others' distance readings, the servers would have to communicate with each other. I found no easy way to get this working in time, so I opted for the setup in which each station knows the distance measurement of the other because the RPi in one station is the server for the website opened in the other station.  
  
In terms of audio streaming and receiving, it was recommended to me to take a look at [EasyRTC](https://easyrtc.com/), an "open source WebRTC toolkit" that offers a [demo to stream audio](https://demo.easyrtc.com/demos/demo_audio_only.html) using a node.js server. I worked to integrate the functionalities of the demo into my own server program, but ran into a series of problems when trying to get it to work. After further research into what might have been causing the issue, it seemed to be a relatively common situation among people trying out the EasyRTC Audio Only demo, and the solution some had found was somewhat complicated ot understand for me. I tried to find alternative ways of streaming audio between RPis, and stumbled upon yet another [simple solution by Ilyass Tabiai](http://iltabiai.github.io/2018/03/17/rpi-stream.html). It requires using the VLC media player software on the RPi to connect microphone and speaker over the same network the servers are connected. The method works quite well, with the only major downside being that there is a bit of a lag when the audio is transmitted (a couple of seconds), but it my tests it was usually audible and clear.  
  
Some big problems that I faced with this project had to do with the setup on the day it was meant to be exhibited; I had issues with connecting the RPis to a network, with installing node packages, with displaying graphics with a monitor, etc. Because the system has so many components, small setbacks in any of them implied the failure of the system. It was difficult to finally get it all to work together, despite the technical aspects of the project being relatively simple.
