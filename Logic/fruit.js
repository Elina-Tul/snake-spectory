import { isFruitOnSnake } from './snake.js';
import { BOARD_SIZE } from './board.js';

let fruit = getRandomFruitPosition();

function getRandomFruitPosition() {
  let newFruitPosition = {
    x: Math.floor(Math.random() * BOARD_SIZE) + 1,
    y: Math.floor(Math.random() * BOARD_SIZE) + 1,
  }

  while (isFruitOnSnake(newFruitPosition)) {
    return getRandomFruitPosition()
  }
  return newFruitPosition;
}

function getFruitPosition() {
  return fruit;
}

function resetFruit() {
  fruit = null;
}

function update() {
  if (!fruit)
    fruit = getRandomFruitPosition();
}

function draw(gameBoard) {
  const fruitElement = document.createElement('div');
  fruitElement.style.gridRowStart = fruit.y;
  fruitElement.style.gridColumnStart = fruit.x;
  fruitElement.classList.add('fruit');
  gameBoard.appendChild(fruitElement);
}

export {
  update,
  draw,
  resetFruit,
  getFruitPosition,
}