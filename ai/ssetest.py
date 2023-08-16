import cv2
import tensorflow as tf
from flask import Flask, Response, request, redirect
from flask_cors import CORS
import serial

labels = ["accept", "reject", "none"]
# .tflite 모델 파일 경로
model_path = 'classify_plastic.tflite'

# TensorFlow Lite 모델 로드
interpreter = tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()

# 입력 및 출력 텐서 정보 가져오기
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()
capture1 = cv2.VideoCapture(0)
capture2 = cv2.VideoCapture(1)
def get_image(capture):
    if not capture.isOpened():# or not capture2.isOpened(): #카메라가 정상 인식이 안되면
        print('error : Can\'t detect camera. Please connect it again.')  # 카메라 재연결 하라는 오류 문구
        return 0  # 종료
    # width = capture1.get(3) #현재 영상의 너비
    # height = capture1.get(4) #현재 영상의 높이
    # fps = capture1.get(5) #현재 영상의 fps

    #각 프레임 초기화
    _, frame1 = capture.read()
    # _, frame2 = capture2.read()

    result = -1
    count = 0

    def classify_image(image): # 이미지를 입력
        image = image[80:560, 0:480] #이미지 crop(640*480 -> 480*480)
        image = cv2.resize(image, (input_details[0]['shape'][1], input_details[0]['shape'][2]))
        # cv2.imshow("frame1", image)
        image = image / 255.0  # 0~255 범위의 값을 0~1 범위로 정규화

        image = tf.convert_to_tensor(image, dtype=tf.float32)
        image = tf.expand_dims(image, axis=0)  # 배치 차원 추가

        # 입력 텐서에 데이터 로드
        interpreter.set_tensor(input_details[0]['index'], image)

        # 모델 추론 실행
        interpreter.invoke()

        # 출력 텐서에서 결과 가져오기
        output_data = interpreter.get_tensor(output_details[0]['index'])

        # 결과 처리 - 가장 높은 확률을 가진 클래스 인덱스 가져오기
        predicted_class_index = tf.argmax(output_data, axis=1)[0]
        return predicted_class_index.numpy()

    # while capture1.isOpened():
    for _ in range(10):
        if cv2.waitKey(1) > 0: break #esc 누르면 종료
        _, frame1 = capture.read()
        # _, frame2 = capture2.read()

        cv2.imshow("frame1", frame1)
        # cv2.imshow("frame2", frame2)
        class_index1 = classify_image(frame1)
        # print(class_index1)
        # class_index2 = classify_image(frame2)
        # print(class_index2)

        if class_index1 == 0: #해당 프레임 판별이 Accepted일때
            count += 1
        # print(labels[result])

        # print(labels[class_index.numpy()])
        # print("L : ", labels[class_index1])
        # print("R : ", labels[class_index2])

        # if cv2.waitKey(1) > 0: break  # esc 누르면 종료
    if count > 3: #최종 accept
        result = 0 #최종 accept
    else:
        result = 1 #최종 reject
    return result

# get_image()
def OpencvL():
    return get_image(capture1)

def OpencvR():
    return get_image(capture2)



app = Flask(__name__)
CORS(app)

ser = serial.Serial('COM3', 9600)  # 아두이노와 연결된 시리얼 포트를 사용합니다.
# ser.open()

@app.route('/events')
def events():
    def generate():
        while True:
            line = ser.readline().decode('utf-8')
            input_chars = list(line)
            # input_chars = line.split('')
            print(line)


            if input_chars[0] == 'L':  # 왼쪽 무게센서에서 accept
                resultL = OpencvL()
                print("resultl : ", resultL)
                if resultL == 0:  # 왼쪽 카메라에서도 accept나면
                    ser.write(b'a')
                else:
                    input_chars[0] = 'x'  # 문자 대체
                    ser.write(b'r')
            if input_chars[1] == 'R':  # 오른쪽 무게센서에서 accept
                resultR = OpencvR()
                print("resultR : ", resultR)
                if resultR == 0:  # 오른쪽 카메라에서도 accept나면
                    ser.write(b'a')
                else:
                    input_chars[1] = 'X'
                    ser.write(b'r')

            yield f"data: {''.join(input_chars)}\n\n"

    return Response(generate(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(port=8888)