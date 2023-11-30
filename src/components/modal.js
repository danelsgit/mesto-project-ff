// Находим форму в DOM


function closePopups(){
    const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
for (const popup of popups) {
    
    popup.addEventListener('click', (evt) => {
      if (!popup.querySelector('.popup__content').contains(evt.target)) {
        popup.classList.remove('popup_is-opened');
        popup.classList.add('popup_is-animated');
      }
    });
  
    for (const closeButton of closeButtons) {
      closeButton.addEventListener('click', (evt) => {
        popup.classList.remove('popup_is-opened');
        popup.classList.add('popup_is-animated');
      });
    }
  
    popup.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        
        popup.classList.remove('popup_is-opened');
        popup.classList.add('popup_is-animated')
        popup.removeEventListener('keydown', this);
      }
    });
  }
}

export {closePopups}