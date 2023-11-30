import './index.css';
import { addCards, createCard, deleteCard} from '../components/cards';
import { closePopups } from '../components/modal';

const profileEditButton = document.querySelector('.profile__edit-button')
const profileEditPopup = document.querySelector('.popup_type_edit')

profileEditButton.addEventListener('click', () => {
  profileEditPopup.classList.remove('popup_is-animated');
  profileEditPopup.classList.add('popup_is-opened');
});

const profileAddButton = document.querySelector('.profile__add-button')
const profileAddPopup = document.querySelector('.popup_type_new-card')

profileAddButton.addEventListener('click', () => {
  profileAddPopup.classList.remove('popup_is-animated');
  profileAddPopup.classList.add('popup_is-opened');
});




const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]')

const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');

const currentName = nameElement.textContent;
const currentJob = jobElement.textContent;



function handleOpen() {
    // Заполняем поля формы текущими значениями полей страницы
    nameInput.value = currentName;
    jobInput.value = currentJob;
}


function handleFormSubmit(evt) {
    evt.preventDefault(); 
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;


    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;


    profileEditPopup.classList.remove('popup_is-opened');
    profileEditPopup.classList.add('popup_is-animated');

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

function profileForm() {
    handleOpen()
    profileEditPopup.addEventListener('submit', handleFormSubmit);
    
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
  
    placeInput.value = '';
    linkInput.value = '';

    profileAddPopup.classList.remove('popup_is-opened');
    profileAddPopup.classList.add('popup_is-animated');

  
  }
  
  function addCardForm() {
    profileAddPopup.addEventListener('submit', handleFormCard);
  }





closePopups();
addCards();
addCardForm();
profileForm();