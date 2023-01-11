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

    elementSize = canvasSize / 10.1;

    startGame();
}

function startGame() {

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);
            game.fillText(emoji, posX + 11, posY - 6);
        });
    });

    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementSize * col + 11, elementSize * row - 8);
    //     }
    // }

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
