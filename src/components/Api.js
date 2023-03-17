export default class Api {
  constructor(options) {
    this._options = options;
  }

  fetchCards() {
    return this._request(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    });
  }

  fetchProfileInfo() {
    return this._request(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    });
  }

  updateProfileInfo(data) {
    return this._request(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  postNewCard(data) {
    return this._request(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteMyCard(cardId) {
    return this._request(`${this._options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._options.headers,
    });
  }

  addLike(cardId) {
    return this._request(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._options.headers,
    });
  }

  deleteLike(cardId) {
    return this._request(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._options.headers,
    });
  }

  updateAvatar(data) {
    return this._request(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  };
}
