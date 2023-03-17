import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleSubmit }) {
    super(selector);
    this._hadleSubmit = handleSubmit;
    this._formElement = this._popup.querySelector(".popup__container");
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    this._formValues = {}
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._hadleSubmit);
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
