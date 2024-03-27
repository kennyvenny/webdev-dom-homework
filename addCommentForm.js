 import {
     userName,
     addNewComment
 } from "./api.js";

 import {
     render
 } from "./render.js";

 const initAddNewCommentListener = (buttonElement) => {
     buttonElement.addEventListener("click", (event) => {
         const addCommentForm = document.querySelector('.add-form');
         const statusInfoBlock = document.querySelector('.status-info');
         const commentTextElement = document.getElementById("comment-text");

         commentTextElement.style.backgroundColor = '';

         if (commentTextElement.value == "") {
             commentTextElement.style.backgroundColor = 'red';
             return;
         }

         addCommentForm.style.display = "none";
         statusInfoBlock.style.display = "block";

         let text = commentTextElement.value;
         addNewComment(new Date(), text).then((responseData) => {
                 if (responseData.result == 'ok') {
                     commentTextElement.value = "";
                     addCommentForm.style.display = "flex";
                     statusInfoBlock.style.display = "none";
                     render();
                 }
             })
             .catch((error) => {
                 alert(error);
                 addCommentForm.style.display = "flex";
                 statusInfoBlock.style.display = "none";
             })
     });
 };

 export function renderCommentForm() {
     let formWrapper = document.querySelector('.form-wrapper');
     const commentFormHtml = `<div class="status-info">Комментарий добавляется</div>
    <div class="add-form">
      <input type="text" class="add-form-name" value="${userName}" id="name-input" readonly/>
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
        id="comment-text"></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="add-new-comment-button-element">Написать</button>
      </div>
    </div>`;
     formWrapper.innerHTML = commentFormHtml;

     const buttonElement = document.getElementById("add-new-comment-button-element");

     initAddNewCommentListener(buttonElement);
 };