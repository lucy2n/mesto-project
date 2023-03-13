import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleSubmit }) {
    super(selector);
    this._hadleSubmit = handleSubmit;
    this._formElement = this._popup.querySelector(".popup__container");
  }
  
}