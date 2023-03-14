import "../index.css";
import { handleSubmit } from "../ulits/utils.js";
import {
  editForm,
  nameInput,
  jobInput,
  editButton,
  addButton,
  editAvatarButton,
  profileAvatar,
  avatarFormElement,
  addFormElement,
  cardName,
  cardLink,
  obj,
  avatarInput,
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
});

const cardImagePopup = new PopupWithImage(".image-popup");
cardImagePopup.setEventListeners();

const loadData = () => {
  Promise.all([api.fetchProfileInfo(), api.fetchCards()])
    .then(([profileInfo, initialCards]) => {
      userInfo.setUserInfo({
        name: profileInfo.name,
        info: profileInfo.about,
      });

      profileAvatar.src = profileInfo.avatar;
      profileId = profileInfo._id;

      initialCards.reverse();

      const section = new Section(
        {
          items: initialCards,
          renderer: (item) => {
            const cardNew = new Card(
              item,
              profileId,
              {
                openCardPopup: (name, about) => {
                  cardImagePopup.open(name, about);
                },
              },
              "#card-template"
            );
            const cardElement = cardNew.createCard();
            section.addItem(cardElement);
          },
        },
        ".elements"
      );

      section.renderItems();
    })
    .catch((err) => console.log(err));
};

const setupEditForm = () => {
  const dataProfilInfo = userInfo.getUserInfo();

  nameInput.value = dataProfilInfo.name;
  jobInput.value = dataProfilInfo.info;
};

editButton.addEventListener("click", () => {
  const editProfilePopup = new PopupWithForm({
    selector: ".edit-popup",
    handleSubmit: (evt) => {
      const makeRequest = () => {
        return api
          .updateProfileInfo(nameInput.value, jobInput.value)
          .then((res) => {
            userInfo.setUserInfo({
              name: res.name,
              info: res.about,
            });
            editProfilePopup.close();
          });
      };
      handleSubmit(makeRequest, evt);
    },
  });
  const editProfileValidation = new FormValidator(obj, editForm);
  editProfileValidation.enableValidation();
  editProfilePopup.open();
  editProfilePopup.setEventListeners();
  setupEditForm();
});

addButton.addEventListener("click", () => {
  const addCardPopup = new PopupWithForm({
    selector: ".add-popup",
    handleSubmit: (evt) => {
      const makeRequest = () => {
        return api.postNewCard(cardName.value, cardLink.value).then((card) => {
          const section = new Section(
            {
              items: [card],
              renderer: (item) => {
                const cardNew = new Card(
                  item,
                  profileId,
                  {
                    openCardPopup: (name, about) => {
                      cardImagePopup.open(name, about);
                    },
                  },
                  "#card-template"
                );
                const cardElement = cardNew.createCard();
                section.addItem(cardElement);
              },
            },
            ".elements"
          );
          section.renderItems();
          addCardPopup.close();
        });
      };
      handleSubmit(makeRequest, evt);
    },
  });

  const addCardValidation = new FormValidator(obj, addFormElement);
  addCardValidation.enableValidation();
  addCardPopup.open();
  addCardPopup.setEventListeners();
});

editAvatarButton.addEventListener("click", () => {
  const editAvatarPopup = new PopupWithForm({
    selector: ".avatar-popup",
    handleSubmit: (evt) => {
      const makeRequest = () => {
        return api.updateAvatar(avatarInput.value).then((res) => {
          profileAvatar.src = res.avatar;
          editAvatarPopup.close();
        });
      };
      handleSubmit(makeRequest, evt);
    },
  });
  const avatarValidation = new FormValidator(obj, avatarFormElement);
  avatarValidation.enableValidation();
  editAvatarPopup.open();
  editAvatarPopup.setEventListeners();
});

loadData();
