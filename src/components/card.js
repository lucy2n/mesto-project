import { openCardPopup } from "./modal";

export const elements = document.querySelector('.elements');

const createCard = (nameValue, linkValue) => {
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
    cardImage.src = linkValue;
    cardImage.alt = nameValue;
    cardImage.addEventListener('click', () => {
        openCardPopup(nameValue, linkValue);
    });
    cardElement.querySelector('.element__title').textContent = nameValue;
    return cardElement;
}

 export const addCard = (nameValue, linkValue) => {
    const cardElement = createCard(nameValue, linkValue);
    elements.prepend(cardElement);
}

export const fetchCards = () => {
    return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-21/cards', {
        headers: {
            authorization: '5832d533-117d-41c2-950f-4a452b9fc5a1'
          }
        })
          .then(res => res.json())
          .then((result) => {
            console.log(result);
          }); 
}