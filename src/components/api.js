import { request } from "../ulits/utils.js";

export default class Api {
  constructor(options) {
    this._options = options;
  }

  fetchCards() {
    return request(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    });
  }

  fetchProfileInfo() {
    return request(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    });
  }

  updateProfileInfo(name, about) {
    return request(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  postNewCard(name, link) {
    return request(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteMyCard(cardId) {
    return request(`${this._options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._options.headers,
    });
  }

  addLike(cardId) {
    return request(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._options.headers,
    });
  }

  deleteLike(cardId) {
    return request(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._options.headers,
    });
  }

  updateAvatar(avatar) {
    return request(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }
}
