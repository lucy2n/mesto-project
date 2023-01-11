const content = document.querySelector('.content');

const editPopup = document.querySelector('#popup-edit');
const addPopup = document.querySelector('#popup-add');

const profile = content.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');

function closePopup (popup) {
    popup.classList.remove('popup_opened');
}

function loadProfileData () {

    const nameInput = editForm.querySelector('#name-info');
    const jobInput = editForm.querySelector('#subline-info');

    const profileName = profile.querySelector('.profile__name');
    const profileSubline = profile.querySelector('.profile__author-subline');

    nameInput.value = profileName.textContent ;
    jobInput.value = profileSubline.textContent ;
};

// Edit Profile form

editButton.addEventListener('click', function () {
    editPopup.classList.add('popup_opened');
    loadProfileData();
    const closeButton = editPopup.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
        closePopup(editPopup);
        editForm.reset();
    }); 
});

function formSubmitEdit (evt) {
    evt.preventDefault(); 
    
    const nameInput = editForm.querySelector('#name-info');
    const jobInput = editForm.querySelector('#subline-info');

    const profileName = profile.querySelector('.profile__name');
    const profileSubline = profile.querySelector('.profile__author-subline');

    profileName.textContent = nameInput.value;
    profileSubline.textContent = jobInput.value;

    closePopup(editPopup);
}
 
const editForm = editPopup.querySelector('.popup__container');
editForm.addEventListener('submit', formSubmitEdit);

// Add Card form

addButton.addEventListener('click', function () {
    addPopup.classList.add('popup_opened');
    const closeButton = addPopup.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
        closePopup(addPopup);
        addFormElement.reset();
    });
});

function formSubmitAdd (evt) {
    evt.preventDefault(); 
    
    const cardName = addFormElement.querySelector('#name-card');
    const cardLink = addFormElement.querySelector('#link-card');

    addCard(cardName.value, cardLink.value);
    closePopup(addPopup);

    addFormElement.reset();
}

const addFormElement = addPopup.querySelector('.popup__container');
addFormElement.addEventListener('submit', formSubmitAdd);


function addCard (nameValue, linkValue) {
    const elements = content.querySelector('.elements');
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__trash-button').addEventListener('click', function () {
        cardElement.remove();
    });
    cardElement.querySelector('.element__image').src = linkValue;
    cardElement.querySelector('.element__image').addEventListener('click', function () {
        openCard(nameValue, linkValue);
    });
    cardElement.querySelector('.element__title').textContent = nameValue;
    cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
        console.log(cardElement);
    }); 
    elements.append(cardElement);
}

function openCard(nameValue, linkValue) {
    const cardPopup = document.querySelector('.card-popup');
    const cardPopupName = cardPopup.querySelector('.card-popup__caption');
    const cardPopupImage = cardPopup.querySelector('.card-popup__image');
    const closeButtonCard = cardPopup.querySelector('.close-button');

    closeButtonCard.addEventListener('click', function () {
        cardPopup.classList.remove('card-popup_opened');
    });
    cardPopupName.textContent = nameValue;
    cardPopupImage.src = linkValue;

    cardPopup.classList.add('card-popup_opened');
}


const initialCards = [
    {
      name: 'Чикаго',
      link: 'https://images.unsplash.com/photo-1648397711291-1e8555ab71c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
    },
    {
      name: 'Токио',
      link: 'https://images.unsplash.com/photo-1669876105374-aca0afa4deaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    },
    {
      name: 'Рим',
      link: 'https://images.unsplash.com/photo-1670791737578-cc9b605ae2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
    },
    {
      name: 'Нью-Йорк',
      link: 'https://images.unsplash.com/photo-1666489022516-a9041fce76db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    },
    {
      name: 'Джайсалмер',
      link: 'https://images.unsplash.com/photo-1670874972928-c177de8554bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    },
    {
      name: 'Куала-Лумпур',
      link: 'https://images.unsplash.com/photo-1670239511435-922fcc026bf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    }
    ];

initialCards.forEach(function (place) {
    addCard(place.name, place.link);
});