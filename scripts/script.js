const content = document.querySelector('.content');

const editPopup = document.querySelector('#popup-edit');
const addPopup = document.querySelector('#popup-add');
const closeButtons = document.querySelectorAll('.popup__close-button');

const editForm = editPopup.querySelector('.popup__container');
const nameInput = editForm.querySelector('#name-info');
const jobInput = editForm.querySelector('#subline-info');

const profile = content.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileSubline = profile.querySelector('.profile__author-subline');

const addFormElement = addPopup.querySelector('.popup__container');
const cardName = addFormElement.querySelector('#name-card');
const cardLink = addFormElement.querySelector('#link-card');

const cardPopup = document.querySelector('.image-popup');
const cardPopupName = cardPopup.querySelector('.popup__caption');
const cardPopupImage = cardPopup.querySelector('.popup__image');

const elements = content.querySelector('.elements');

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', function () {
        closePopup(popup);
    })
});

function closePopup (popup) {
    popup.classList.remove('popup_opened');
}

function openPopup (popup) {
    popup.classList.add('popup_opened');
}

function loadProfileData () {
    nameInput.value = profileName.textContent ;
    jobInput.value = profileSubline.textContent ;
};

// Edit Profile form

editButton.addEventListener('click', function () {
    openPopup(editPopup);
    loadProfileData();
});

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileSubline.textContent = jobInput.value;

    closePopup(editPopup);
}
 
editForm.addEventListener('submit', handleProfileFormSubmit);

// Add Card form

addButton.addEventListener('click', function () {
    openPopup(addPopup);
});

function handleCardFormSubmit (evt) {
    evt.preventDefault(); 

    addCard(cardName.value, cardLink.value);
    closePopup(addPopup);

    addFormElement.reset();
}

addFormElement.addEventListener('submit', handleCardFormSubmit);

function createCard(nameValue, linkValue) {
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
    }); 
    return cardElement;
}

function addCard (nameValue, linkValue) {
    const cardElement = createCard(nameValue, linkValue);
    elements.prepend(cardElement);
}

function openCard(nameValue, linkValue) {
    cardPopupName.textContent = nameValue;
    cardPopupImage.src = linkValue;
    openPopup(cardPopup);
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