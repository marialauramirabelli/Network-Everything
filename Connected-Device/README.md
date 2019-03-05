## Connected Device
### Succulent Humidity Monitor

As I tried to come up with a better idea for a connected device, inspired by the IoT devices we've encountered in readings and discussed in class, I kept on thinking that I would like the device to, if possible, (1) hide the board and somewhat conceal the sensor, and (2) enable a remote interaction for which the fact that it happens remotely makes sense. And finally, obviously, I wanted it to do something that could be useful to a degree and/or interesting as a concept. 
  
When I remembered we have humidity sensors in the lab, it instantly came to mind how one of my close friends, who loves gardening, tragically keeps on killing her plants because she forgets to water them. The last few that she's bought have been succulents (plants that can retain water as an adaptation to arid climates and have thus become very popular houseplants), thinking that they would be easier to maintain alive; but she fails to water them anyway, and her last succulent has been withering away for the past month or so.  
  
It got me thinking that this is the sort of thing an IoT device might try to tackle. Maybe I can use a humidity sensor to get readings from the soil in a succulent pot; if the humidity level is too low, this would trigger a server to send an alert/reminder email to the owner of the plant (as I understand it, this should be easy to do with the Nodemailer module for Node.js), who would have previously gone to a website to "create an account" by giving their email address, and possibly other information like their plant's name (if they so wish). Maybe some initial information about the humidity readings will be necessary here too, but I'm sure what that information would be. 
  
I imagine the device as a box (probably wooden) of which the upper part is a space to place a small pot, and the lower part is a drawer where the board can fit. There will be openings in both parts that allow the sensor to be connected to the board and to be in contact with the soil. The sensor could also be removed while the succulent is being watered, to later be placed on the soil again.  
  
![plan](/Connected-Device/Images/succulentPlan.jpg)  
  
The idea doesn't really incorporate any actuators, so maybe the device can have a light on the box that turns on or a speaker that plays a sound (if I wanted to be a bit more aggressive) when the succulent reaches the lowest humidity level "allowed". Or, which is more interesting but I'm not sure how to carry it out, I can try to find a way in which water can be automatically poured into the soil, so that the email serves as a reminder to replenish the water supply (stored somewhere in the box), rather than to water the succulent itself.  
  
Succulents usually need to be watered once a week, which is too long for prototyping and testing the device (and to show it to others), so I'd have to come up with a way to simulate the absorption of water in a much shorter time span.
