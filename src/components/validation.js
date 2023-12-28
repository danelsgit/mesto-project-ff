const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass ) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass ) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement,inputErrorClass, errorClass);
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
      checkInputValidity(formElement, inputElement, settings.inputErrorClass, settings.errorClass);
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

const clearValidation = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector,
  );
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
  inputList.forEach((inputElement) => {
    hideInputError(
      formElement,
      inputElement,
      settings.inputErrorClass,
      settings.errorClass,
    );
    
  });
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


const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
    setCustomValidityMessages(formElement, settings);
  });
};

export { enableValidation, clearValidation};
