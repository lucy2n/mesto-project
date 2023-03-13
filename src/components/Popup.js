export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._buttonClose = this._popup.querySelector(".popup__close-button");
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key == "Escape") {
      this.close();
    }
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
  }
}
