import '../pages/index.css';
import { closePopup, openCardPopup } from './modal';
import { handleSubmit } from './utils';
import { closeButtons, editForm, nameInput, jobInput, editButton, addButton, editAvatarButton, profileName, profileSubline, profileAvatar, avatarFormElement, addFormElement, cardName, cardLink, obj, avatarInput} from './constants';

import {api} from "./constants";
import Card from './CardNew.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

export let profileId = null;

const cardImagePopup = new PopupWithImage('.image-popup');
cardImagePopup.setEventListeners();

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
        closePopup(popup);
    });

    popup.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup')) {
            closePopup(evt.currentTarget)
        }
    });
});



const loadData = () => {
  Promise.all([api.fetchProfileInfo(), api.fetchCards()])
  .then(([profileInfo, initialCards]) => {
    profileName.textContent = profileInfo.name;
    profileSubline.textContent = profileInfo.about;
    profileAvatar.src = profileInfo.avatar;
    profileId = profileInfo._id;

    initialCards.reverse();


    const section = new Section({
      items: initialCards,
      renderer: (item) => {
        const cardNew = new Card(item, profileId, { openCardPopup: (name, about) => {
          cardImagePopup.open(name, about);
        } } , '#card-template');
        const cardElement = cardNew.createCard();
        section.addItem(cardElement)
      }}, '.elements');

    section.renderItems()
  })
  .catch(err => console.log(err));
}

const setupEditForm = () => {
    nameInput.value = profileName.textContent ;
    jobInput.value = profileSubline.textContent ;
};

editButton.addEventListener('click', () => {
    const editProfilePopup = new PopupWithForm ({
      selector: '.edit-popup',
      handleSubmit: (evt) => {
        const makeRequest = () => {
          return api.updateProfileInfo(nameInput.value, jobInput.value)
          .then((res) => {
            profileName.textContent = res.name;
            profileSubline.textContent = res.about;
            editProfilePopup.close()
          })
        }
        handleSubmit(makeRequest, evt);
      }
    })
    const editProfileValidation = new FormValidator(obj, editForm);
    editProfileValidation.enableValidation();
    editProfilePopup.open();
    editProfilePopup.setEventListeners();
    setupEditForm();
});

addButton.addEventListener('click', () => {
  const addCardPopup = new PopupWithForm ({
    selector: '.add-popup',
    handleSubmit: (evt) => {
      const makeRequest = () => {
        return api.postNewCard(cardName.value, cardLink.value)
        .then((card) => {
          const section = new Section({
            items: [card],
            renderer: (item) => {
              const cardNew = new Card(item, profileId, { 
                openCardPopup: (name, about) => {
                cardImagePopup.open(name, about);
              } } , '#card-template');
              const cardElement = cardNew.createCard();
              section.addItem(cardElement);
            }}, '.elements');
          section.renderItems();
          addCardPopup.close();
        })
      }
      handleSubmit(makeRequest, evt);
    }  
  })
  //

  const addCardValidation = new FormValidator(obj, addFormElement);
  addCardValidation.enableValidation();
  addCardPopup.open();
  addCardPopup.setEventListeners();
});

editAvatarButton.addEventListener('click', () => {
  const editAvatarPopup = new PopupWithForm({
    selector: '.avatar-popup',
    handleSubmit: (evt) => {
      const makeRequest = () => {
        return api.updateAvatar(avatarInput.value)
          .then((res) => {
            profileAvatar.src = res.avatar;
            editAvatarPopup.close();
          });
      }
      handleSubmit(makeRequest, evt)
    }
  })
  const avatarValidation = new FormValidator(obj, avatarFormElement);
  avatarValidation.enableValidation();
  editAvatarPopup.open();
  editAvatarPopup.setEventListeners();
});


loadData();
