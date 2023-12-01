// Находим форму в DOM
import { fillProfileInputs } from "../pages";

function closePopup(popup){
  popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
      fillProfileInputs()
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
    
}}

function closePopups(){
    const popups = document.querySelectorAll('.popup');

    popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
          if (evt.target.classList.contains('popup_is-opened')) {
              closePopup(popup)
              
          }
          if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
          }
      })
  })
    document.addEventListener('keydown', closeByEscape);
} 

export {closePopups, closePopup}