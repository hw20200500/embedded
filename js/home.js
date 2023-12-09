const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");
const background = new Image();
const shooting_button = new Image();
const tetris_button = new Image();
const click = new Image();
background.src = 'asset/home_background.png';
shooting_button.src = 'asset/shooting_button.png';
tetris_button.src = 'asset/tetris_button.png';
click.src = 'asset/click.png';


let targetWidth; // 전역으로 이동
let clickPositionX = canvas.width*1.7;
window.addEventListener('resize', adjustCanvasSize);

function adjustCanvasSize() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    canvas.height = windowHeight;
    canvas.width = windowWidth;
}

function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function show_button() {
    ctx.drawImage(shooting_button, canvas.width / 7, canvas.height / 2, canvas.width / 4, canvas.height / 5);
    ctx.drawImage(tetris_button, canvas.width / 1.7, canvas.height / 2, canvas.width / 4, canvas.height / 5);
}

function show_click() {
    const originalWidth = click.width;
    const originalHeight = click.height;
    const aspectRatio = originalWidth / originalHeight;
    targetWidth = shooting_button.width / 6; // 전역으로 이동
    let targetHeight = targetWidth / aspectRatio;

    if (targetHeight > shooting_button.height / 3) {
        targetHeight = shooting_button.height / 3;
        targetWidth = targetHeight * aspectRatio;
    }

    ctx.drawImage(click, clickPositionX, canvas.height / 1.6, targetWidth, targetHeight);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    show_button();
    show_click();
}

document.addEventListener("keydown", function (event) {
    const moveAmount = targetWidth * 3.8;

    if (event.key === "ArrowLeft" && clickPositionX > canvas.width / 7) {
        clickPositionX = canvas.width/7+moveAmount;
        update();
    }

    if (event.key === "ArrowRight" && clickPositionX < canvas.width - targetWidth - moveAmount) {
        clickPositionX = canvas.width/1.7+moveAmount;
        update();
    }

    if (event.key === "Enter") {
        if (clickPositionX == canvas.width/1.7+moveAmount) {
            window.location.href = 'tetris.html';
        } else {
            window.location.href = 'shooting.html';
        }
    }
});

background.onload = function () {
    adjustCanvasSize();
    update();
};
