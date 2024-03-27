import {
    login,
    setToken,
    setUserName
} from "./api.js";

import {
    render
} from "./render.js";

const initShowAuthFormListener = (authButtonElement) => {
    authButtonElement.addEventListener("click", () => {
        const mainContainer = document.querySelector(".container");
        const loginPageHtml = `<h1>Страница входа</h1>
        <div class="form">
            <h3 class="form-title">Форма входа</h3>
            <div class="form-row">
                <input type="text" id="login-input" class="input" placeholder="Логин" />
                <input type="text" id="password-input" class="input" placeholder="Пароль" />
            </div>
            <br />
            <div class="flex-button">
                <button class="button" id="login-button">Войти</button>
            </div>

            <a href="index.html" id="link-to-login">Зарегистрироваться</a>
        </div>`;
        mainContainer.innerHTML = loginPageHtml;

        const loginButton = document.getElementById("login-button");

        loginButton.addEventListener("click", (event) => {
            event.preventDefault();
            const loginInput = document.getElementById("login-input");
            const passwordInput = document.getElementById("password-input");
            login(loginInput.value, passwordInput.value).then((responseData) => {
                setToken("Bearer " + responseData.user.token);
                setUserName(responseData.user.name);
                render();
            });
        });
    });
};

export function renderAuthForm() {
    let formWrapper = document.querySelector('.form-wrapper');
    let authButtonHtml = `Чтобы добавить комментарий, <a href="javascript:void(0)" class="auth-link">авторизуйтесь</a> `;

    formWrapper.innerHTML = authButtonHtml;

    const authButtonElement = document.querySelector(".auth-link");
    initShowAuthFormListener(authButtonElement);
}