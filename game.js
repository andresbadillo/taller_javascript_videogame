const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
    let canvasSize = Math.min(window.innerHeight, window.innerWidth)*0.8;

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    const elementSize = canvasSize / 10;

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
