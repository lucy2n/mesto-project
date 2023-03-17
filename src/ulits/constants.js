export const content = document.querySelector(".content");
export const editPopup = document.querySelector("#popup-edit");
export const addPopup = document.querySelector("#popup-add");
export const avatarPopup = document.querySelector("#popup-avatar");
export const editForm = document.forms["edit-profile"];
export const profile = content.querySelector(".profile");
export const editButton = profile.querySelector(".profile__edit-button");
export const addButton = profile.querySelector(".profile__add-button");
export const editAvatarButton = profile.querySelector(".profile__edit-avatar-button");
export const avatarFormElement = document.forms["popup-avatar"];
export const addFormElement = document.forms["add-cards"];

export const obj = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-21",
  headers: {
    authorization: "5832d533-117d-41c2-950f-4a452b9fc5a1",
    "Content-Type": "application/json",
  },
};
