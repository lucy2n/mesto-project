export const  content = document.querySelector('.content');

export const  editPopup = document.querySelector('#popup-edit');
export const  addPopup = document.querySelector('#popup-add');
export const  avatarPopup = document.querySelector('#popup-avatar')
export const  closeButtons = document.querySelectorAll('.popup__close-button');

export const  editForm = document.forms["edit-profile"];
export const  nameInput = editForm.querySelector('#name-input');
export const  jobInput = editForm.querySelector('#subline-input');

export const  profile = content.querySelector('.profile');
export const  editButton = profile.querySelector('.profile__edit-button');
export const  addButton = profile.querySelector('.profile__add-button');
export const  editAvatarButton = profile.querySelector('.profile__edit-avatar-button');
export const  profileName = profile.querySelector('.profile__name');
export const  profileSubline = profile.querySelector('.profile__author-subline');
export const  profileAvatar = profile.querySelector('.profile__avatar');
export const  avatarFormElement = document.forms["popup-avatar"];

export const  addFormElement = document.forms["add-cards"];
export const  cardName = addFormElement.querySelector('#name-card-input');
export const  cardLink = addFormElement.querySelector('#link-card-input');

export const avatarInput = document.querySelector('#link-avatar-input');

export const  obj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
