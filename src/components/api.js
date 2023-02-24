const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-21',
    headers: {
        authorization: '5832d533-117d-41c2-950f-4a452b9fc5a1',
        'Content-Type': 'application/json'
    }
  }

 const fetchCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
        })
          .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then(result => result)
          .catch(err => console.log(err));
}

 const fetchProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => result)
      .catch(err => console.log(err));
}

const updateProfileInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => result)
      .catch(err => console.log(err));
}

const postNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => result)
      .catch(err => console.log(err));
}

const deleteMyCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => result)
      .catch(err => console.log(err));
}

const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => result)
      .catch(err => console.log(err));
}

const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(result => result)
      .catch(err => console.log(err));
}

const updateAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar : avatar
        })
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .then(result => result)
    .catch(err => console.log(err));
}

export {fetchCards, fetchProfileInfo, updateProfileInfo, postNewCard, deleteMyCard, addLike, deleteLike, updateAvatar }