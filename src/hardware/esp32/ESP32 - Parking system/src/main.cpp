#include "Arduino.h"
#include "pins.h"
#include "libs.h"
byte triggerPin = 21;
byte echoPin = 12;
int actualState1 = 0;//0 free, 1 full, 2 reserver
float distance1;
boolean reserved1 = false;
void diodes(){
  Serial.println(String(distance1));
  if(distance1 >0 && distance1 < 10){
    actualState1 = 0;
    digitalWrite(FreePinLed, HIGH);
    digitalWrite(FullPinLed, LOW);
    digitalWrite(ReservedPinLed, LOW);
  }else if(distance1 > 0){
    actualState1 = 1;
    digitalWrite(FreePinLed, LOW);
    digitalWrite(FullPinLed, HIGH);
    digitalWrite(ReservedPinLed, LOW);
  }
  if(reserved1){
    actualState1 = 2;
    digitalWrite(FreePinLed, LOW);
    digitalWrite(FullPinLed, LOW);
    digitalWrite(ReservedPinLed, HIGH);
  }
  
}
void setup () {
  Serial.begin(9600);
  HCSR04.begin(triggerPin, echoPin);
  pinMode(FreePinLed, OUTPUT);
  pinMode(FullPinLed, OUTPUT);
  pinMode(ReservedPinLed, OUTPUT);
}

void loop () {
  float temperature = 15;
  double* distances = HCSR04.measureDistanceCm(temperature);
  distance1 = float(distances[0]);
  diodes();
  delay(1000);
}