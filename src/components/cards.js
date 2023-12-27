import { openPopup } from "../components/modal";
import {
  deleteLike,
  applyLike,
  deleteCard as deleteCardFromServer,
} from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const popupZoomImage = document.querySelector(".popup_type_image");
const imageDescription = popupZoomImage.querySelector(".popup__caption");
const popupImage = popupZoomImage.querySelector(".popup__image");

function deleteCard(evt, cardId) {
  deleteCardFromServer(cardId)
    .then((res) => {
      const card = document.querySelector(`[data-card-id="${cardId}"]`);
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

const likeCard = (evt, cardId) => {
  const currentLikes = evt.target.closest(".card").querySelector(".card__like-count");
  
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.remove("card__like-button_is-active");
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    applyLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.add("card__like-button_is-active");
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
};

//@todo Функция создания карточки

const createCard = (card, userId, deleteCard, likeCard, openImagePopup) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  // delete id
  cardElement.dataset.cardId = card._id;
  cardElement.dataset.ownerId = card.owner._id;
  cardImage.src = card.link;
  cardImage.alt = card.description;
  cardTitle.textContent = card.name;

  // likes
  cardLikeCount.textContent = card.likes.length;
  const isLiked = card.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  // delete
  if (card.owner._id === userId) {
    cardDeleteButton.addEventListener("click", (evt) => {
      deleteCard(evt, card._id);
    });
  } else {
    cardDeleteButton.remove();
  }

  cardLikeButton.addEventListener("click", (evt) => {
    likeCard(evt, card._id);
  });

  // image popup
  cardImage.addEventListener("click", () => {
    openImagePopup(cardImage.src, cardImage.alt, cardTitle.textContent);
  });

  return cardElement;
};

function openImagePopup(imageURL, imageAlt, title) {
  openPopup(popupZoomImage);
  popupImage.src = imageURL;
  popupImage.alt = imageAlt;
  imageDescription.textContent = title;
}
// @todo: Вывести карточки на страницу

const renderCard = (
  item,
  userId,
  container,
  likeCard,
  deleteCard,
  openImagePopup,
  place = "end"
) => {
  const cardElement = createCard(
    item,
    userId,
    deleteCard,
    likeCard,
    openImagePopup
  );
  if (place === "end") {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
};

export { renderCard, deleteCard, likeCard, openImagePopup };
