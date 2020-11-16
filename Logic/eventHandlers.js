import { toggleModal, MODAL_KEYS } from './modal.js';
import { isGameOver, isWin } from './game.js';

export const handlerResultObject = {
  isArrowsEnabled: true,
  isGamePaused: false,
  currentSnakeDirection: { x: 0, y: 0 },
  lastSnakeDirection: { x: 0, y: 0 }
};

window.addEventListener('keydown', e => {
  const isGameEnded = isGameOver() || isWin();
  if (handlerResultObject.isArrowsEnabled) {
    switch (e.code) {
      case 'Space':
        if (isGameEnded) return
        handlerResultObject.isGamePaused = !handlerResultObject.isGamePaused;
        toggleModal(handlerResultObject.isGamePaused, MODAL_KEYS.PAUSE);
        break
      case 'ArrowUp':
        if (isGameEnded || handlerResultObject.isGamePaused || handlerResultObject.lastSnakeDirection.y !== 0) break
        handlerResultObject.currentSnakeDirection = { x: 0, y: -1 };
        handlerResultObject.lastSnakeDirection = handlerResultObject.currentSnakeDirection;
        handlerResultObject.isArrowsEnabled = false;
        toggleModal(false);
        break
      case 'ArrowDown':
        if (isGameEnded || handlerResultObject.isGamePaused || handlerResultObject.lastSnakeDirection.y !== 0) break
        handlerResultObject.currentSnakeDirection = { x: 0, y: 1 };
        handlerResultObject.lastSnakeDirection = handlerResultObject.currentSnakeDirection;
        handlerResultObject.isArrowsEnabled = false;
        toggleModal(false);
        break
      case 'ArrowLeft':
        if (isGameEnded || handlerResultObject.isGamePaused || handlerResultObject.lastSnakeDirection.x !== 0) break
        handlerResultObject.currentSnakeDirection = { x: -1, y: 0 };
        handlerResultObject.lastSnakeDirection = handlerResultObject.currentSnakeDirection;
        handlerResultObject.isArrowsEnabled = false;
        toggleModal(false);
        break
      case 'ArrowRight':
        if (isGameEnded || handlerResultObject.isGamePaused || handlerResultObject.lastSnakeDirection.x !== 0) break
        handlerResultObject.currentSnakeDirection = { x: 1, y: 0 };
        handlerResultObject.lastSnakeDirection = handlerResultObject.currentSnakeDirection;
        handlerResultObject.isArrowsEnabled = false;
        toggleModal(false);
        break
      case 'KeyY':
        if (!isGameEnded) break
        location.reload();
        break
      case 'KeyN':
        if (!isGameEnded) break
        handlerResultObject.currentSnakeDirection = { x: 0, y: 0 };
        handlerResultObject.lastSnakeDirection = handlerResultObject.currentSnakeDirection;
        handlerResultObject.isArrowsEnabled = false;
        toggleModal(true, MODAL_KEYS.BYE);
        break
    }
  }
})