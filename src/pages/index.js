import "./index.css";
import {
  addCards,
  createCard,
  deleteCard,
  likeCard,
  openImagePopup,
} from "../components/cards";
import {
  setClosePopupListeners,
  closePopup,
  openPopup,
} from "../components/modal";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");

const profileAddButton = document.querySelector(".profile__add-button");
const profileAddPopup = document.querySelector(".popup_type_new-card");

const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]');

const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");

const cardList = document.querySelector(".places__list");
const placeInput = document.querySelector('input[name="place-name"]');
const linkInput = document.querySelector('input[name="link"]');

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditPopup);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
});

profileAddButton.addEventListener("click", () => {
  openPopup(profileAddPopup);
  placeInput.value = "";
  linkInput.value = "";
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;

  closePopup(profileEditPopup);
}

function setProfileFormHandler() {
  profileEditPopup.addEventListener("submit", handleProfileFormSubmit);
}

function handleFormCard(evt) {
  evt.preventDefault();

  const placeValue = placeInput.value;
  const linkValue = linkInput.value;

  const cardData = {
    name: placeValue,
    link: linkValue,
  };

  const cardElement = createCard(cardData, {
    deleteCallback: deleteCard,
    handleLike: likeCard,
    handleImageClick: openImagePopup,
  });

  cardList.insertBefore(cardElement, cardList.firstChild);

  closePopup(profileAddPopup);
}

function setCardFormHandler() {
  profileAddPopup.addEventListener("submit", handleFormCard);
}

setClosePopupListeners();
addCards();
setCardFormHandler();
setProfileFormHandler();
