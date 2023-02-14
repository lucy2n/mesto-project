const cardPopup = document.querySelector('.image-popup');
const cardPopupName = cardPopup.querySelector('.popup__caption');
const cardPopupImage = cardPopup.querySelector('.popup__image');

let currentPopup = null;

const openCardPopup = (nameValue, linkValue) => {
    cardPopupName.textContent = nameValue;
    cardPopupImage.src = linkValue;
    cardPopupImage.alt = nameValue;
    openPopup(cardPopup);
};

const closeByEsc = (evt) => {
    if (evt.key == "Escape") {
        closePopup(currentPopup);
    }
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

const openPopup = (popup) => {
    currentPopup = popup;
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

export { openCardPopup, closePopup, openPopup };