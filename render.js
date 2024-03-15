const initLikeListInners = (comments) => {
    const likeElements = document.querySelectorAll(".like-button");
    for (let likeButton of likeElements) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = likeButton.dataset.index;

            let comment = comments[index];
            if (comment.isLiked) {
                comments[index].isLiked = false;
                comments[index].likes--;
            } else {
                comments[index].isLiked = true;
                comments[index].likes++;
            }
            renderComments(comments);
        })
    };
};
const initCommentAnswerListener = (comments) => {
    const commentElements = document.querySelectorAll(".comment");
    const commentTextElement = document.getElementById("comment-text");
    for (let commentLiEl of commentElements) {
        commentLiEl.addEventListener('click', (event) => {
            const index = commentLiEl.dataset.index;
            let comment = comments[index];

            commentTextElement.value = `
       > ${comment.text}
       ${comment.name}
        `;
        })
    };
};

export function renderComments(comments) {
    const ulCommentsElement = document.getElementById('ul-comments');
    const commentsHTML = comments.map((comment, index) => {
        return `<li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
        </div>
      </div>
    </li>`;

    }).join(" ");
    ulCommentsElement.innerHTML = commentsHTML;
    initLikeListInners(comments);
    initCommentAnswerListener(comments);
};