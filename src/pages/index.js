import "../index.css";
import { handleSubmit } from "../ulits/utils.js";
import {
  editForm,
  editButton,
  addButton,
  editAvatarButton,
  avatarFormElement,
  addFormElement,
  obj,
  config,
} from "../ulits/constants.js";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

export let profileId = null;

export const api = new Api(config);

const userInfo = new UserInfo({
  profileName: ".profile__name",
  profileDescription: ".profile__author-subline",
  profileAvatar: ".profile__avatar"
});

const section = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
    },
  },
  ".elements"
);

const editProfilePopup = new PopupWithForm({
  selector: ".edit-popup",
  handleSubmit: (evt) => {
    evt.preventDefault();
    const data = editProfilePopup._getInputValues();
    const makeRequest = () => {
      return api
        .updateProfileInfo(data)
        .then((res) => {
          userInfo.setUserInfo({
            name: res.name,
            info: res.about,
            avatar: res.avatar
          });
          editProfilePopup.close();
        });
    };
    handleSubmit(makeRequest, evt);
  },
});
editProfilePopup.setEventListeners();

const editProfileValidation = new FormValidator(obj, editForm);
editProfileValidation.enableValidation();

const addCardPopup = new PopupWithForm({
  selector: ".add-popup",
  handleSubmit: (evt) => {
    const data = addCardPopup._getInputValues();
    const makeRequest = () => {
      return api.postNewCard(data)
      .then((card) => {
        section.updateItems([card]);
        section.renderItems();
        addCardPopup.close();
      });
    };
    handleSubmit(makeRequest, evt);
  },
});
addCardPopup.setEventListeners();

const addCardValidation = new FormValidator(obj, addFormElement);
addCardValidation.enableValidation();

const editAvatarPopup = new PopupWithForm({
  selector: ".avatar-popup",
  handleSubmit: (evt) => {
    const data = editAvatarPopup._getInputValues();
    const makeRequest = () => {
      return api.updateAvatar(data)
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          info: res.about,
          avatar: res.avatar
        });
        editAvatarPopup.close();
      });
    };
    handleSubmit(makeRequest, evt);
  },
});

editAvatarPopup.setEventListeners();

const avatarValidation = new FormValidator(obj, avatarFormElement);
avatarValidation.enableValidation();

const cardImagePopup = new PopupWithImage(".image-popup");
cardImagePopup.setEventListeners();

const createCard = (item) => {
  const cardNew = new Card(
    item,
    profileId,
    { deleteLike: (cardId) => {
      return api.deleteLike(cardId);
    },
    addLike: (cardId) => {
      return api.addLike(cardId);
    },
    deleteMyCard: (cardId) => {
      return api.deleteMyCard(cardId);
    }, 
      openCardPopup: (name, about) => {
        cardImagePopup.open(name, about);
      },
    },
    "#card-template"
  );
             const cardElement = cardNew.createCard();
   return cardElement
 }

const loadData = () => {
  Promise.all([api.fetchProfileInfo(), api.fetchCards()])
    .then(([profileInfo, initialCards]) => {
      userInfo.setUserInfo({
        name: profileInfo.name,
        info: profileInfo.about,
        avatar: profileInfo.avatar,
      });

      profileId = profileInfo._id;

      initialCards.reverse();
      section.updateItems(initialCards)
      section.renderItems();
    })
    .catch((err) => console.log(err));
};

const setupEditForm = () => {
  const dataProfilInfo = userInfo.getUserInfo();
  editProfilePopup.setInputValues({
    'name': dataProfilInfo.name,
    'about':  dataProfilInfo.info 
  }) 
};

editButton.addEventListener("click", () => {
  editProfilePopup.open();
  setupEditForm();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
});

loadData();

