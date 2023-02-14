const cardPopup = document.querySelector('.image-popup');
const cardPopupName = cardPopup.querySelector('.popup__caption');
const cardPopupImage = cardPopup.querySelector('.popup__image');

const openCardPopup = (nameValue, linkValue) => {
    cardPopupName.textContent = nameValue;
    cardPopupImage.src = linkValue;
    cardPopupImage.alt = nameValue;
    openPopup(cardPopup);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}

export { openCardPopup, closePopup, openPopup };