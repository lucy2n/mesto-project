const content = document.querySelector('.content');

const editPopup = document.querySelector('#popup-edit');
const addPopup = document.querySelector('#popup-add');
const closeButtonEdit = editPopup.querySelector('.popup__close-button');
const closeButtonAdd = addPopup.querySelector('.popup__close-button');

const profile = content.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

function closePopup (popup) {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', function () {
    editPopup.classList.add('popup_opened');
    closeButtonEdit.addEventListener('click', function () {
        closePopup(editPopup);
    }); 
}); 

addButton.addEventListener('click', function () {
    addPopup.classList.add('popup_opened');
    closeButtonAdd.addEventListener('click', function () {
        closePopup(addPopup);
    });
});

function formSubmitEdit (evt) {
    evt.preventDefault(); 
    
    const nameInput = formElement.querySelector('#name-info');
    const jobInput = formElement.querySelector('#subline-info');

    const profileName = document.querySelector('.profile__name');
    const profileSubline = document.querySelector('.profile__author-subline');

    profileName.textContent = nameInput.value;
    profileSubline.textContent = jobInput.value;

    closePopup(editPopup);
}
 
const formElement = editPopup.querySelector('.popup__container');
formElement.addEventListener('submit', formSubmitEdit);

// https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg

function addCard (nameValue, linkValue) {
    const elements = document.querySelector('.elements');

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__trash-button').addEventListener('click', function (evt) {
        cardElement.remove();
     }); ;
    cardElement.querySelector('.element__image').src = linkValue;
    cardElement.querySelector('.element__title').textContent = nameValue;
    cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
     }); 
     elements.append(cardElement);
}

function deleteCard () {

}

function formSubmitAdd (evt) {
    evt.preventDefault(); 
    
    const cardName = addFormElement.querySelector('#name-card');
    const cardLink = addFormElement.querySelector('#link-card');

    addCard(cardName.value, cardLink.value);
    closePopup(addPopup);

    cardLink.value = '';
    cardName.value = '';
}

const addFormElement = addPopup.querySelector('.popup__container');
addFormElement.addEventListener('submit', formSubmitAdd);









