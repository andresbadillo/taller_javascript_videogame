const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementSize;

const playerPosition = {
    x: undefined,
    y: undefined,
};

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

    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            }

            game.fillText(emoji, posX + 11, posY - 6);
        });
    });

    movePlayer();

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

function movePlayer() {
    game.font = elementSize * 0.8 + 'px Verdana';
    game.fillText(emojis['PLAYER'], playerPosition.x + 3, playerPosition.y - 10);
}

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);
window.addEventListener('keydown', moveByKeys);

function moveUp() {
    console.log('Me quiero mover hacia arriba');

    if ((playerPosition.y - elementSize) < (elementSize - 1)) {
        console.log('Out');
    } else {
        playerPosition.y -= elementSize;
        startGame();
    }
}

function moveLeft() {
    console.log('Me quiero mover hacia la izquierda');
    
    if ((playerPosition.x - elementSize) < elementSize) {
        console.log('Out');
    } else {
        playerPosition.x -= elementSize;
        startGame();
    }
}

function moveRight() {
    console.log('Me quiero mover hacia la derecha');
    
    if ((playerPosition.x + elementSize) > canvasSize) {
        console.log('Out');
    } else {
        playerPosition.x += elementSize;
        startGame();
    }
}

function moveDown() {
    console.log('Me quiero mover hacia abajo');
    
    if ((playerPosition.y + elementSize) > canvasSize) {
        console.log('Out');
    } else {
        playerPosition.y += elementSize;
        startGame();
    }
}

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}