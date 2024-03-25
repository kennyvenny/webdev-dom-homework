 import {
   getComments,
   addNewComment,
   token
 } from "./api.js";

 import {
   formatDate
 } from "./date.js";

 import {
   renderComments
 } from "./commentsList.js";

 import {
   renderAuthForm
 } from "./loginForm.js";

 import {
   renderCommentForm
 } from "./addCommentForm.js";

 export let mainContainer = document.querySelector(".container");

 export function getAndRenderComments() {
   getComments().then((responseData) => {
     const comments = responseData.comments.map((comment) => {
       return {
         name: comment.author.name,
         text: comment.text,
         date: formatDate(new Date(comment.date)),
         likes: comment.likes,
         isLiked: false,
       }
     });
     renderComments(comments);
   });
 }

 export function render() {
   let pageType = token ? "pageAfterAuth" : "start";
   let mainHtml = `<ul class="comments" id="ul-comments">
      Пожалуйста, подождите, загружаю коментарии...
    </ul>
    <div class="form-wrapper"></div>`;

   mainContainer.innerHTML = mainHtml;
   
   switch (pageType) {
     case "start":
       renderAuthForm();
       break;
     case "pageAfterAuth":
       renderCommentForm();
       break;
   }

   getAndRenderComments();
 }