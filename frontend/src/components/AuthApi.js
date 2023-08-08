const BASE_URL = 'api.dmitrii-mesto.nomoreparties.co';

function checkResponse(res) {
    if (res.ok) return res.json();
        return Promise.reject(res.status);
}

function request(url, options) {
    return fetch(url, options).then(checkResponse)
}

export const register = (email, password) => {
    return request(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            "email": email,
            "password": password}),
    })
}

export const authorization = (email, password) => {
    return request(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            "email": email,
            "password": password}),
    })
}

export const getContent = () => {
    return request(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
}

export const logOut = () => {
    return request(`${BASE_URL}/logout`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include"
    })
}
