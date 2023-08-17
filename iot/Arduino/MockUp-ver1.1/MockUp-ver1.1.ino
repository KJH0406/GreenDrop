#include "HX711.h"
#define DOUT1 A1
#define CLK1 A0
HX711 scale1(DOUT1, CLK1);
#define K -7050.0  // calibration_factor

#include<Servo.h>
Servo servo;
int angle = 0;

// #define TRIG 12 // 5V 옆
// #define ECHO 13 // Ground 옆

void setup() {
  Serial.begin(9600);

  servo.attach(7);
  servo.write(angle);

  scale1.set_scale(K);
  delay(1000);
  Serial.println("ready");
  scale1.tare();

  // pinMode(TRIG, OUTPUT);
  // pinMode(ECHO, INPUT);
}

int count = 5;
unsigned int innerCount = 0; // 빈컵이라고 설정한 범위 내 일때의 카운트
unsigned int offsetCount = 0; // 영점 조절을 위한 카운트
unsigned int outerCount = 0; // 그 외의 카운트
double zero1 = 0;
double* offsetZero = new double[count];
double* outerZero = new double[count];
int filterCount = 10;

void loop() {
  double g1 = scale1.get_units() * 50;
  double filteredGram1 = 0;
  for (int i = 0; i < filterCount; i++) { // 100개의 입력을 평균을 내 보다 정확한 값을 받는다.
    filteredGram1 += g1;
  }
  filteredGram1 = filteredGram1 / filterCount; // zero1을 빼줘야 영점 조절 이후 유지가 된다.
  filteredGram1 = filteredGram1 - zero1;

  if((filteredGram1 > -1.8) && (filteredGram1 < 1.8)){ // 영점에서 오차 범위 내의 경우 다시 영점 조절을 해줘 정확성을 높인다.
    innerCount = 0; // 범위 내에 들어오지 않았기 때문에 0으로 초기화
    outerCount = 0;
    if(++offsetCount >= count){ // 오차가 지속되는 경우 zero1을 갱신해준다.
      offsetCount = 0;
      double temp = 0;
      for(int i = 0; i < count; i++){
        temp += offsetZero[i];
      }
      temp + filteredGram1;
      zero1 = zero1 + temp / 5;
    }else{
      offsetZero[offsetCount - 1] = filteredGram1;
    }
  }else if((filteredGram1 > 165) && (filteredGram1 < 200)){ // 필터된 무게가 빈컵의 무게 범위 내일 경우
    offsetCount = 0; // 범위 밖이 아니기 때문에 0으로 초기화
    outerCount = 0;
    if(++innerCount >= count){ // 빈 컵이라고 판단하고 컵을 떨어트린다.
      innerCount = 0;
      servo.write(angle + 90);
      Serial.println("Drop the Cup!!!");
      delay(1000);
      servo.write(angle);
      delay(1000);
    }
  }else{
    offsetCount = 0;
    innerCount = 0;
    if(++outerCount >= count){
      outerZero[outerCount - 1] = filteredGram1;
      outerCount = 0;
      double temp = 0;
      for(int i = 0; i < count; i++){
        temp += outerZero[i];
      }
      zero1 = zero1 + temp / count;
    }else{
      outerZero[outerCount - 1] = filteredGram1;
    }
  }
  Serial.print(innerCount);
  Serial.print(" ");
  Serial.print(offsetCount);
  Serial.print(" ");
  Serial.print(outerCount);
  Serial.print(" ");
  Serial.println(filteredGram1);
  Serial.println(zero1);

  // double duration, distance;

  // digitalWrite(TRIG, LOW);
  // delayMicroseconds(2);
  // digitalWrite(TRIG, HIGH);
  // delayMicroseconds(10);
  // digitalWrite(TRIG, LOW);

  // duration = pulseIn(ECHO, HIGH); // duration이란 초음파가 나갔다가 다시 들어오는 시간을 의미한다.

  // distance = duration * 34.3 / 2000; // 음속은 343m/s인데 편도의 값을 구할 것이므로 2를 더 나눈다.

  delay(200);
}
