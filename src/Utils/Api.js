class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }
  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }
  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        cardId,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Error: ${res.status}`);
      }
    });
  }
  nonlikedCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        cardId,
      }),
    }).then((res) => {
      console.log(`Status: ${res.status}`);
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }
  editAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar}),
    }).then((res) => {
      console.log(`Status: ${res.status}`);
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Error: ${res.status}`);
    });
  }
} //{avatar: avatar}

export default Api;
