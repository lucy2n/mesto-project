import { openCardPopup } from "./modal";
import { deleteMyCard, addLike, deleteLike } from "./api";

export const elements = document.querySelector('.elements');

const createCard = (card, profileId) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const trashButton = cardElement.querySelector('.element__trash-button');
    const likeButton = cardElement.querySelector('.element__like-button');
    const likeCount = cardElement.querySelector('.element__like-count');

    const isLiked = card.likes.some((user) => {
        return user._id == profileId;
    })

    if(isLiked) {
        likeButton.classList.add('element__like-button_active');
    } 

    likeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like-button_active');
        if(evt.target.classList.contains('element__like-button_active')) {
           addLike(card._id)
           .then((res) => {
            likeCount.textContent = Number(likeCount.textContent) + 1;
            console.log(res);
           }) 
        } else {
            deleteLike(card._id)
            .then((res) => {
                likeCount.textContent = Number(likeCount.textContent) - 1;
                console.log(res)
            })
        }
    });

    trashButton.classList.add('element__trash-button_disabled');
    if (profileId == card.owner._id) {
        trashButton.classList.remove('element__trash-button_disabled');
    }
    trashButton.addEventListener('click', () => {
        deleteMyCard(card._id)
        .then((res) => {
            cardElement.remove();
            console.log(res);
        })
    });
    const cardImage = cardElement.querySelector('.element__image');
    
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
