const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

const popupZoomImage = document.querySelector(".popup_type_image");
const imageDescription = popupZoomImage.querySelector(".popup__caption");
const popupImage = popupZoomImage.querySelector(".popup__image");

import { initialCards } from "../utils/constants";
import { openPopup } from "../components/modal";

function deleteCard(cardElement) {
  const parentCard = cardElement.closest(".card");
  if (parentCard) {
    parentCard.remove();
  }
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function openImagePopup(data) {
  openPopup(popupZoomImage);
  popupImage.src = data.link;
  popupImage.alt = data.name;
  imageDescription.textContent = data.name;
}
//@todo Функция создания карточки

function createCard(data, { deleteCallback, handleLike, handleImageClick }) {
  const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    deleteCallback(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    handleLike(likeButton);
  });

  cardImage.addEventListener("click", function () {
    handleImageClick(data);
  });

  return cardElement;
}
// @todo: Вывести карточки на страницу

function addCards() {
  initialCards.forEach((data) => {
    const cardElement = createCard(data, {
      deleteCallback: deleteCard,
      handleLike: likeCard,
      handleImageClick: openImagePopup,
    });
    cardList.append(cardElement);
  });
}

export { addCards, createCard, deleteCard, likeCard, openImagePopup };
