function openPopup(popup) {
  popup.classList.remove("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function setClosePopupListeners() {
  const popups = document.querySelectorAll(".popup");

  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_is-opened")) {
        closePopup(popup);
      }
      if (evt.target.classList.contains("popup__close")) {
        closePopup(popup);
      }
    });
  });
}

export { setClosePopupListeners, closePopup, openPopup };
