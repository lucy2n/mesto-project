const editPopup = document.querySelector('#popup-edit');
const addPopup = document.querySelector('#popup-add');
const closeButton = editPopup.querySelector('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const elements = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');


function closeEditPopup() {
    editPopup.classList.remove('popup_opened');
  }

editButton.addEventListener('click', function () {
    editPopup.classList.add('popup_opened');
    closeButton.addEventListener('click', closeEditPopup); 
  }); 


const formElement = editPopup.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    const nameInput = formElement.querySelector('#name-info');
    const jobInput = formElement.querySelector('#subline-info');

    const profileName = document.querySelector('.profile__name');
    const profileSubline = document.querySelector('.profile__author-subline');

    profileName.innerHTML = nameInput.value;
    profileSubline.innerHTML = jobInput.value;

    console.log(profileName.value);
    console.log(nameInput.value);
    console.log(profileSubline.value);
    console.log(jobInput.value);

    closeEditPopup();

}

formElement.addEventListener('submit', formSubmitHandler);


function addCards(nameValue, linkValue) {
    const cards = document.createElement('div');
    cards.classList.add('.element');
    const linkCard = document.createElement('img');
    linkCard.classList.add('element__image');
    linkCard.textContent = linkValue;
    const nameCard = document.createElement('h3');
    nameCard.classList.add('element__title');
    nameCard.textContent = nameValue;
    const likeButton = document.createElement('button');
    likeButton.classList.add('element__like-button');
    cards.append(linkCard, nameCard, likeButton);
    elements.append(cards);
}

function closeAddPopup() {
    addPopup.classList.remove('popup_opened');
  }


addButton.addEventListener('click', function () {
    addPopup.classList.add('popup_opened');
    closeButton.addEventListener('click', closeAddPopup); 
  }); 







