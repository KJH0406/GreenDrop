import serial

ser = serial.Serial('/dev/ttyACM0', 9600)  # 아두이노와 연결된 시리얼 포트를 사용합니다.

while True:
    sensor_value = ser.readline().decode().strip()  # 시리얼로부터 값을 읽어옵니다.
    print("Received sensor value:", sensor_value)
