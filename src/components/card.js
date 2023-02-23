import { openCardPopup } from "./modal";

export const elements = document.querySelector('.elements');

const createCard = (card) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('element__like-button')) {
            evt.target.classList.toggle('element__like-button_active');
        }
    });
    cardElement.querySelector('.element__trash-button').addEventListener('click', () => {
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

 export const addCard = (card) => {
    const cardElement = createCard(card);
    elements.prepend(cardElement);
}
