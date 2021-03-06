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
IPAddress receivingDeviceAddress(192, 168, 1, 9);
unsigned int receivingDevicePort = 7000;

char packetBuffer[255]; //buffer to hold incoming packet

WiFiUDP Udp;

const int SENSOR_PIN = A0;
const int POT_PIN = A2;
const int LED_PIN = 5;

String WATER_MESSAGE = "waterPlant";

void setup() {
  pinMode(LED_PIN, OUTPUT);
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
  Udp.beginPacket(receivingDeviceAddress, receivingDevicePort);
  int sensorValue = map(analogRead(SENSOR_PIN), 0, 1023, 0, 255);
  int pot = map(analogRead(POT_PIN), 0, 1023, 0, 100);
  Udp.write(sensorValue);
  Udp.write(pot);
  Serial.print(sensorValue);
  Serial.print(",");
  Serial.println(pot);
  Udp.endPacket();

  // if there's data available, read a packet
  int packetSize = Udp.parsePacket();
  if (packetSize)
  {
      Serial.print("Received packet of size ");
      Serial.print(packetSize);
      Serial.print(" from address ");
      IPAddress remoteIp = Udp.remoteIP();
      Serial.print(remoteIp);
      Serial.print(", port ");
      Serial.println(Udp.remotePort());
  
      // read the packet into packetBufffer
      int len = Udp.read(packetBuffer, 255);
      if (len > 0) packetBuffer[len] = 0; // 0 indicates the end of an ASCII string
      Serial.print("Packet contents:");
      Serial.println(packetBuffer);
  
      if (WATER_MESSAGE.equals(packetBuffer)) {
        Serial.println("Turning LED ON");
        for(int i=0; i < 5; i++){
          digitalWrite(LED_PIN, HIGH);
          //succulent being watered
          delay(1000);
          digitalWrite(LED_PIN, LOW);
          delay(1000);
        }
      } 
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
