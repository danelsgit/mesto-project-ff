import "./index.css";
import {
  renderCard,
  deleteCard,
  likeCard,
  openImagePopup,
} from "../components/cards";
import {
  setClosePopupListeners,
  closePopup,
  openPopup,
} from "../components/modal";
import { 
  getInfo,
  postNewCard,
  updateUserAvatar,
  updateUserProfile, } from "../components/api";
import { enableValidation, toggleButtonState } from "../components/validation";

const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImagePopup = document.querySelector(".popup_type_new-avatar");
const profileImageForm = document.querySelector("#new-avatar");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileEditForm = document.querySelector("#edit-profile");

const profileAddButton = document.querySelector(".profile__add-button");
const profileAddPopup = document.querySelector(".popup_type_new-card");


const cardList = document.querySelector(".places__list");
const placeInput = document.querySelector('input[name="place-name"]');
const linkInput = document.querySelector('input[name="link"]');
const formNewPlace = document.querySelector('#new-place')

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

let userId;

const renderLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
};

const fillProfileInfo = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
};

const renderInitialCards = (initialCards, userId) => {
  initialCards.forEach((card) => {
    renderCard(card, userId, cardList, likeCard, deleteCard, openImagePopup);
  });
};

const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditPopup);
  fillProfilePopup(
    profileEditForm,
    profileTitle.textContent,
    profileDescription.textContent,
  );
});

function turnOffButton(form){
  const inputList = Array.from(
    form.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = form.querySelector(
    settings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, settings);
}


profileAddButton.addEventListener("click", () => {
  openPopup(profileAddPopup);
  formNewPlace.reset()
  turnOffButton(formNewPlace)
});

profileImage.addEventListener("click", () => {
  openPopup(profileImagePopup);
  profileImageForm.reset()
  turnOffButton(profileImageForm)
});

function handleAvatarSubmit(evt){
  evt.preventDefault();
  renderLoading(true, profileImageForm.querySelector(".popup__button"));
  updateUserAvatar(profileImageForm.avatar.value)
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closePopup(profileImagePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, profileImageForm.querySelector(".popup__button"));
    });
    
  
  
}
profileImagePopup.addEventListener("submit", handleAvatarSubmit);


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, profileEditPopup.querySelector(".popup__button"));
  updateUserProfile({
    name: profileEditForm.name.value,
    about: profileEditForm.description.value,
  })
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, profileEditPopup.querySelector(".popup__button"));
    });
   
  
}
profileEditPopup.addEventListener("submit", handleProfileFormSubmit);

function handleFormCard() {
  renderLoading(true, profileAddPopup.querySelector(".popup__button"));
  const name = placeInput.value;
  const link = linkInput.value;
  postNewCard({ name, link })
    .then((newCard) => {
      renderCard(
        newCard,
        userId,
        cardList,
        likeCard,
        deleteCard,
        openImagePopup,
        "start",
        
      );
      closePopup(profileAddPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, profileAddPopup.querySelector(".popup__button"));
    });
    
  
}

function setCardFormHandler() {
  formNewPlace.addEventListener("submit", function(evt){ 
    evt.preventDefault();
    handleFormCard();
  })
}

getInfo()
  .then((result) => {
    const userInfo = result[0];
    userId = userInfo._id;
    const initialCards = result[1];
    fillProfileInfo(userInfo);
    renderInitialCards(initialCards, userId);
  })
  .catch((err) => {
    console.log(err);
  });

setClosePopupListeners();
setCardFormHandler();
enableValidation(settings);
