import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._nameImage = this._popup.querySelector(".popup__caption");
    this._linkImage = this._popup.querySelector(".popup__image");
  }

  open(nameImage, linkImage) {
    this._nameImage.textContent = nameImage;
    this._linkImage.src = linkImage;
    this._linkImage.alt = nameImage;
    this._popup.classList.add("popup_opened");
  }
}