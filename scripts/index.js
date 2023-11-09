// @todo: Темплейт карточки


const cardData = [
  { src: "../images/card_1.jpg", name: "Карачаевск" },
  { src: "../images/card_2.jpg", name: "Гора Эльбрус" },
  { src: "../images/card_3.jpg", name: "Домбай" },
  { src: "../images/card_4.jpg", name: "Гора Фудзи" },
  { src: "../images/card_5.jpg", name: "Море" },
  { src: "../images/card_6.jpg", name: "Книга" },
];

// @todo: DOM узлы

const cardTemplate = document.querySelector("#places-card").content;
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function addCard() {
  cardData.forEach((data) => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(".card__image").src = data.src;
    cardElement.querySelector(".card__title").textContent = data.name;

    // @todo: Функция удаления карточки

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", function () {
      // Используем closest для нахождения ближайшего родителя с классом 'places__list-item'
      const parentCard = deleteButton.closest(".places__list-item");

      if (parentCard) {
        cardList.removeChild(parentCard);
      }
    });

    cardList.append(cardElement);
  });
}

// @todo: Вывести карточки на страницу

document.addEventListener("DOMContentLoaded", function () {
  addCard();
});
