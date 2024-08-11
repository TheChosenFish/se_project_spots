const initialCards = [
  {
    name: "Val Thorens",
    src: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "Val Thorens",
  },
  {
    name: "Restaurant terrace",
    src: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    alt: "Restaurant terrace",
  },

  {
    name: "An outdoor cafe",
    src: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    alt: "An outdoor cafe",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    src: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    alt: "A very long bridge, over the forest and through the trees",
  },

  {
    name: "Tunnel with morning light",
    src: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    alt: "Tunnel with morning light",
  },

  {
    name: "Mountain house",
    src: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "Mountain house",
  },
];
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
const preModalClosebtn = previewModal.querySelector(".modal__close-btn")

// Form Elements
const editProfileModal = document.querySelector("#edit-profile-modal");
const editFormElement = editProfileModal.querySelector(".modal__form");
const modalCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editModalProfileName = editProfileModal.querySelector(
  "#profile-name-input"
);
const editModalProfileDescription = editProfileModal.querySelector(
  "#profile-description-input"
);
// Card Elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const newCard = document.querySelector("#new-card-modal");
const cardModalClsBtn = newCard.querySelector(".modal__close-btn");
const newCardModal = newCard.querySelector(".modal__form");
const newCardLinkInput = newCard.querySelector("#add-card-link-input");
const newCardCaptionInput = newCard.querySelector("#add-card-caption-input");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  const cardLikedBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__trash-button");

  cardLikedBtn.addEventListener("click", () => {
    cardLikedBtn.classList.toggle("card__like-button_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove(".card");
  });

  image.addEventListener("click", () => {
    openModal(previewModal);
    preModalCaptionEl.textContent = data.name;
    preModalImage.src = data.src;
    preModalCaptionEl.alt = data.alt;
  });

  preModalClosebtn.addEventListener("click", () => {
    closeModal(previewModal);
  });



  cardNameEl.textContent = data.name;
  image.src = data.src;
  image.alt = data.alt;

  return cardElement;
}

// console.log(cardTemplate);

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileDescriptionElement.textContent = editModalProfileDescription.value;
  profileNameElement.textContent = editModalProfileName.value;
  closeModal(editProfileModal);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  console.log(newCardLinkInput.value);
  console.log(newCardCaptionInput.value);
  const inputValues = {
    name: newCardCaptionInput.value,
    src: newCardLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(newCard);
}

function handleNewCardDelete(evt) {
  evt.preventDefault();
}

profileEditButton.addEventListener("click", () => {
  editModalProfileDescription.value = profileDescriptionElement.textContent;
  editModalProfileName.value = profileNameElement.textContent;
  openModal(editProfileModal);
});
modalCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(newCard);
});
cardModalClsBtn.addEventListener("click", () => {
  closeModal(newCard);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
newCardModal.addEventListener("submit", handleNewCardSubmit);

// for (let i = 0; i < initialCards.length; i++) {
//   const cardElement = getCardElement(initialCards[i]);
//   cardsList.prepend(cardElement);
// }

initialCards.forEach((card) => {
  console.log(card);
  const cardElement = getCardElement(card);
  cardsList.append(cardElement);
});
