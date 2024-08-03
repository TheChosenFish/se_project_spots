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

const profileEditButton = document.querySelector(".profile__edit-button");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

const editProfileModal = document.querySelector("#edit-profile-modal");
const editFormElement = editProfileModal.querySelector(".modal__form");
const modalCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editModalProfileName = editProfileModal.querySelector(
  "#profile-name-input"
);
const editModalProfileDescription = editProfileModal.querySelector(
  "#profile-description-input"
);

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const image = cardElement.querySelector(".card__image");
  cardNameEl.textContent = data.name;

  image.src = data.src;
  image.alt = data.alt;

  return cardElement;
}

console.log(cardTemplate);

function openModal() {
  editModalProfileDescription.value = profileDescriptionElement.textContent;
  editModalProfileName.value = profileNameElement.textContent;
  editProfileModal.classList.add("modal_opened");
}

function closeModal() {

  editProfileModal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileDescriptionElement.textContent = editModalProfileDescription.value;
  profileNameElement.textContent = editModalProfileName.value;
  closeModal();
}

profileEditButton.addEventListener("click", openModal);
modalCloseBtn.addEventListener("click", closeModal);
editFormElement.addEventListener("submit", handleEditFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}
