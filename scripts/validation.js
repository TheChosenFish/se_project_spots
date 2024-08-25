const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const showInputError = (formEl, inputElement, errorMessage, config) => {
  const errorMessageEl = formEl.querySelector(`#${inputElement.id}-error`);
  errorMessageEl.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
  errorMessageEl.classList.add(config.errorClass);
};

const hideInputError = (formEl, inputElement, config) => {
  const errorMessageEl = formEl.querySelector(`#${inputElement.id}-error`);
  errorMessageEl.textContent = "",config;
  inputElement.classList.remove(config.inputErrorClass);
  errorMessageEl.classList.remove(config.errorClass);
};

const checkInputValidity = (formEl, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formEl, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formEl, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList, config)) {
    buttonEl.disabled = true;
    buttonEl.classList.add(config.inactiveButtonClass);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

// const disableButton = (buttonEl, config) => {
//   buttonEl.disabled = true;
//   buttonEl.classList.add(config.inactiveButtonClass);
// };

const resetValidation = (formEl, inputList) => {
  inputList.forEach((input, config) => {
    hideInputError(formEl, input, config);
  });
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function (config) {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
