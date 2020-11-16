export const MODAL_KEYS = {
  WELCOME: 'welcome',
  WIN: 'win',
  PAUSE: 'pause',
  LOOSE: 'loose',
  BYE: 'bye'
}

function getModalInnerHtml(modalKey) {
  switch (modalKey) {
    case 'welcome':
      return `
      <h3>Welcome!</h3>
      <h3>how to play:</h3>
      <span>use arrows to move</span>
      <span>space key to pause the game</span>
      `
    case 'win':
      return `
      <h3>You won the game!</h3>
      <h3>wanna start again?</h3>
      <span>(y)es or (n)o</span>
      `
    case 'pause':
      return `
      <h3>Game paused!</h3>
      <h3>press space again to continue</h3>
      `
    case 'loose':
      return `
      <h3>You lost the game!</h3>
      <h3>wanna start again?</h3>
      <span>(Y)es or (N)o</span>
      `
    case 'bye':
      return `
        <h3>thanks a lot</h3>
        <h3>playing my snake game</h3>
        <span>Elina Tulchinsky</span>
        `
    default:
      return ''
  }
}

export function toggleModal(isOpen, modalKey) {
  const modal = document.getElementById('modal');
  modal.className = isOpen ? 'show' : 'hide';
  modal.innerHTML = isOpen ? `<div class="content">${getModalInnerHtml(modalKey)}</div>` : '';

}