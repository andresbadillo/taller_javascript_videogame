const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
};

let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function fixNumber(n) {
    return Number(n.toFixed(0));
}

function setCanvasSize() {
    canvasSize = Math.min(window.innerHeight, window.innerWidth) * 0.8;

    canvasSize = fixNumber(canvasSize);

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize / 10;

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame();
}

function startGame() {

    game.font = (elementSize * 0.95) + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    // Mostramos las vidas restantes
    showLives();

    // Limpiamos nuestro canvas y el array de enemigos
    enemyPositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    // Volvemos a renderizar el canvas
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = (elementSize) * (colI + 1);
            const posY = (elementSize) * (rowI + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY,
                });
            }

            game.fillText(emoji, posX + 9, posY - 9);
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
    const giftCollisionX = playerPosition.x.toFixed() == giftPosition.x.toFixed();
    const giftCollisionY = playerPosition.y.toFixed() == giftPosition.y.toFixed();
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail();
    }

    game.font = (elementSize * 0.9) + 'px Verdana';
    game.fillText(emojis['PLAYER'], playerPosition.x + 7, playerPosition.y - 10);
}

function levelWin() {
    console.log('Subiste de nivel!!');
    level++;
    startGame();
}

function levelFail() {
    console.log('Chocaste contra un enemigo!!');
    lives--;

    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('Terminaste el juego!!');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'Superaste el record!!! 😀';

        } else {
            pResult.innerHTML = 'No superaste el record 🥲';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = 'Es tu primera vez jugando';

    }

    console.log({recordTime, playerTime});
}

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']);
    console.log(heartsArray);

    spanLives.innerHTML = '';
    heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);
window.addEventListener('keydown', moveByKeys);

function moveUp() {
    console.log('Me quiero mover hacia arriba');

    if (fixNumber(playerPosition.y - elementSize) < elementSize) {
        console.log('Out');
    } else {
        playerPosition.y -= elementSize;
        startGame();
    }
}

function moveLeft() {
    console.log('Me quiero mover hacia la izquierda');
    
    if (fixNumber(playerPosition.x - elementSize) < elementSize) {
        console.log('Out');
    } else {
        playerPosition.x -= elementSize;
        startGame();
    }
}

function moveRight() {
    console.log('Me quiero mover hacia la derecha');
    
    if (fixNumber(playerPosition.x + elementSize) > canvasSize) {
        console.log('Out');
    } else {
        playerPosition.x += elementSize;
        startGame();
    }
}

function moveDown() {
    console.log('Me quiero mover hacia abajo');
    
    if (fixNumber(playerPosition.y + elementSize) > canvasSize) {
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