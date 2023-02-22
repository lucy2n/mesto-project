const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-21',
    headers: {
        authorization: '5832d533-117d-41c2-950f-4a452b9fc5a1',
        'Content-Type': 'application/json'
    }
  }

export const fetchCards = () => {
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