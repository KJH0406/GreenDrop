#include "HX711.h"
#define DOUT1 A1 // 왼쪽 무게 센서
#define CLK1 A0
HX711 scale1(DOUT1, CLK1);
#define DOUT2 A4 // 오른쪽 무게 센서
#define CLK2 A5
HX711 scale2(DOUT2, CLK2);
#define K -7050.0  // calibration_factor

#include<Servo.h>
Servo servo1;
Servo servo2;
int angle = 3;

// #define TRIG 12 // 5V 옆
// #define ECHO 13 // Ground 옆

void setup() {
  Serial.begin(9600);

  servo1.attach(7); // 왼쪽 서보모터는 7
  servo2.attach(2); // 오른쪽 서보모터는 2
  servo1.write(angle);
  servo2.write(90 + angle);

  scale1.set_scale(K);
  scale2.set_scale(K);
  delay(1000);
  scale1.tare();
  scale2.tare();

  Serial.println("ready");

  // pinMode(TRIG, OUTPUT);
  // pinMode(ECHO, INPUT);
}

int count = 10;
int filterCount = 10;

int minimumCup = 100;
int maximumCup = 206;

unsigned int innerCount1 = 0; // 빈컵이라고 설정한 범위 내 일때의 카운트
unsigned int offsetCount1 = 0; // 영점 조절을 위한 카운트
unsigned int outerCount1 = 0; // 그 외의 카운트

unsigned int innerCount2 = 0; // 빈컵이라고 설정한 범위 내 일때의 카운트
unsigned int offsetCount2 = 0; // 영점 조절을 위한 카운트
unsigned int outerCount2 = 0; // 그 외의 카운트

double zero1 = 0;
double zero2 = 0;

double* offsetZero1 = new double[count];
double* offsetZero2 = new double[count];

bool flag1 = false;
bool flag2 = false;

void loop() {
  bool stable1 = false;
  bool stable2 = false;

  double g1 = scale1.get_units() * 50;
  double filteredGram1 = 0;
  double g2 = scale2.get_units() * 50;
  double filteredGram2 = 0;

  for (int i = 0; i < filterCount; i++) { // 10개의 입력을 평균을 내 보다 정확한 값을 받는다.
    filteredGram1 += g1;
    filteredGram2 += g2;
  }
  filteredGram1 /= filterCount; // zero1을 빼줘야 영점 조절 이후 유지가 된다.
  filteredGram1 -= zero1;
  filteredGram2 /= filterCount; // zero1을 빼줘야 영점 조절 이후 유지가 된다.
  filteredGram2 -= zero2;

  if(filteredGram1 < 10){ // 영점에서 오차 범위 내의 경우 다시 영점 조절을 해줘 정확성을 높인다.
    innerCount1 = 0; // 범위 내에 들어오지 않았기 때문에 0으로 초기화
    outerCount1 = 0;
    stable1 = true;
    if(offsetCount1 >= count){ // 오차가 지속되는 경우 zero1을 갱신해준다.
      offsetCount1 = 0;
      double temp = 0;
      for(int i = 0; i < count; i++){
        temp += offsetZero1[i];
      }
      zero1 = zero1 + temp / count;
    }else{
      offsetZero1[offsetCount1++] = filteredGram1;
    }
  }else if((filteredGram1 > minimumCup) && (filteredGram1 < maximumCup)){ // 필터된 무게가 빈컵의 무게 범위 내일 경우
    offsetCount1 = 0; // 범위 밖이 아니기 때문에 0으로 초기화
    outerCount1 = 0;
    Serial.println("m"); // measuring
    if(++innerCount1 > count){ // 빈 컵이라고 판단하고 컵을 떨어트린다.
      flag1 = true;
    }
  }else{
    offsetCount1 = 0;
    innerCount1 = 0;
    if(outerCount1 >= count){
      if(filteredGram1 >= maximumCup){
        Serial.println("o"); // Overweight
      }
    }else{
      outerCount1++;
      Serial.println("m"); // measuring
    }
  }

  if(filteredGram2 < 10){ // 영점에서 오차 범위 내의 경우 다시 영점 조절을 해줘 정확성을 높인다.
    innerCount2 = 0; // 범위 내에 들어오지 않았기 때문에 0으로 초기화
    outerCount2 = 0;
    stable2 = true;
    if(offsetCount2 >= count){ // 오차가 지속되는 경우 zero1을 갱신해준다.
      offsetCount2 = 0;
      double temp = 0;
      for(int i = 0; i < count; i++){
        temp += offsetZero2[i];
      }
      zero2 = zero2 + temp / count;
    }else{
      offsetZero2[offsetCount2++] = filteredGram2;
    }
  }else if((filteredGram2 > minimumCup) && (filteredGram2 < maximumCup)){ // 필터된 무게가 빈컵의 무게 범위 내일 경우
    offsetCount2 = 0; // 범위 밖이 아니기 때문에 0으로 초기화
    outerCount2 = 0;
    Serial.println("m"); // measuring
    if(++innerCount2 > count){ // 빈 컵이라고 판단하고 컵을 떨어트린다.
      flag2 = true;
    }
  }else{
    offsetCount2 = 0;
    innerCount2 = 0;
    if(outerCount2 >= count){
      if(filteredGram2 >= maximumCup){
        Serial.println("o"); // Overweight
      }
    }else{
      outerCount2++;
      Serial.println("m"); // measuring
    }
  }

  if(stable1 && stable2){
    Serial.println("s");
  }

  if(flag1){ // 왼쪽 빈 컵인지 확인했을 때
    flag1 = false;
    innerCount1 = 0;
    servo1.write(angle + 90);
    servo2.write(angle - 90);
    Serial.println("L");
    delay(1000);
    servo1.write(angle);
    servo2.write(90 + angle);
    delay(1000);
  }

  if(flag2){ // 오른쪽 빈 컵인지 확인했을 때
    flag2 = false;
    innerCount2 = 0;
    servo2.write(angle + 90);
    Serial.println("R");
    delay(1000);
    servo2.write(angle);
    delay(1000);
  }

  Serial.println(filteredGram1);

  delay(200);
}
