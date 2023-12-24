const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList, settings)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setCustomValidityMessages = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      const isNameOrDescription =
        inputElement.name === "name" ||
        inputElement.name === "description" ||
        inputElement.name === "place-name";
      const isLink =
        inputElement.name === "link" || inputElement.name === "avatar";
      if (
        isNameOrDescription &&
        /[^а-яА-Яa-zA-Z-\s]/.test(inputElement.value)
      ) {
        inputElement.setCustomValidity(
          "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
        );
        toggleButtonState(inputList, buttonElement, settings);
      } else if (isLink && !/^https?:\/\/.*/.test(inputElement.value)) {
        toggleButtonState(inputList, buttonElement, settings);
        inputElement.setCustomValidity("В поле должен быть URL на картинку");
      } else {
        inputElement.setCustomValidity("");
      }
      checkInputValidity(formElement, inputElement);
    });
  });
};

// Изменяем функцию enableValidation, чтобы она также устанавливала кастомные сообщения об ошибках
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
    setCustomValidityMessages(formElement, settings);
  });
};

export { enableValidation, toggleButtonState};
