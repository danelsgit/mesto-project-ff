import './index.css';
import { addCards, createCard, deleteCard} from '../components/cards';
import { closePopups, closePopup } from '../components/modal';

const profileEditButton = document.querySelector('.profile__edit-button')
const profileEditPopup = document.querySelector('.popup_type_edit')

function openPopup(popup) {
  popup.classList.remove('popup_is-animated');
  popup.classList.add('popup_is-opened');
}


profileEditButton.addEventListener('click', () => {
  openPopup(profileEditPopup)
});

const profileAddButton = document.querySelector('.profile__add-button')
const profileAddPopup = document.querySelector('.popup_type_new-card')

profileAddButton.addEventListener('click', () => {
  openPopup(profileAddPopup)
});




const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]')

const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');

function fillProfileInputs() {
    // Заполняем поля формы текущими значениями полей страницы
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent; 
    
    placeInput.value = ''; 
    linkInput.value = '';
}


function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;

    closePopup(profileEditPopup)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

function renderProfileForm() {
    fillProfileInputs()
    profileEditPopup.addEventListener('submit', handleProfileFormSubmit);
}

const cardList = document.querySelector('.places__list');
const placeInput = document.querySelector('input[name="place-name"]');
const linkInput = document.querySelector('input[name="link"]')

function handleFormCard(evt) {
    evt.preventDefault();
  
    const placeValue = placeInput.value;
    const linkValue = linkInput.value;
  
    const cardData = {
      name: placeValue,
      link: linkValue
    };
  
    const cardElement = createCard(cardData, deleteCard);
  
    cardList.insertBefore(cardElement, cardList.firstChild);
  
   

    closePopup(profileAddPopup)
  }
  
  function setCardFormHandler() {
    profileAddPopup.addEventListener('submit', handleFormCard);
  }


closePopups();
addCards();
setCardFormHandler();
renderProfileForm();

export {openPopup, fillProfileInputs}