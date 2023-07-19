#include<Servo.h>
Servo servo;

#define TRIG 12
#define ECHO 13

void setup() {
  Serial.begin(9600);
  servo.attach(7);

  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
}

void loop() {
  long duration, distance;
  int angle;

  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  duration = pulseIn(ECHO, HIGH); // duration이란 초음파가 나갔다가 다시 들어오는 시간을 의미한다.

  distance = duration * 34 / 2000; // 음속은 343m/s인데 편도의 값을 구할 것이므로 2를 더 나눈다.

  if(distance < 10){
    angle = 0;
  }else if(distance == 992){
    
  }else{
    angle = 90;
  }

  servo.write(angle);

  if(distance == 992){
    Serial.println("측정실패요");
  }else{
    Serial.print("distance : ");
    Serial.println(distance);
    Serial.print("angle : ");
    Serial.println(angle);
  }

  delay(1000);
}
