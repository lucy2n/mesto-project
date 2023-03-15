import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleSubmit }) {
    super(selector);
    this._hadleSubmit = handleSubmit;
    this._formElement = this._popup.querySelector(".popup__container");
  }

  _getInputValue() {
    const inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    let inputValues = [];
    inputList.forEach((input) => {
      inputValues.append(input.value);
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._buttonClose.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });

    this._formElement.addEventListener("submit", this._hadleSubmit);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._formElement.reset();
  }
}
