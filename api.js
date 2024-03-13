import {
    renderComments
} from "./render.js";
import {
    formatDate
} from "./date.js";

const apiURL = 'https://wedev-api.sky.pro/api/v1/ekaterina-subbotina/comments';

export function getComments() {
    return fetch(apiURL, {
            method: "GET",
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Cервер упал");
            }
        }).then((responseData) => {
            const comments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    text: comment.text,
                    date: formatDate(new Date(comment.date)),
                    likes: comment.likes,
                    isLiked: false,
                }
            })

            renderComments(comments);
        })
        .catch((error) => {
            alert(error);
        });
};

export function addNewComment(date, text, userName) {
    return fetch(apiURL, {
        method: "POST",
        body: JSON.stringify({
            date: formatDate(date),
            text: text,
            name: userName,
            forceError: true,
        }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error("Сервер сломался, попробуй позже");
        }
        if (response.status === 400) {
            throw new Error("Ты сделал ошибку в запросе, исправь данные и попробуй снова");
        }
        return response.json();
    }).then((responseData) => {
        if (responseData.result == 'ok') {
            return getComments();
        }
    })
}