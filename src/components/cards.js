const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const popupZoomImage = document.querySelector('.popup_type_image');

import { initialCards } from '../utils/constants';
import { openPopup } from '../pages';


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
   deleteCallback(cardElement)
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  const imageDescription = popupZoomImage.querySelector('.popup__caption')
  const popupImage = popupZoomImage.querySelector('.popup__image')
  
  cardImage.addEventListener('click', function () {
    openPopup(popupZoomImage);

    const cardImg = this.closest('.card__image');
    const image = cardImg.src;
    const description = cardImg.alt;

    popupImage.src = image;
    popupImage.alt = description;
    imageDescription.textContent = description;
  });
  return cardElement;
}
// @todo: Вывести карточки на страницу


function addCards() {
  initialCards.forEach((data) => {
    const cardElement = createCard(data, deleteCard);
    cardList.append(cardElement);
  });
}



export {addCards, createCard, deleteCard}