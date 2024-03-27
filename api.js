import {
    formatDate
} from "./date.js";

const apiURL = 'https://wedev-api.sky.pro/api/v2/ekaterina-subbotina/comments';
const userURL = 'https://wedev-api.sky.pro/api/user/login';

export let token;
export let userName;

export const setToken = (newToken) => {
    token = newToken;
};
export const setUserName = (newUserName) => {
    userName = newUserName;
};

export function getComments() {
    return fetch(apiURL, {
            method: "GET",
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Cервер упал");
            }
        })
        .catch((error) => {
            alert(error);
        });
};

export function addNewComment(date, text) {
    return fetch(apiURL, {
        method: "POST",
        headers: {
            Authorization: token
        },
        body: JSON.stringify({
            date: formatDate(date),
            text: text,
        }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error("Сервер сломался, попробуй позже");
        }
        if (response.status === 400) {
            throw new Error("Ты сделал ошибку в запросе, исправь данные и попробуй снова");
        }
        return response.json();
    })
}

export function login(login, password) {
    return fetch(userURL, {
        method: "POST",
        body: JSON.stringify({
            login,
            password
        }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error("Сервер сломался, попробуй позже");
        }
        if (response.status === 400) {
            throw new Error("Ты сделал ошибку в запросе, исправь данные и попробуй снова");
        }
        return response.json();
    })
}