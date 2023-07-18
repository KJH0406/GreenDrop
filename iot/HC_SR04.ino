#define TRIG 12
#define ECHO 13

void setup() {
  Serial.begin(9600);

  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  float duration, distance;

  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  duration = pulseIn(ECHO, HIGH); // duration이란 초음파가 나갔다가 다시 들어오는 시간을 의미한다.

  distance = duration * 34.3 / 2000; // 음속은 343m/s인데 편도의 값을 구할 것이므로 2를 더 나눈다.

  Serial.println(distance);

  delay(1000);
}
