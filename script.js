const gameBoard = document.querySelector(".game-board")
const scoreBoard = document.querySelector(".score")
const hScoreBoard = document.querySelector(".high-score")


let boardSize = 30;
let score = 0;
let highScore = localStorage.getItem("high-score");
let foodY = 3;
let foodX = 3;
let snakeY = 5, snakeX = 5;
let dirY = 0, dirX = 0;
let setIntervalId;
let gameOver = false;
let snakeBody = [];

// Sounds Effect
const eatFoodsound = new Audio("mixkit-arrow-whoosh-1491.wav")
const gameOversound = new Audio("mixkit-arcade-fast-game-over-233.wav")

gameBoard.style = ` grid-template: repeat(${boardSize},1fr) / repeat(${boardSize},1fr);`


// Food Position Change Function 
const foodPositionChange = () => {
    foodY = Math.floor(Math.random() * boardSize + 1);
    foodX = Math.floor(Math.random() * boardSize + 1);

}

// Start The Game 
const startGame = () => {
    
    if (gameOver) return gameOverHandler();
    gameBoard.innerHTML = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`

    for(let j = snakeBody.length - 1; j > 0 ; j--){
        snakeBody[j] = snakeBody[j-1];
      
    }

    snakeX += dirX;
    snakeY += dirY;

    snakeBody[0] = [snakeX,snakeY] ;

    for(let i = 0; i < snakeBody.length; i++){
        gameBoard.innerHTML += `<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`

        if(i != 0 && snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]){
            gameOver = true;
        }
    }


    if (snakeX <= 0 || snakeX >= boardSize || snakeY <= 0 || snakeY >= boardSize) {
        gameOver = true;
    }
    eatFood();
}

// Snake Move Function 
const moveSnake = (e) => {
    if (e.key === "ArrowUp" && dirY != 1) {
        dirY = -1
        dirX = 0
    } else if (e.key === "ArrowDown" && dirY != -1) {
        dirY = 1
        dirX = 0
    } else if (e.key === "ArrowRight" && dirX != -1) {
        dirY = 0
        dirX = 1
    }
    else if (e.key === "ArrowLeft" && dirX != 1) {
        dirY = 0
        dirX = -1
    }
    startGame();
}

const eatFood = ()=>{
    if(snakeX === foodX && snakeY === foodY){
        foodPositionChange();
        score++;
        highScore = score >= highScore ? score: highScore;
        localStorage.setItem("high-score",highScore);
        scoreBoard.innerHTML = `Score: ${score}`;
        hScoreBoard.innerHTML = `High-Score ${highScore}`;
        eatFoodsound.load();
        eatFoodsound.play();
        snakeBody.push([foodX,foodY])
        
    }
}

// Game Over  Function 
const gameOverHandler = () => {
    eatFoodsound.pause();
    gameOversound.play();
    alert("Game Over");
    location.reload();
    clearInterval(setIntervalId);
   
}


foodPositionChange();

hScoreBoard.innerHTML = `High-Score ${highScore}`

setIntervalId = setInterval(startGame, 1000 / 10);

document.addEventListener("keydown", moveSnake);