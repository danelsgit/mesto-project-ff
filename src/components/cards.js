const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

import { initialCards } from '../utils/constants';



function deleteCard(cardElement) {
  
  const parentCard = cardElement.closest('.card');
  if (parentCard) {
    parentCard.remove();
  }
}

//@todo Функция создания карточки

function createCard(data, deleteCallback) {
  const cardElement = cardTemplate.cloneNode(true).querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector('.card__title').textContent = data.name;


  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    // Вызываем функцию удаления, передавая элемент карточки
   deleteCallback(cardElement)
  });

  return cardElement;
}

cardList.addEventListener('click', function(evt){
 
  if (evt.target.classList.contains('card__like-button')) {
   evt.target.classList.toggle('card__like-button_is-active')
  }
 })

 cardList.addEventListener('click', function(evt){
  const popupZoomImage = document.querySelector('.popup_type_image');
  if (evt.target.classList.contains('card__image')) {
    popupZoomImage.classList.remove('popup_is-animated');
    popupZoomImage.classList.add('popup_is-opened');

    
    const cardImg = evt.target.closest('.card__image');
    const image = cardImg.src;
    const description = cardImg.alt;

    // Set image source and description in the popup
    popupZoomImage.querySelector('.popup__image').src = image;
    popupZoomImage.querySelector('.popup__caption').textContent = description;
  }
 })
// @todo: Вывести карточки на страницу


function addCards() {
  initialCards.forEach((data) => {
    const cardElement = createCard(data, deleteCard);
    cardList.append(cardElement);
  });
}



export {addCards, createCard, deleteCard}