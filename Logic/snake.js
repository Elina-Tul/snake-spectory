import { handlerResultObject } from './eventHandlers.js'
const SNAKE_SPEED = 200;

const snakeBody = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 }
];


function update() {
  if (!handlerResultObject.isGamePaused && (handlerResultObject.currentSnakeDirection.x || handlerResultObject.currentSnakeDirection.y)) {
    const snakeTail = snakeBody.shift();
    const snakeHead = getSnakeHead();
    snakeTail.x = snakeHead.x + handlerResultObject.currentSnakeDirection.x;
    snakeTail.y = snakeHead.y + handlerResultObject.currentSnakeDirection.y;
    snakeBody.push(snakeTail);
  }
}

function draw(gameBoard) {
  snakeBody.forEach((snakeCell, index) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = snakeCell.y;
    snakeElement.style.gridColumnStart = snakeCell.x;
    if (index === 0) {
      snakeElement.classList.add('snake', 'tail');
    } else if (index === snakeBody.length - 1) {
      snakeElement.classList.add('snake', 'head');
    } else {
      snakeElement.classList.add('snake');
    }
    gameBoard.appendChild(snakeElement);
  });
}

function isFruitOnSnake(fruitPosition) {
  return snakeBody.some(snakeCell => {
    return snakeCell.x === fruitPosition.x && snakeCell.y === fruitPosition.y;
  })
}

function snakeShouldGrow() {
  const snakeHead = getSnakeHead();
  const newHead = {
    x: snakeHead.x + handlerResultObject.currentSnakeDirection.x,
    y: snakeHead.y + handlerResultObject.currentSnakeDirection.y
  }
  snakeBody.push(newHead);
}

function isSnakeBitesItself() {
  const snakeHead = getSnakeHead();
  return snakeBody.some((snakeCell, index) => {
    return snakeBody.length - 1 !== index && snakeCell.x === snakeHead.x && snakeCell.y === snakeHead.y;
  });
}

function isSnakeRunAway() {
  const snakeHead = getSnakeHead();
  return snakeHead.x > 20 || snakeHead.x < 0 || snakeHead.y > 20 || snakeHead.y < 0;
}

function howMuchSnakeAte() {
  return snakeBody.length - 3;
}

function getSnakeLength() {
  return snakeBody.length;
}

function getIncreasedSnakeSpead() {
  const nextSnakeSpeed = SNAKE_SPEED - (howMuchSnakeAte() * 5);
  console.log(nextSnakeSpeed)
  return nextSnakeSpeed > 50 ? nextSnakeSpeed : 50;
}

function getSnakeHead() {
  return snakeBody[snakeBody.length - 1];
}

export {
  update,
  draw,
  isFruitOnSnake,
  snakeShouldGrow,
  isSnakeBitesItself,
  isSnakeRunAway,
  howMuchSnakeAte,
  getSnakeLength,
  getIncreasedSnakeSpead
}
