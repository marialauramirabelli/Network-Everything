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
//other code must have 2390 for this instead

char packetBuffer[255]; //buffer to hold incoming packet

WiFiUDP Udp;

const int RED_LED = 0;
const int GREEN_LED = 1;
const int YELLOW_LED = 2;

const int RED_BUTTON = 5;
const int GREEN_BUTTON = 4;
const int YELLOW_BUTTON = 3;

// remember the button state so we only send when the state changes
boolean redButtonState;
boolean lastRedButtonState = LOW;

boolean greenButtonState;
boolean lastGreenButtonState = LOW;

boolean yellowButtonState;
boolean lastYellowButtonState = LOW;

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);

  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(YELLOW_LED, OUTPUT);
  
  while (!Serial) {
    ; // wait for serial port to connect. Needed for natv cive USB port only
  }

  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  // check firmware version
  String fv = WiFi.firmwareVersion();
  if (fv < "1.0.0") {
    Serial.println("Please upgrade the firmware");
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

  pinMode(LED_BUILTIN, OUTPUT);
}

void sendButtonStates(IPAddress address, unsigned int port){
  redButtonState = digitalRead(RED_BUTTON); 
  greenButtonState = digitalRead(GREEN_BUTTON);
  yellowButtonState = digitalRead(YELLOW_BUTTON);

  if(redButtonState != lastRedButtonState || 
  greenButtonState != lastGreenButtonState || 
  yellowButtonState != lastYellowButtonState)
  {
    Udp.beginPacket(address, port);

    Udp.write(redButtonState);
    if(redButtonState != lastRedButtonState){
      lastRedButtonState = redButtonState;
    }
 
    Udp.write(greenButtonState);
    if(greenButtonState != lastGreenButtonState){
      lastGreenButtonState = greenButtonState;
    }

    Udp.write(yellowButtonState);
    if(yellowButtonState != lastYellowButtonState){
      lastYellowButtonState = yellowButtonState;
    }
    
    printCurrentButtonState(redButtonState, greenButtonState, yellowButtonState);
     
    Udp.endPacket();
  }
}

void receiveLEDStates(){
  // if there's data available, read a packet
  int packetSize = Udp.parsePacket();
  if (packetSize)
  {
    if (packetSize != 3){
      Serial.println("Incorrect packet size received.");
    }
    else{
      Serial.print("Received packet of size ");
      Serial.println(packetSize);
      Serial.print("From ");
      IPAddress remoteIp = Udp.remoteIP();
      Serial.print(remoteIp);
      Serial.print(", port ");
      Serial.println(Udp.remotePort());
  
      // read the packet into packetBufffer
      int len = Udp.read(packetBuffer, 255);
      digitalWrite(RED_LED, packetBuffer[0]);
      digitalWrite(GREEN_LED, packetBuffer[1]);
      digitalWrite(YELLOW_LED, packetBuffer[2]);
    }
  }
}

void loop() {
  // IP address of the receiving device
  IPAddress receivingDeviceAddress(192, 168, 1, 15);
  unsigned int receivingDevicePort = 2390;
  //other code must have 5000 for this instead

  sendButtonStates(receivingDeviceAddress, receivingDevicePort);
  
  receiveLEDStates();
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
void printCurrentButtonState(boolean currentRedButtonState, boolean currentGreenButtonState, boolean currentYellowButtonState){
  Serial.print("red = ");
    Serial.print(currentRedButtonState);
    Serial.print("\tgreen = ");
    Serial.print(currentGreenButtonState);
    Serial.print("\tyellow = ");
    Serial.print(currentYellowButtonState);
    Serial.println();
  }
