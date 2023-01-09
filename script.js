const content = document.querySelector('.content');

const editPopup = document.querySelector('#popup-edit');
const addPopup = document.querySelector('#popup-add');
const closeButtonEdit = editPopup.querySelector('.close-button');
const closeButtonAdd = addPopup.querySelector('.close-button');

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


function addCard (nameValue, linkValue) {
    const elements = document.querySelector('.elements');
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

function formSubmitAdd (evt) {
    evt.preventDefault(); 
    
    const cardName = addFormElement.querySelector('#name-card');
    const cardLink = addFormElement.querySelector('#link-card');

    addCard(cardName.value, cardLink.value);
    closePopup(addPopup);

    // Clear inputs
    cardLink.value = '';
    cardName.value = '';
}

const addFormElement = addPopup.querySelector('.popup__container');
addFormElement.addEventListener('submit', formSubmitAdd);


const initialCards = [
    {
      name: 'Закат в Криничном',
      link: 'https://sun9-27.userapi.com/impg/zee_qL_aXO42k7PX8DDp58vCaKAk4RNlbOeTOQ/CxYUbv1d5C8.jpg?size=1620x2160&quality=96&sign=430132b974d5c72014744a6f7cf38be8&type=album'
    },
    {
      name: 'Жизнь и JS',
      link: 'https://psv4.userapi.com/c240331/u172308308/docs/d59/3cbc811f879c/pain-min.png?extra=s4P66Hd_mj_f_wmn-8CfKlAEq1T-_dS_-t278gy5ePAHXfwGScXvPoSJuvWyTgFDlGt6LzOBdtb1yIYUnjVHzk3rPhMAN7jvaV32rX0GOipdT47VKz0_K2bSXE5Q7qWv-nu9efozBz42jO_ZkNIyOxdZTQ'
    },
    {
      name: 'Шашлычок 1 января',
      link: 'https://psv4.userapi.com/c240331/u172308308/docs/d2/d3e9989b9339/meat-min.png?extra=gTkOwdZtj_w6rKJrcTukhXBJ3RdNTmKAgikNELa0zFuKuw4fmvzRdWkcM0Oq7yQ9nYeGm22TCoYYABAJGO61SCsL-f4nWvZNFlML_P-jilPuZGR8_ToxqdmvwlO9wZAJjZEFgwhHXYCj0OIrYxEN7VMejA'
    },
    {
      name: 'Caviar',
      link: 'https://psv4.userapi.com/c240331/u172308308/docs/d58/ce034cb7dca8/caviar-min.png?extra=sr1O0bIk7wyC_aUsm3atcklEZsms8YF9ST0xyuSKgT7paW3CRa8SEFUtywUd5HZ-1SOB5x_n6RpMczGhrFOxLMPr6iwcK9DLtc9mfPFKCw43uSKwx9gsJ_EgInII180AZTwkuqNsILTjK2MIvRr0wI7cWQ'
    },
    {
      name: 'Кот Яша',
      link: 'https://psv4.userapi.com/c240331/u172308308/docs/d13/10fb67921a70/cat-min.png?extra=Rl9_ix428we2VdxWVWF3GvYw4-ovUC4Iv2tuybo-DCLowswc2XbmtS6I7Az1ucxkJ2GuHGqmLh4lfm_3gCKbj4GwGU6A8fxUSdqY6eP7WAKfN3lo6iqUs6iew_3W9AnqR7gHHzy9iAzSzWy69ktSaM97iA'
    },
    {
      name: 'Ёлочка зимой',
      link: 'https://psv4.userapi.com/c240331/u172308308/docs/d52/338a9b5f445b/tree-min.png?extra=lOSvNQD4V1NCZ_iXQSf-ChY41Niz8rnSJLUUrg0sx0vtzyEfI3FWbb3QQVnMNrFhUCK0ykIDTW3TQOXQHt3sJDjIecBdLiLIqXY8phIYW312SMC-xj3f-up-qF_NoKpVCYL63-T2PEZ_freGIobqzo8cAw'
    }
    ];


    initialCards.forEach(function (place) {
        addCard(place.name, place.link);
    })