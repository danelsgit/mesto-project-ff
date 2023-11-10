// @todo: Темплейт карточки

// @todo: DOM узлы

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

// @todo: Функция удаления карточки

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
    if (deleteCallback) {
      deleteCallback(cardElement);
    }
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

addCards();