const int buttonPinA = 2; // A에 해당하는 버튼 핀 번호
const int buttonPinS = 3; // S에 해당하는 버튼 핀 번호
const int buttonPinD = 5; // D에 해당하는 버튼 핀 번호
const int buttonPinF = 7; // F에 해당하는 버튼 핀 번호
int xPin= A0, yPin= A1, zPin= 9;



bool lastStateA = LOW; // 이전 A 버튼 상태 추적
bool lastStateS = LOW; // 이전 S 버튼 상태 추적
bool lastStateD = LOW; // 이전 D 버튼 상태 추적
bool lastStateF = LOW; // 이전 F 버튼 상태 추적

void setup() {
  Serial.begin(9600); // 시리얼 통신 시작
  pinMode(buttonPinA, INPUT); // A 버튼 핀을 입력으로 설정
  pinMode(buttonPinS, INPUT); // S 버튼 핀을 입력으로 설정
  pinMode(buttonPinD, INPUT); // D 버튼 핀을 입력으로 설정
  pinMode(buttonPinF, INPUT); // F 버튼 핀을 입력으로 설정
  pinMode(zPin, INPUT_PULLUP); //조이스틱
}

void loop() {
  bool currentStateA = digitalRead(buttonPinA); // A 버튼 현재 상태 읽기
  bool currentStateS = digitalRead(buttonPinS); // S 버튼 현재 상태 읽기
  bool currentStateD = digitalRead(buttonPinD); // D 버튼 현재 상태 읽기
  bool currentStateF = digitalRead(buttonPinF); // F 버튼 현재 상태 읽기

  if (currentStateA != lastStateA) {
    if (currentStateA == HIGH) {
      Serial.println("A");
    }
    lastStateA = currentStateA;
    delay(50); // 디바운싱을 위한 짧은 딜레이
  }

  if (currentStateS != lastStateS) {
    if (currentStateS == HIGH) {
      Serial.println("S");
    }
    lastStateS = currentStateS;
    delay(50); // 디바운싱을 위한 짧은 딜레이
  }

  if (currentStateD != lastStateD) {
    if (currentStateD == HIGH) {
      Serial.println("D");
    }
    lastStateD = currentStateD;
    delay(50); // 디바운싱을 위한 짧은 딜레이
  }

  if (currentStateF != lastStateF) {
    if (currentStateF == HIGH) {
      Serial.println("F");
    }
    lastStateF = currentStateF;
    delay(50); // 디바운싱을 위한 짧은 딜레이
  }
  
  int x = analogRead(xPin);
  int y = analogRead(yPin);
  if (x < 400 || x > 600) {
    // X 축 값이 0~400 또는 600~1023 범위일 때
    if (x < 400) {
      // 왼쪽으로 이동하는 조건
      Serial.println("LEFT"); // 왼쪽 방향키 입력
    } else {
      // 오른쪽으로 이동하는 조건
     Serial.println("RIGHT"); // 오른쪽 방향키 입력
    }
  }

  if (y < 400 || y > 600) {
    // Y 축 값이 0~400 또는 600~1023 범위일 때
    if (y < 400) {
      // 위쪽으로 이동하는 조건
      Serial.println("DOWN"); // 위쪽 방향키 입력
    } else {
      // 아래쪽으로 이동하는 조건
      Serial.println("UP"); // 아래쪽 방향키 입력
    }
  }

  
  delay(100);

}
