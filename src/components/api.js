import { request } from "../ulits/utils";

export default class Api {
    constructor(options) {
      this._options = options;
    }
    
    fetchCards() {//Запрос карточек с серва при загрузке
        return request(`${this._options.baseUrl}/cards`, { headers: this._options.headers})
    }

    fetchProfileInfo() {//Запрос инфы профиля при открытии попап
        return request(`${this._options.baseUrl}/users/me`, { headers: this._options.headers})
    }

    updateProfileInfo(name, about) { //Отправляем новую инфу о профиле на серв (и получаем ответ)
        return request(`${this._options.baseUrl}/users/me`, { 
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
    }

    postNewCard(name, link) { //Отправляем New карточку на сервер (и получаем ответ с новой)
        return request(`${this._options.baseUrl}/cards`, { 
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
    }
    
    deleteMyCard(cardId) { //Удаляем карточку (И получаем ответ)
        return request(`${this._options.baseUrl}/cards/${cardId}`, { 
            method: 'DELETE',
            headers: this._options.headers
        })
    }
    
    addLike(cardId) { //Добавляем лайк
        return request(`${this._options.baseUrl}/cards/likes/${cardId}`, { 
            method: 'PUT',
            headers: this._options.headers
        })
    }
    
    deleteLike(cardId) { //удаляем лайк
        return request(`${this._options.baseUrl}/cards/likes/${cardId}`, { 
            method: 'DELETE',
            headers: this._options.headers
        })
    }
    
    updateAvatar(avatar) { // Обновляем аватар
        return request(`${this._options.baseUrl}/users/me/avatar`, { 
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
    }
}
  