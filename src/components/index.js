import '../pages/index.css';
import { openPopup, closePopup } from './modal';
import { enableValidation } from './validate';
import { addCard} from './card';
import { fetchCards, fetchProfileInfo, updateProfileInfo, postNewCard } from './api';

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

const addFormElement = addPopup.querySelector('.popup__container');
const cardName = addFormElement.querySelector('#name-card-input');
const cardLink = addFormElement.querySelector('#link-card-input');

// const initialCards = [
//     {
//       name: 'Чикаго',
//       link: 'https://images.unsplash.com/photo-1648397711291-1e8555ab71c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
//     },
//     {
//       name: 'Токио',
//       link: 'https://images.unsplash.com/photo-1669876105374-aca0afa4deaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
//     },
//     {
//       name: 'Рим',
//       link: 'https://images.unsplash.com/photo-1670791737578-cc9b605ae2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
//     },
//     {
//       name: 'Нью-Йорк',
//       link: 'https://images.unsplash.com/photo-1666489022516-a9041fce76db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
//     },
//     {
//       name: 'Джайсалмер',
//       link: 'https://images.unsplash.com/photo-1670874972928-c177de8554bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
//     },
//     {
//       name: 'Куала-Лумпур',
//       link: 'https://images.unsplash.com/photo-1670239511435-922fcc026bf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
//     }
//     ];


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

const loadProfileData = () => {
  fetchProfileInfo()
  .then((res) =>  {
    profileName.textContent = res.name;
    profileSubline.textContent = res.about;
    profileAvatar.src = res.avatar;
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

    updateProfileInfo(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileSubline.textContent = res.about;
  
    })
    
    
    closePopup(editPopup);
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

    postNewCard(cardName.value, cardLink.value)
    .then((res) => {
      addCard(res.name, res.link);
    })

    closePopup(addPopup);

    addFormElement.reset();
}

addFormElement.addEventListener('submit', handleCardFormSubmit);

fetchCards()
  .then((initialCards) => {
    initialCards.reverse();
    initialCards.forEach((place) => {
      addCard(place.name, place.link);
    });
  })

const obj = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

enableValidation(obj);
loadProfileData();