class Api {
  constructor({baseUrl,headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
  }
  
  _checkOk(res) {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    }

  _request(url, options) {
      return fetch(`${this._baseUrl}${url}`, options).then(this._checkOk)
  }
  
  getCards(){
    return this._request('/cards', {
      method: 'GET',
      credentials: "include",
      headers: this._headers
  });
  }

  getUserInfo() {
    return this._request('/users/me', {
      method: 'GET',
      credentials: "include",
      headers: this._headers
  });
}

  editUserProfile({name, about}) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        credentials: "include",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        }),
      })

      .then((res) => this._checkOk(res));
  }
  
  addNewCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        credentials: "include",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        }),
      })
      
      .then((res) => this._checkOk(res));
  }

  changeLikeCardStatus(cardId, isLiked){
    if (isLiked === true){
      return this.dislikeCard(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }

  likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        credentials: "include",
        headers: this._headers
      })
      
      .then((res) => this._checkOk(res));
  }
  
  dislikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        credentials: "include",
        headers: this._headers
      })
       
      .then((res) => this._checkOk(res));
  }

  changeAvatar(link){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      }),
    })

    .then((res) => this._checkOk(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: "include",
      headers: this._headers
    })
     
  .then((res) => this._checkOk(res));
}
}

const api = new Api({
baseUrl: 'http://localhost:4000',
headers: {
  'Content-Type': 'application/json'
}
});

export default api;