import { api } from "../pages/index.js";

export default class Card {
  constructor(data, profileId, { openCardPopup }, selector) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._likes = data.likes;
    this._isLiked = this._likes.some((user) => {
      return user._id == profileId;
    });
    this._isOwner = profileId == this._owner._id;
    this._openCardPopup = openCardPopup;
    this._selector = selector;

    this._api = api;
  }

  _getCardElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _like(evt) {
    if (this._isLiked) {
      this._api
        .deleteLike(this._id)
        .then((res) => {
          this._tapLikeButton(evt, res);
        })
        .catch((err) => console.log(err));
    } else {
      this._api
        .addLike(this._id)
        .then((res) => {
          this._tapLikeButton(evt, res);
        })
        .catch((err) => console.log(err));
    }
  }

  _tapLikeButton(evt, res) {
    this._isLiked = !this._isLiked;
    evt.target.classList.toggle("element__like-button_active");
    this._likeCount.textContent = res.likes.length;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) => {
      this._like(evt);
    });

    this._trashButton.addEventListener("click", () => {
      this._api
        .deleteMyCard(this._id)
        .then(() => {
          this._cardElement.remove();
        })
        .catch((err) => console.log(err));
    });

    this._cardImage.addEventListener("click", () => {
      this._openCardPopup(this._name, this._link);
    });
  }

  createCard() {
    this._cardElement = this._getCardElement();
    this._likeButton = this._cardElement.querySelector(".element__like-button");
    this._trashButton = this._cardElement.querySelector(".element__trash-button");
    this._likeCount = this._cardElement.querySelector(".element__like-count");
    this._cardImage = this._cardElement.querySelector(".element__image");

    if (this._isLiked) {
      this._likeButton.classList.add("element__like-button_active");
    }
    
    if (!this._isOwner) {
      this._trashButton.classList.add("element__trash-button_disabled");
    }

    this._setEventListeners(this._cardElement);

    
    this._likeCount.textContent = this._likes.length;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".element__title").textContent = this._name;

    return this._cardElement;
  }
}
