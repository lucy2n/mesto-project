const content = document.querySelector('.content');

const editPopup = document.querySelector('#popup-edit');
const addPopup = document.querySelector('#popup-add');
const closeButtons = document.querySelectorAll('.popup__close-button');

const editForm = editPopup.querySelector('.popup__container');
const nameInput = editForm.querySelector('#name-input');
const jobInput = editForm.querySelector('#subline-input');

const profile = content.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileSubline = profile.querySelector('.profile__author-subline');

const addFormElement = addPopup.querySelector('.popup__container');
const cardName = addFormElement.querySelector('#name-card-input');
const cardLink = addFormElement.querySelector('#link-card-input');

const cardPopup = document.querySelector('.image-popup');
const cardPopupName = cardPopup.querySelector('.popup__caption');
const cardPopupImage = cardPopup.querySelector('.popup__image');

const elements = content.querySelector('.elements');

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', function () {
        closePopup(popup);
    });

    document.addEventListener('keydown', function (evt) {
        if (evt.key == "Escape") {
            closePopup(popup)
        }
    });
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
    const cardImage = cardElement.querySelector('.element__image');
    cardImage.src = linkValue;
    cardImage.alt = nameValue;
    cardImage.addEventListener('click', function () {
        openCard(nameValue, linkValue);
    });
    cardElement.querySelector('.element__title').textContent = nameValue;
    return cardElement;
}

function addCard (nameValue, linkValue) {
    const cardElement = createCard(nameValue, linkValue);
    elements.prepend(cardElement);
}

function openCard(nameValue, linkValue) {
    cardPopupName.textContent = nameValue;
    cardPopupImage.src = linkValue;
    cardPopupImage.alt = nameValue;
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

elements.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('element__like-button')) {
        evt.target.classList.toggle('element__like-button_active');
    }
});  

function closeByOverlay(evt) {
    console.log(evt.key);
    if(evt.target.classList.contains('popup')) {
        closePopup(evt.currentTarget)
    }
}

addPopup.addEventListener('click',  closeByOverlay);
editPopup.addEventListener('click',  closeByOverlay);
cardPopup.addEventListener('click',  closeByOverlay);

/* Forms Validation */

const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    return inputList.some( (inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButton = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__submit-button_inactive');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__submit-button_inactive');
    }
};

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');
    toggleButton(inputList, buttonElement);
    inputList.forEach( (input) => {
        input.addEventListener('input', () => {
            isValid(formElement, input);
            toggleButton(inputList, buttonElement);
        }); 
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__container'));
    formList.forEach( (form) => {
        setEventListeners(form);
    });
};

enableValidation();
