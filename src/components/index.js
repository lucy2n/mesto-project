import '../pages/index.css';
import { closePopup, openCardPopup } from './modal';
import { handleSubmit } from './utils';
import { closeButtons, editForm, nameInput, jobInput, editButton, addButton, editAvatarButton, profileName, profileSubline, profileAvatar, avatarFormElement, addFormElement, cardName, cardLink, obj, avatarInput} from './constants';

import {api} from "./constants";
import Card from './CardNew.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';

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


    const section = new Section({
      items: initialCards,
      renderer: (item) => {
        const cardNew = new Card(item, profileId, openCardPopup, '#card-template');
        const cardElement = cardNew.createCard();

        section.addItem(cardElement)
      }}, '.elements');

    section.renderItems()

    /* const sect = new Section({
      items : initialCards,
      renderer: (itemE) => {
        const cardNew = new Card(item, profileId, openCardPopup, '#card-template');
        const cardElement = cardNew.createCard();
        sect.addItem(cardElement);
      }
    }) */


    
    // initialCards.forEach((card) => {
    //   //const sect = new Section( card,() => {const cardClass = new Card(card, profileId, openCardPopup, '#card-template');})
    //   const cardClass = new Card(card, profileId, openCardPopup, '#card-template');

    //   cardClass.addCard();
    // });
  })
  .catch(err => console.log(err));
}

const setupEditForm = () => {
    nameInput.value = profileName.textContent ;
    jobInput.value = profileSubline.textContent ;
};

editButton.addEventListener('click', () => {
    const editProfileValidation = new FormValidator(obj, editForm);
    editProfileValidation.enableValidation();
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
  const addCardValidation = new FormValidator(obj, addFormElement);
  addCardValidation.enableValidation();
    openPopup(addPopup);
});

editAvatarButton.addEventListener('click', () => {
  const avatarValidation = new FormValidator(obj, avatarFormElement);
  avatarValidation.enableValidation();
  openPopup(avatarPopup);
});

const handleCardFormSubmit = (evt) => {
  const makeRequest = () => {
    return api.postNewCard(cardName.value, cardLink.value)
    /* .then((card) => {
      const cardClass = new Card(card, profileId, openCardPopup, '#card-template')
      cardClass.addCard();
      closePopup(addPopup);
    }) */

    .then((card) => {
      const section = new Section({
        items: [card],
        renderer: (item) => {
          const cardNew = new Card(item, profileId, openCardPopup, '#card-template');
          const cardElement = cardNew.createCard();
          section.addItem(cardElement);
        }}, '.elements');
      section.renderItems();


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
//enableValidation(obj);
