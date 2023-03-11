import '../pages/index.css';
import { openPopup, closePopup } from './modal';
import { enableValidation } from './validate';
import { addCard} from './card';
import { fetchCards, fetchProfileInfo, updateProfileInfo, postNewCard, updateAvatar } from './api';
import { handleSubmit } from './utils';
import {editPopup, addPopup, avatarPopup, closeButtons, editForm, nameInput, jobInput, editButton, addButton, editAvatarButton, profileName, profileSubline, profileAvatar, avatarFormElement, addFormElement, cardName, cardLink, obj, avatarInput} from './constants';

import {api} from "./constants";


export let profileId = null;

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
    initialCards.forEach((place) => {
      addCard(place, profileId);
    });
  })
  .catch(err => console.log(err));
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
  const makeRequest = () => {
    return api.updateProfileInfo(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileSubline.textContent = res.about;
      closePopup(editPopup);
    })
  }
  handleSubmit(makeRequest, evt);
}
 
editForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => {
    openPopup(addPopup);
});

editAvatarButton.addEventListener('click', () => {
  openPopup(avatarPopup);
});

const handleCardFormSubmit = (evt) => {
  const makeRequest = () => {
    return api.postNewCard(cardName.value, cardLink.value)
    .then((res) => {
      addCard(res, profileId);
      closePopup(addPopup);
    })
  }
  handleSubmit(makeRequest, evt)
}

addFormElement.addEventListener('submit', handleCardFormSubmit);

const handleAvatarFormSubmit = (evt) => {
  const makeRequest = () => {
    return api.updateAvatar(avatarInput.value)
      .then((res) => {
        profileAvatar.src = res.avatar;
        closePopup(avatarPopup);
      });
  }
  handleSubmit(makeRequest, evt)
}

 avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

loadData();
enableValidation(obj);
