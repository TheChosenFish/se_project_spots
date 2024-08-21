const toggleErrorMessage = (inputElement, errorMessage, show) => {
  const errorElement = inputElement.nextElementSibling; // Assuming the error message is the next sibling
  if (show) {
    errorElement.textContent = errorMessage;
    errorElement.classList.remove("modal__error_hidden");
  } else {
    errorElement.textContent = '';
    errorElement.classList.add("modal__error_hidden");
  }
};



const showInputError = (formEl, inputElement, errorMessage) => {
  const errorMessageEl = formEl.querySelector(`#${inputElement.id}-error`);
  errorMessageEl.textContent = errorMessage;
  inputElement.classList.add("modal__input_type_error");
};

const hideInputError = (formEl, inputElement) => {
  const errorMessageEl = formEl.querySelector(`#${inputElement.id}-error`);
  errorMessageEl.textContent = "";
  inputElement.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formEl, inputElement) => {
  if (!inputElement.validity.valid) {
    toggleErrorMessage(formEl, inputElement, inputElement.validationMessage);
  } else {
    toggleErrorMessager(inputElement, "", false);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
    buttonEl.classList.add("modal__submit-btn_disabled");
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove("modal__submit-btn_disabled");
  }
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__submit-btn");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//   return !inputElement.validity.valid;
// });
// };
