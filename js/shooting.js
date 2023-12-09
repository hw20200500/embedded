// game.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const backgroundAudio = document.getElementById('backgroundAudio');
const bottom = document.getElementById("bottom");
// JavaScript 코드를 직접 추가하여 canvas 크기를 동적으로 조절

let gamePaused = false;

window.addEventListener('resize', adjustCanvasSize);
adjustCanvasSize(); // 초기 로드 시 크기 조절

function adjustCanvasSize() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // 높이를 창 높이에 맞추기
    canvas.height = windowHeight - 80;

    // 너비를 높이와 같은 1:1 비율로 설정
    canvas.width = windowWidth;
}

// 배경 설정
const background = new Image();
background.src = 'asset/shooting_background.png'; // 배경 이미지 파일 경로를 설정해야 합니다

// 배경 그리기
function drawBackground() {
    // ctx.globalAlpha = 0.3; // 투명도 설정 (0.5는 50% 투명)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // ctx.globalAlpha = 1; // 투명도 초기화
}

// 플레이어 비행기 설정
const player = {
    x: canvas.width / 2,
    y: canvas.height -canvas.height/6,
    width: canvas.height/6,
    height: canvas.height/6,
    speed: 14,
    score: 0
};



// 플레이어 이미지 설정
const playerImage = new Image();
playerImage.src = 'asset/rocket.png'; // 플레이어 이미지 파일 경로를 설정해야 합니다

// 플레이어 이미지 설정
const enemyImage = new Image();
enemyImage.src = 'asset/enemy2.png'; // 플레이어 이미지 파일 경로를 설정해야 합니다

// 총알 설정
const bullets = [];
let enemySpeed = 2; // 초기 속도 설정

// 적 비행기 설정
const enemies = [];

function createEnemy() {
    const enemy = {
        x: Math.random() * (canvas.width - 50),
        y: 0,
        width: player.width/2,
        height: player.width/2,
        speed: enemySpeed,
        image: enemyImage
    };
    enemies.push(enemy);
}

// 스코어와 라운드 업데이트 함수
function updateUI() {
    document.getElementById("score").textContent = "스코어: " + player.score;
    document.getElementById("round").textContent = "라운드: " + currentRound;
}

// 추가: 게임 오버 모달 관련 함수
function openGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'block';
}

function closeGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'none';
}

// 플레이어 그리기
function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

// 적 비행기 그리기 함수 업데이트
function drawEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        ctx.drawImage(enemies[i].image, enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
        enemies[i].y += enemySpeed;

        // 적 비행기가 화면 아래로 벗어나면 배열에서 제거
        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
            i--;
        }
    }
}

const explosionImage = new Image();
explosionImage.src = 'asset/Boom.png'; // 폭발 이미지 파일 경로를 설정해야 합니다

function resetGame() {
    // alert("게임 오버! 스코어: " + player.score)
    window.location.href = 'game_over.html';
}
// 게임 루프
function gameLoop() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 배경 그리기
    drawBackground();

    if (!gamePaused) {
        
    }
    // 적 비행기 생성
    if (Math.random() < 0.02) {
        createEnemy();
    }

    // 총알 그리기
    for (let i = 0; i < bullets.length; i++) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(bullets[i].x, bullets[i].y, 4, 15);
        bullets[i].y -= 5;
    }

    // 적 비행기 그리기
    for (let i = 0; i < enemies.length; i++) {
        // ctx.fillStyle = enemyImage;
        // ctx.fillRect(enemies[i].x, enemies[i].y, 50, 50);
        ctx.drawImage(enemies[i].image, enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
        enemies[i].y += enemies[i].speed;

        // 적과 총알 충돌 감지
        for (let j = 0; j < bullets.length; j++) {
            if (
                bullets[j].x < enemies[i].x + enemies[i].width &&
                bullets[j].x + 2 > enemies[i].x &&
                bullets[j].y < enemies[i].y + enemies[i].height &&
                bullets[j].y + 10 > enemies[i].y
            ) {
                bullets.splice(j, 1);
                enemies.splice(i, 1);
                player.score += 10;
            }
        }

        // 적과 플레이어 비행기 충돌 감지
        if (
            player.x < enemies[i].x + enemies[i].width &&
            player.x + player.width > enemies[i].x &&
            player.y < enemies[i].y + enemies[i].height &&
            player.y + player.height > enemies[i].y
        ) {
            // 게임 종료
            ctx.drawImage(explosionImage, enemies[i].x-40, enemies[i].y, player.width, player.height)
            // openGameOverModal();
            // alert("게임 오버! 스코어: " + player.score);
            // 5초 뒤에 함수 실행
            setTimeout(resetGame, 100);
            
        }
    }

    // 플레이어 비행기 그리기
    // ctx.fillStyle = "#00f";
    // ctx.fillRect(player.x, player.y, player.width, player.height);
    drawPlayer();

    // 스코어가 100 이상이면 다음 라운드로 이동
    if (player.score >= 100*currentRound) {
        alert("다음 라운드로 이동!");
        // 여기에서 새 라운드 초기화 또는 원하는 작업을 수행할 수 있습니다.
        // player.score = 0; // 스코어 초기화
        currentRound++; // 라운드 증가
        enemySpeed *= 1.2; // 적 비행기 속도 증가
        backgroundAudio.play();
        updateUI(); // UI 업데이트
        // 다음 라운드 초기화 작업 추가
    }
    backgroundAudio.play();
    updateUI(); // UI 업데이트
    

    requestAnimationFrame(gameLoop);
}

// 플레이어 조작
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    }
    if (event.key === "ArrowRight" && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
    if (event.key === " ") {
        // 슈팅 로직
        bullets.push({ x: player.x + player.width / 2, y: player.y });
    }
});
// 초기 라운드 설정
let currentRound = 1;
updateUI(); // 초기 UI 업데이트

gameLoop();