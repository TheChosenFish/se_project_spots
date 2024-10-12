import "../pages/index.css";
import { setSubmitButtonText } from "../Utils/Helpers.js";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../Utils/Api.js";
import avatarSrc from "../images/avatar.jpg";

const profileImage = document.getElementById("avatar-image");

// const initialCards = [
//   {
//     name: "Val Thorens",
//     src: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//     alt: "Val Thorens",
//   },
//   {
//     name: "Restaurant terrace",
//     src: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//     alt: "Restaurant terrace",
//   },

//   {
//     name: "An outdoor cafe",
//     src: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//     alt: "An outdoor cafe",
//   },

//   {
//     name: "A very long bridge, over the forest and through the trees",
//     src: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//     alt: "A very long bridge, over the forest and through the trees",
//   },

//   {
//     name: "Tunnel with morning light",
//     src: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//     alt: "Tunnel with morning light",
//   },

//   {
//     name: "Mountain house",
//     src: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//     alt: "Mountain house",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7d7c7032-a925-465f-95d5-699a1df9381c",
    about: "Placeholder description",
    avatar:
      "https://practicum-content.s3.amazonaws.com/resources/default-avatar_1704458546.png",
    name: "Placeholder name",
    id: "",
    "Content-Type": "application/json",
  },
});

// destructure second item in callback of .then()

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
    profileImage.src = userInfo.avatar;
    profileNameElement.textContent = userInfo.name;
    profileDescriptionElement.textContent = userInfo.about;
  })
  .catch(console.error);

// Profile Elements
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

const previewModal = document.querySelector("#preview-modal");
const preModalImage = previewModal.querySelector(".modal__image");
const preModalCaptionEl = previewModal.querySelector(".modal__caption");

// Avatar Elements
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarEditButton = document.querySelector(".profile__avatar-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");

// Form Elements
const editProfileModal = document.querySelector("#edit-profile-modal");
const editFormElement = editProfileModal.querySelector(".modal__form");
const profileSubmitBtn = editProfileModal.querySelector(".modal__submit-btn")

const editModalProfileName = editProfileModal.querySelector(
  "#profile-name-input"
);
const closeButtons = [...document.querySelectorAll(".modal__close-btn")];
const editModalProfileDescription = editProfileModal.querySelector(
  "#profile-description-input"
);
// Card Elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const newCardModal = document.querySelector("#new-card-modal");
const cardModalClsBtn = newCardModal.querySelector(".modal__close-btn");
const cardModalSubmitBtn = newCardModal.querySelector(".modal__submit-btn");
const newCardForm = newCardModal.querySelector(".modal__form");
const newCardLinkInput = newCardModal.querySelector("#add-card-link-input");
const newCardCaptionInput = newCardModal.querySelector(
  "#add-card-caption-input"
);
const cardDeleteModal = document.querySelector("#delete-card-modal");
const deleteModalDelBtn = cardDeleteModal.querySelector(".modal__delete-btn");
const deleteModalCanclBtn = cardDeleteModal.querySelector(".modal__cancel-btn");
let selectedCard;
let selectedCardId;

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  const cardLikedBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__trash-button");

  cardLikedBtn.addEventListener("click", () => {
    if (cardLikedBtn.classList.contains("card__like-button_liked")) {
      api
        .nonlikedCard(data._id)
        .then(() => {
          cardLikedBtn.classList.remove("card__like-button_liked");
        })
        .catch(console.error);
    } else {
      api
        .likeCard(data._id)
        .then(() => {
          cardLikedBtn.classList.add("card__like-button_liked");
        })
        .catch(console.error);
    }
  });

  cardDeleteBtn.addEventListener("click", () =>
    handleCardDelete(cardElement, data)
  );

  image.addEventListener("click", () => {
    openModal(previewModal);
    preModalCaptionEl.textContent = data.name;
    preModalImage.src = data.link;
    preModalImage.alt = data.name;
  });

  cardNameEl.textContent = data.name;
  image.src = data.link;
  image.alt = data.alt;

  if (data.isLiked) {
    cardLikedBtn.classList.add("card__like-button_liked");
  }
  return cardElement;
}

function handleDeleteSubmit() {
  // evt.preventDefault()
  setSubmitButtonText(deleteModalDelBtn, "Deleting");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(cardDeleteModal);
      newCardForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      setSubmitButtonText(deleteModalDelBtn, "Delete");
    });
}
function handleCardDelete(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(cardDeleteModal);
}
deleteModalDelBtn.addEventListener("click", handleDeleteSubmit);
deleteModalCanclBtn.addEventListener("click", () => {
  closeModal(cardDeleteModal);
});

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyPress);
  document.addEventListener("click", handleOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyPress);
  document.removeEventListener("click", handleOverlay);
}

function handleEscKeyPress(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const profileSubmitBtn = evt.submitter;
  profileSubmitBtn.textContent = "Saving...";



  api
    .editUserInfo({
      name: editModalProfileName.value,
      about: editModalProfileDescription.value,
    })
    .then((data) => {
      profileDescriptionElement.textContent = data.about;
      profileNameElement.textContent = data.name;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      cardModalSubmitBtn.textContent = "Save";
    });
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const cardModalSubmitBtn = evt.submitter;
  cardModalSubmitBtn.textContent = "Saving...";

  api
    .addNewCard({
      name: newCardCaptionInput.value,
      link: newCardLinkInput.value,
    })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      disableButton(cardModalSubmitBtn, settings);
      closeModal(newCardModal);
      newCardForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      cardModalSubmitBtn.textContent = "Save";
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const avatarSubmitBtn = evt.submitter;
  avatarSubmitBtn.textContent = "Saving...";
  api
    .editAvatar({
      avatar: avatarInput.value,
    })
    .then((data) => {
      profileImage.src = avatarInput.value;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      avatarSubmitBtn.textContent = "Save";
    });
}

profileEditButton.addEventListener("click", () => {
  editModalProfileDescription.value = profileDescriptionElement.textContent;
  editModalProfileName.value = profileNameElement.textContent;
  resetValidation(
    editFormElement,
    [editModalProfileDescription, editModalProfileName],
    settings
  );
  openModal(editProfileModal);
});
// modalCloseBtn.addEventListener("click", () => {
//   closeModal(editProfileModal);
// });

profileAddButton.addEventListener("click", () => {
  openModal(newCardModal);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => {
    closeModal(modal);
  });
});

function handleOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

avatarEditButton.addEventListener("click", () => {
  openModal(avatarModal);
});
avatarForm.addEventListener("submit", handleAvatarSubmit);

editFormElement.addEventListener("submit", handleEditFormSubmit);
newCardForm.addEventListener("submit", handleNewCardSubmit);

// for (let i = 0; i < initialCards.length; i++) {
//   const cardElement = getCardElement(initialCards[i]);
//   cardsList.prepend(cardElement);
// }

enableValidation(settings);
