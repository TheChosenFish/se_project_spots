const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

console.log(initialCards);

const profileEditButton = document.querySelector(".profile__edit-button");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editFormElement = editProfileModal.querySelector(".modal__form")
const modalCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editModalProfileName = editProfileModal.querySelector("#profile-name-input");
const editModalProfileDescription = editProfileModal.querySelector("#profile-description-input");

function openModal() {
  editProfileModal.classList.add("modal_opened");
}

function closeModal() {
  editModalProfileDescription.value = profileDescriptionElement.textContent;
  editModalProfileName.value = profileNameElement.textContent;
  editProfileModal.classList.remove("modal_opened");
}

function handleEditFormSubmit (evt) {
  evt.preventDefault ();
  profileDescriptionElement.textContent = editModalProfileDescription.value
  profileNameElement.textContent = editModalProfileName.value
  closeModal ();
};

profileEditButton.addEventListener("click", openModal);
modalCloseBtn.addEventListener("click", closeModal);
editProfileModal.addEventListener("submit", handleEditFormSubmit)
