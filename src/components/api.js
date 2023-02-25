import { request } from "./utils";

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-21',
    headers: {
        authorization: '5832d533-117d-41c2-950f-4a452b9fc5a1',
        'Content-Type': 'application/json'
    }
  }

 const fetchCards = () => {
    return request(`${config.baseUrl}/cards`, { headers: config.headers})
          .then(result => result)
}

 const fetchProfileInfo = () => {
    return request(`${config.baseUrl}/users/me`, { headers: config.headers})
        .then(result => result)
}

const updateProfileInfo = (name, about) => {
    return request(`${config.baseUrl}/users/me`, { 
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
}

const postNewCard = (name, link) => {
    return request(`${config.baseUrl}/cards`, { 
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
}

const deleteMyCard = (cardId) => {
    return request(`${config.baseUrl}/cards/${cardId}`, { 
        method: 'DELETE',
        headers: config.headers
    })
}

const addLike = (cardId) => {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, { 
        method: 'PUT',
        headers: config.headers
    })
}

const deleteLike = (cardId) => {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, { 
        method: 'DELETE',
        headers: config.headers
    })
}

const updateAvatar = (avatar) => {
    return request(`${config.baseUrl}/users/me/avatar`, { 
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar : avatar
        })
    })
}

export {fetchCards, fetchProfileInfo, updateProfileInfo, postNewCard, deleteMyCard, addLike, deleteLike, updateAvatar }