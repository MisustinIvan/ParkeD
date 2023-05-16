#include "Arduino.h"
#include "pins.h"
#include "libs.h"

#pragma region definitions
Ultrasonic ultrasonic1(25, 33);
Ultrasonic ultrasonic2(32, 35);
Ultrasonic ultrasonic3(18, 19);

#pragma endregion

#pragma region functions
void sendData(int id, bool value){
  Serial.println("BtnPressed");
}


#pragma endregion


void setup(){
  pinMode(btnPin,INPUT_PULLUP);
  Serial.begin(115200);
  
  
}

void loop(){
  long microsec = ultrasonic1.timing();
  long microsec = ultrasonic2.timing();
  long microsec = ultrasonic3.timing();
  float dist1 = float(ultrasonic1.read());
  float dist2 = float(ultrasonic2.read());
  float dist3 = float(ultrasonic3.read());
  //Serial.println("Dist1: " + String(dist1));
  Serial.println("Dist2: " + String(dist2));
  Serial.println("Dist3: " + String(dist3));
  delay(1000);
}