import { openCardPopup } from "./modal";

export const elements = document.querySelector('.elements');

const createCard = (card, profileId) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const trashButton = cardElement.querySelector('.element__trash-button');
    cardElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('element__like-button')) {
            evt.target.classList.toggle('element__like-button_active');
        }
    });

    trashButton.classList.add('element__trash-button_disabled');
    if (profileId == card.owner._id) {
        trashButton.classList.remove('element__trash-button_disabled');
    }
    trashButton.addEventListener('click', () => {
        cardElement.remove();
    });
    const cardImage = cardElement.querySelector('.element__image');
    const likeCount = cardElement.querySelector('.element__like-count');
    likeCount.textContent = card.likes.length;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardImage.addEventListener('click', () => {
        openCardPopup(card.name, card.link);
    });
    cardElement.querySelector('.element__title').textContent = card.name;
    return cardElement;
}

 export const addCard = (card, profileId) => {
    const cardElement = createCard(card, profileId);
    elements.prepend(cardElement);
}
