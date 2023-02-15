const showError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};

const hideError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    return inputList.some( (inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButton = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(obj.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(obj.inactiveButtonClass);
    }
};

const isValid = (formElement, inputElement, obj) => {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideError(formElement, inputElement, obj);
    }
};

const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButton(inputList, buttonElement, obj);
    formElement.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButton(inputList, buttonElement, obj);
        }, 0);
    });
    inputList.forEach( (input) => {
        input.addEventListener('input', () => {
            isValid(formElement, input, obj);
            toggleButton(inputList, buttonElement, obj);
        }); 
    });
};

const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach( (form) => {
        setEventListeners(form, obj);
    });
};

export { enableValidation };