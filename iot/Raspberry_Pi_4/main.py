import requests
import serial

port = serial.Serial('/dev/ttyACM0', 9600)  # 아두이노와 연결된 시리얼 포트를 사용합니다.

while True:
    sensor_value = port.readline().decode().strip()  # 시리얼로부터 값을 읽어옵니다.
    if sensor_value == 'L': # L이면 왼쪽
        print(requests.get("localhost:8080/plastic/L"))
    elif sensor_value == 'R': # R이면 오른쪽
        print(requests.get("localhost:8080/plastic/R"))
    else:
        print("Received sensor value:", sensor_value)