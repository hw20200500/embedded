const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");
const background = new Image();
const text_img = new Image();
background.src = 'asset/_7b422bb2-f556-45c8-b320-e38845ad743f.jpeg'; // 배경 이미지 파일 경로를 설정해야 합니다
text_img.src = 'asset/youlose.png';

window.addEventListener('resize', adjustCanvasSize);

function adjustCanvasSize() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // 높이를 창 높이에 맞추기
    canvas.height = windowHeight - 80;

    // 너비를 높이와 같은 1:1 비율로 설정
    canvas.width = windowWidth;
    
    // 추가: 게임 루프 재시작 등을 할 수 있으면 여기서 처리
}

function drawBackground() {
    // ctx.globalAlpha = 0.3; // 투명도 설정 (0.5는 50% 투명)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // ctx.globalAlpha = 1; // 투명도 초기화
}

function show_text() {
    ctx.drawImage(text_img, canvas.width/2-canvas.width*0.25, canvas.height/2-canvas.height*0.15, canvas.width*0.5, canvas.height*0.3);
}

background.onload = function () {
    adjustCanvasSize(); // 초기 로드 시 크기 조절
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    show_text();
};