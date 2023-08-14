#include "HX711.h"

#define DOUT1 A1 // 왼쪽 무게 센서
#define CLK1 A0
HX711 scale1(DOUT1, CLK1);

#define DOUT2 A4 // 오른쪽 무게 센서
#define CLK2 A5
HX711 scale2(DOUT2, CLK2);

#define K -7050.0  // calibration_factor

#define TRIG 12 
#define ECHO 13 

unsigned int near = 10;

#include<Servo.h>

Servo servo1;
Servo servo2;
int angle1 = 114;
int angle2 = 150;

void setup() {
  Serial.begin(9600);

  servo1.attach(7); // 왼쪽 서보모터는 7
  servo2.attach(2); // 오른쪽 서보모터는 2
  servo1.write(angle1);
  servo2.write(angle2);

  scale1.set_scale(K);
  scale2.set_scale(K);
  delay(1000);
  scale1.tare();
  scale2.tare();

  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);

  Serial.println("ready");
}

int offsetRange = 50;

unsigned int count = 7;
unsigned int filterCount = 10;

int minimumCup1 = 140;
int maximumCup1 = 240;
int minimumCup2 = 170;
int maximumCup2 = 290;

double filteredGram1 = 0;
double filteredGram2 = 0;

unsigned int timer1 = 0;
unsigned int timer2 = 0;

unsigned int innerCount1 = 0; // 빈컵이라고 설정한 범위 내 일때의 카운트
unsigned int offsetCount1 = 0; // 영점 조절을 위한 카운트
unsigned int outerCount1 = 0; // 기준보다 무거울 때 카운트

unsigned int innerCount2 = 0; // 빈컵이라고 설정한 범위 내 일때의 카운트
unsigned int offsetCount2 = 0; // 영점 조절을 위한 카운트
unsigned int outerCount2 = 0; // 기준보다 무거울 때 카운트

double zero1 = 0;
double zero2 = 0;

double* offsetZero1 = new double[count];
double* offsetZero2 = new double[count];

bool flag1 = false;
bool flag2 = false;

void loop() {
  bool stable1 = false; // 영점일 때
  bool stable2 = false; 
  bool measure1 = false; // 측정 중일 때
  bool measure2 = false;
  bool over1 = false; // 무거울 때
  bool over2 = false;
  bool error1 = false; // 가벼울 때
  bool error2 = false;

  //================================= 무게 센서 왼쪽 =================================//

  if(!flag1){
    double g1 = scale1.get_units() * 50;
    filteredGram1 = 0;

    for (int i = 0; i < filterCount; i++) { // 10개의 입력을 평균을 내 보다 정확한 값을 받는다.
      filteredGram1 += g1;
    }

    filteredGram1 /= filterCount; // zero1을 빼줘야 영점 조절 이후 유지가 된다.
    filteredGram1 -= zero1;

    if(filteredGram1 < offsetRange && filteredGram1 > -offsetRange){ // 영점에서 오차 범위 내의 경우 다시 영점 조절을 해줘 정확성을 높인다.
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
    }
    
    else if((filteredGram1 > minimumCup1) && (filteredGram1 < maximumCup1)){ // 필터된 무게가 빈컵의 무게 범위 내일 경우
      offsetCount1 = 0; // 범위 밖이 아니기 때문에 0으로 초기화
      outerCount1 = 0;
      
      measure1 = true;

      if(++innerCount1 > count){ // 빈 컵이라고 판단하고 컵을 떨어트린다.
        flag1 = true;
      }
    }
    
    else{
      offsetCount1 = 0;
      innerCount1 = 0;
      if(outerCount1 >= count){
        if(filteredGram1 >= maximumCup1){
          over1 = true;
        } else {
          error1 = true;
        }
      }else{
        outerCount1++;
        measure1 = true;
      }
    }
  }

  //================================= 무게 센서 오른쪽 =================================//

  if(!flag2){
    double g2 = scale2.get_units() * 50;
    filteredGram2 = 0;

    for (int i = 0; i < filterCount; i++) { // 10개의 입력을 평균을 내 보다 정확한 값을 받는다.
      filteredGram2 += g2;
    }

    filteredGram2 /= filterCount; // zero1을 빼줘야 영점 조절 이후 유지가 된다.
    filteredGram2 -= zero2;

    if(filteredGram2 < offsetRange && filteredGram2 > -offsetRange){ // 영점에서 오차 범위 내의 경우 다시 영점 조절을 해줘 정확성을 높인다.
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
    }
    
    else if((filteredGram2 > minimumCup2) && (filteredGram2 < maximumCup2)){ // 필터된 무게가 빈컵의 무게 범위 내일 경우
      offsetCount2 = 0; // 범위 밖이 아니기 때문에 0으로 초기화
      outerCount2 = 0;

      measure2 = true;

      if(++innerCount2 > count){ // 빈 컵이라고 판단하고 컵을 떨어트린다.
        flag2 = true;
      }
    }
    
    else{
      offsetCount2 = 0;
      innerCount2 = 0;
      if(outerCount2 >= count){
        if(filteredGram2 >= maximumCup2){
          over2 = true;
        }else{
          error2 = true;
        }
      }else{
        outerCount2++;
        measure2 = true;
      }
    }
  }

  //================================= 무게 센서 결과 출력 =================================//

  if(stable1) Serial.print('s');
  if(measure1) Serial.print('m');
  if(over1) Serial.print('o');
  if(error1) Serial.print('e');

  if(stable2) Serial.print('S');
  if(measure2) Serial.print('M');
  if(over2) Serial.print('O');
  if(error2) Serial.print('E');

  if(flag1){ // 왼쪽 빈 컵인지 확인했을 때
    if(timer1++ == 0){
      innerCount1 = 0;
      servo1.write(angle1 - 114);
      Serial.print('L');
    }else if (timer1 == 12){
      servo1.write(angle1);
    }else if(timer1 == 14){
      flag1 = false;
      timer1 = 0;
    }
  }

  if(flag2){ // 왼쪽 빈 컵인지 확인했을 때
    if(timer2++ == 0){
      innerCount2 = 0;
      servo2.write(angle2 - 114);
      Serial.print('R');
    }else if (timer2 == 12){
      servo2.write(angle2);
    }else if(timer2 == 14){
      flag2 = false;
      timer2 = 0;
    }
  }

  // Serial.println(filteredGram1, 0);
  // Serial.println(filteredGram2, 0);

  //=================================초음파 센서=================================//

  float duration, distance;

  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  duration = pulseIn(ECHO, HIGH); // duration이란 초음파가 나갔다가 다시 들어오는 시간을 의미한다.

  distance = duration * 34.3 / 2000; // 음속은 343m/s인데 편도의 값을 구할 것이므로 2를 더 나눈다.

  if(distance > 10){
    Serial.println("f");
  }else{
    Serial.println("c");
  }

  delay(200);
}
