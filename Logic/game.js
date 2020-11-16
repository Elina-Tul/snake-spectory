import { toggleModal, MODAL_KEYS } from './modal.js';
import { handlerResultObject } from './eventHandlers.js';
import { BOARD_SIZE, GAME_BOARD, APPLES_COUNTER } from './board.js';
import {
  draw as drawSnake,
  update as updateSnake,
  snakeShouldGrow,
  isFruitOnSnake,
  isSnakeBitesItself,
  isSnakeRunAway,
  howMuchSnakeAte,
  getSnakeLength,
  getIncreasedSnakeSpead
} from './snake.js'
import { draw as drawFruit, update as updateFruit, getFruitPosition, resetFruit } from './fruit.js'

let lastIntervlTime = getIncreasedSnakeSpead();
let currentIntervlTime = getIncreasedSnakeSpead();

let gameLoop = setInterval(gameLogic, currentIntervlTime);
APPLES_COUNTER.innerText = howMuchSnakeAte();
toggleModal(true, MODAL_KEYS.WELCOME);

function updateSnakeIfEatFruit() {
  const currentFruitPosition = getFruitPosition();
  if (isFruitOnSnake(currentFruitPosition)) {
    resetFruit();
    snakeShouldGrow();
    APPLES_COUNTER.innerText = howMuchSnakeAte();
  }
}

function gameLogic() {
  if (isWin()) {
    clearInterval(gameLoop);
    toggleModal(true, MODAL_KEYS.WIN);
  } else if (isGameOver()) {
    clearInterval(gameLoop);
    toggleModal(true, MODAL_KEYS.LOOSE);
  } else {
    currentIntervlTime = getIncreasedSnakeSpead();
    if (lastIntervlTime !== currentIntervlTime) {
      lastIntervlTime = currentIntervlTime;
      clearInterval(gameLoop);
      gameLoop = setInterval(gameLogic, currentIntervlTime);
    }
    GAME_BOARD.innerHTML = '';
    updateSnakeIfEatFruit()
    updateSnake();
    updateFruit();
    drawSnake(GAME_BOARD);
    drawFruit(GAME_BOARD);
  }
  handlerResultObject.isArrowsEnabled = true;
}

function isGameOver() {
  return isSnakeBitesItself() || isSnakeRunAway();
}

function isWin() {
  return BOARD_SIZE * BOARD_SIZE === getSnakeLength();
}

export {
  isGameOver,
  isWin
}