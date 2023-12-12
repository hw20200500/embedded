import serial
from pynput.keyboard import Key, Controller

# 시리얼 포트 설정 (아두이노 IDE에서 포트를 확인하고 적절한 포트로 변경해주세요)
ser = serial.Serial('COM8', 9600)  # 윈도우에서는 'COMX' 형식일 수 있습니다.

keyboard = Controller()


while True:
    if ser.in_waiting > 0: 
        data = ser.readline().decode().strip()
        print("Received:", data)  # 수신한 데이터를 확인하기 위한 출력
        
        # Arduino로부터 받은 데이터에 따라 키 입력 에뮬레이트
        if data == 'A':
            keyboard.press(Key.space)
            keyboard.release(Key.space)
        elif data == 'S':
            keyboard.press(Key.enter)
            keyboard.release(Key.enter)
        elif data == 'D':
            keyboard.press('d')
            keyboard.release('d')
        elif data == 'F':
            keyboard.press('f')
            keyboard.release('f')
        elif data == 'LEFT':
            keyboard.press(Key.right)
            keyboard.release(Key.right)  
        elif data == 'RIGHT':
            keyboard.press(Key.left)
            keyboard.release(Key.left)  
        elif data == 'UP':
            keyboard.press(Key.down)
            keyboard.release(Key.down)   
        elif data == 'DOWN':
            keyboard.press(Key.up)
            keyboard.release(Key.up) 
