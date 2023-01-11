const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    canvasSize = Math.min(window.innerHeight, window.innerWidth) * 0.8;

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize / 10;

    startGame();
}

function startGame() {

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementSize, elementSize * i);
    }

    // game.fillRect(0, 0, 100, 100);
    // game.fillRect(0, 50, 100, 100);
    // game.clearRect(0, 0, 50, 50);
    // game.clearRect(50, 50, 50, 50);
    // game.clearRect(0, 0, 100, 50);

    // game.font = '25px Verdana';
    // game.fillStyle = 'orange';
    // game.textAlign = 'center';
    // game.fillText('Platzi', 50, 50);
}
