import '../pages/index.css';
import { openPopup, closePopup } from './modal';
import { enableValidation } from './validate';
import { addCard} from './card';
import { fetchCards, fetchProfileInfo, updateProfileInfo, postNewCard, updateAvatar } from './api';
import { renderLoading } from './utils';

const content = document.querySelector('.content');

const editPopup = document.querySelector('#popup-edit');
const addPopup = document.querySelector('#popup-add');
const avatarPopup = document.querySelector('#popup-avatar')
const closeButtons = document.querySelectorAll('.popup__close-button');

const editForm = editPopup.querySelector('.popup__container');
const nameInput = editForm.querySelector('#name-input');
const jobInput = editForm.querySelector('#subline-input');

const profile = content.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const editAvatarButton = profile.querySelector('.profile__edit-avatar-button');
const profileName = profile.querySelector('.profile__name');
const profileSubline = profile.querySelector('.profile__author-subline');
const profileAvatar = profile.querySelector('.profile__avatar');
const avatarFormElement = avatarPopup.querySelector('.popup__container');

const addFormElement = addPopup.querySelector('.popup__container');
const cardName = addFormElement.querySelector('#name-card-input');
const cardLink = addFormElement.querySelector('#link-card-input');

const obj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

let profileId = null;

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
        closePopup(popup);
    });

    popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup')) {
            closePopup(evt.currentTarget)
        }
    });
});

const setUpCards = () => {
  fetchCards()
  .then((initialCards) => {
    initialCards.reverse();
    console.log(initialCards)
    initialCards.forEach((place) => {
      addCard(place, profileId);
    });
  });
}

const loadProfileData = () => {
  fetchProfileInfo()
  .then((res) =>  {
    profileName.textContent = res.name;
    profileSubline.textContent = res.about;
    profileAvatar.src = res.avatar;
    profileId = res._id;
    setUpCards();
  })
}

const setupEditForm = () => {
    nameInput.value = profileName.textContent ;
    jobInput.value = profileSubline.textContent ;
};

editButton.addEventListener('click', () => {
    openPopup(editPopup);
    setupEditForm();
});

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault(); 
    renderLoading(true, editForm);
    updateProfileInfo(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileSubline.textContent = res.about;
    })
    .finally(() => {
      renderLoading(false, editForm);
      closePopup(editPopup);
    })
}
 
editForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => {
    openPopup(addPopup);
});

editAvatarButton.addEventListener('click', () => {
  openPopup(avatarPopup);
});

const handleCardFormSubmit = (evt) => {
    evt.preventDefault(); 

    renderLoading(true, addPopup);
    postNewCard(cardName.value, cardLink.value)
    .then((res) => {
      addCard(res, profileId);
    })
    .finally(() => {
      renderLoading(false, addPopup);
      closePopup(addPopup);
    })

    addFormElement.reset();
}

addFormElement.addEventListener('submit', handleCardFormSubmit);

const handleAvatarFormSubmit = (evt) => {
    evt.preventDefault(); 
    
    renderLoading(true, avatarPopup);
    const avatarInput = document.querySelector('#link-avatar-input');
    updateAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
    })
    .finally(() => {
      renderLoading(false, avatarPopup);
      closePopup(avatarPopup);
    })

}
 avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);




loadProfileData();

enableValidation(obj);
