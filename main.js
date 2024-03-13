 "use strict";

 import {
     getComments, addNewComment
 } from "./api.js";
  
 const nameInputElement = document.getElementById("name-input");
 const commentTextElement = document.getElementById("comment-text");
 const buttonElement = document.getElementById("button-element");

 getComments();

 buttonElement.addEventListener("click", (event) => {
     event.preventDefault();
     const addCommentForm = document.querySelector('.add-form');
     const statusInfoBlock = document.querySelector('.status-info');
     nameInputElement.style.backgroundColor = '';
     commentTextElement.style.backgroundColor = '';
     if (nameInputElement.value == "") {
         nameInputElement.style.backgroundColor = 'red';
         return;
     }
     if (commentTextElement.value == "") {
         commentTextElement.style.backgroundColor = 'red';
         return;
     }

     addCommentForm.style.display = "none";
     statusInfoBlock.style.display = "block";

     let text = commentTextElement.value;
     let userName = nameInputElement.value;
     addNewComment(new Date(), text, userName).then(() => {
             commentTextElement.value = "";
             nameInputElement.value = "";
             addCommentForm.style.display = "flex";
             statusInfoBlock.style.display = "none";
         })
         .catch((error) => {
             alert(error);
             addCommentForm.style.display = "flex";
             statusInfoBlock.style.display = "none";
         })
 });
 