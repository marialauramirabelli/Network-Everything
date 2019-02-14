/*

  WiFi UDP Send Byte on Button Press
  Based on UDP Send and Receive String

  created 3 February 2019
  by Michael Shiloh
*/

#include <SPI.h>
#include <WiFiNINA.h>
#include <WiFiUdp.h>

int status = WL_IDLE_STATUS;
#include "arduino_secrets.h"
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;            // your network key Index number (needed only for WEP)

unsigned int localPort = 5000;      // local port to listen on

char packetBuffer[255]; //buffer to hold incoming packet

WiFiUDP Udp;

const int button1 = 5;
const int button2 = 4;
const int button3 = 3;

// remember the button state so we only send
// when the state changes
boolean buttonState1;
boolean lastbuttonState1 = LOW; // arbitrary

boolean buttonState2;
boolean lastbuttonState2 = LOW; // arbitrary

boolean buttonState3;
boolean lastbuttonState3 = LOW; // arbitrary

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  // attempt to connect to WiFi network:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }
  Serial.println("Connected to wifi");
  printWiFiStatus();

  Serial.print("Initializing WiFiUDP library and listening on port ");
  Serial.println(localPort);
  Udp.begin(localPort);
}

void loop() {

  // IP address of the receiving device
  IPAddress receivingDeviceAddress(192, 168, 1, 15);
  unsigned int receivingDevicePort = 2390;

  buttonState1 = digitalRead(button1);
  buttonState2 = digitalRead(button2);
  buttonState3 = digitalRead(button3);

  if(buttonState1 != lastbuttonState1 || buttonState2 != lastbuttonState2 || buttonState3 != lastbuttonState3)
  {
      Udp.beginPacket(receivingDeviceAddress, receivingDevicePort);

      Udp.write(buttonState1);
      if(buttonState1 != lastbuttonState1){
        Serial.println("button state 1 changed; sending new state 1");
        lastbuttonState1 = buttonState1;
      }
   
      Udp.write(buttonState2);
      if(buttonState2 != lastbuttonState2){
        Serial.println("button state 2 changed; sending new state 2");
        lastbuttonState2 = buttonState2;
      }

      Udp.write(buttonState3);
      if(buttonState3 != lastbuttonState3){
        Serial.println("button state 3 changed; sending new state 3");
        lastbuttonState3 = buttonState3;
      }
       
    Udp.endPacket();
  }


  // once we send a packet to the server, it might
  // respond, so read it

  // if there's data available, read a packet
  int packetSize = Udp.parsePacket();
  if (packetSize)
  {
    Serial.print("Received packet of size ");
    Serial.println(packetSize);
    Serial.print("From ");
    IPAddress remoteIp = Udp.remoteIP();
    Serial.print(remoteIp);
    Serial.print(", port ");
    Serial.println(Udp.remotePort());

    // read the packet into packetBufffer
    int len = Udp.read(packetBuffer, 255);
    if (len > 0) packetBuffer[len] = 0;
    Serial.println("Contents:");
    Serial.println(packetBuffer);


  }
}


void printWiFiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("My IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
