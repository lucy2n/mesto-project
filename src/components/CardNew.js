import {api} from "./constants.js";

export default class Card {
    constructor( data , profileId, openCardPopup, selector) {
        this._id = data._id;
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner;
        this._likes = data.likes;
        this._isLiked = this._likes.some((user) => { //НАш ли лайк
            return user._id == profileId;
        });
        this._isOwner = profileId == this._owner._id//Наша ли карточка;
        this._openCardPopup = openCardPopup;
        this._selector = selector;

        this._api = api;
    }

    _getCardElement() {
        const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement
    }

    _like(evt, cardElement) {
        const likeCount = cardElement.querySelector('.element__like-count');
        
        if (this._isLiked) {
            this._api.deleteLike(this._id)
            .then((res) => {
                this._tapLikeButton(evt, likeCount, res);
            })
            .catch(err => console.log(err));
        } else {
            this._api.addLike(this._id)
            .then((res) => {
                this._tapLikeButton(evt, likeCount, res);
            })
            .catch(err => console.log(err));
        }
    }

    _tapLikeButton(evt, likeCount, res) {
        this._isLiked = !this._isLiked;
        evt.target.classList.toggle('element__like-button_active');
        likeCount.textContent = res.likes.length;
    }

    _setEventListeners(cardElement) {
        const likeButton = cardElement.querySelector('.element__like-button');
        const trashButton = cardElement.querySelector('.element__trash-button');
        const cardImage = cardElement.querySelector('.element__image');

        likeButton.addEventListener('click', (evt) => {
            this._like(evt, cardElement)
        });

        trashButton.addEventListener('click', () => {
            this._api.deleteMyCard(this._id)
            .then(() => {
                cardElement.remove();
            })
            .catch(err => console.log(err));
        });

        cardImage.addEventListener('click', () => {
            this._openCardPopup(this._name, this._link);
        });
    }

    _createCard() {
        const cardElement = this._getCardElement()
        const likeButton = cardElement.querySelector('.element__like-button');
        const trashButton = cardElement.querySelector('.element__trash-button');
        const likeCount = cardElement.querySelector('.element__like-count');

        if(this._isLiked) {
            likeButton.classList.add('element__like-button_active');
        } 
        
        if(!this._isOwner) {
            trashButton.classList.add('element__trash-button_disabled');
        }

        this._setEventListeners(cardElement);

        const cardImage = cardElement.querySelector('.element__image');
        likeCount.textContent = this._likes.length;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardElement.querySelector('.element__title').textContent = this._name;

        return cardElement;
    }
    
    addCard() { // TODO: За вставку карточки в разметку должен отвечать класс Section
        const cardElement = this._createCard();
        document.querySelector('.elements').prepend(cardElement);
    }
}