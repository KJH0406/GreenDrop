#include "HX711.h"
#define DOUT1 A1
#define CLK1 A0
HX711 scale1(DOUT1, CLK1);
#define K -7050.0  // calibration_factor

#include<Servo.h>
Servo servo;

#define TRIG 12 // 5V 옆
#define ECHO 13 // Ground 옆

unsigned int cnt1 = 0;
unsigned int count = 0;
float zero1 = 0;

void setup() {
  Serial.begin(9600);
  // 무게 센서
  scale1.set_scale(K);
  delay(2000);
  scale1.tare();
  // 서보 모터
  servo.attach(7);
  servo.write(0);
  // 초음파 센서
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
}

void loop() {
  //---------------------------------------------
  float g1 = scale1.get_units() * 50;
  float filteredGram1 = 0;
  for (int i = 0; i < 100; i++) {
    filteredGram1 += g1;
  }
  filteredGram1 /= 100;
  if ((filteredGram1 < 10) && (filteredGram1 > -10)) {  // +-10g 범위내일 때
    if (++cnt1 > 10) {
      cnt1 = 0;
      zero1 = filteredGram1;
    }  // 10번 이상 지속되면 zero 처리
  } else {
    cnt1 = 0;
  }
  filteredGram1 = filteredGram1 - zero1;
  
  // Serial.print(zero1);
  // Serial.println("g");
  Serial.print(filteredGram1);
  Serial.println("g");
  
  if((filteredGram1 > 25) && (filteredGram1 < 35)) {
    if(++count > 6){
      count = 0;
      servo.write(90);
      delay(2000);
      servo.write(0);
    }
  } else {
    count = 0;
  }

  float duration, distance;

  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  duration = pulseIn(ECHO, HIGH); // duration이란 초음파가 나갔다가 다시 들어오는 시간을 의미한다.

  distance = duration * 34.3 / 2000; // 음속은 343m/s인데 편도의 값을 구할 것이므로 2를 더 나눈다.

  Serial.print(distance);
  Serial.println(" cm");

  delay(200);
}