document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-comments");
    const commentSection = document.getElementById("comment-section");
    const commentAuthor = document.getElementById("comment-author");
    const commentInput = document.getElementById("comment-input");
    const addCommentButton = document.getElementById("add-comment");
    const commentsContainer = document.getElementById("comments-container");

    if (!toggleButton || !commentSection || !commentAuthor || !commentInput || !addCommentButton || !commentsContainer) {
        console.error("Errore: elementi della sezione commenti non trovati.");
        return;
    }

    // Mostra/Nasconde la sezione commenti
    toggleButton.addEventListener("click", () => {
        if (commentSection.style.display === "none" || commentSection.style.display === "") {
            commentSection.style.display = "block";
            toggleButton.innerText = "🔽 Nascondi Commenti";
        } else {
            commentSection.style.display = "none";
            toggleButton.innerText = "💬 Visualizza Commenti";
        }
    });

    // Funzione per creare le reazioni ai commenti
    function createReactions() {
        const reactions = ["👍", "❤️", "😂"];
        const reactionContainer = document.createElement("div");
        reactionContainer.classList.add("reaction-container");

        reactions.forEach((emoji) => {
            const reactionButton = document.createElement("button");
            reactionButton.classList.add("reaction-button");
            reactionButton.innerText = emoji;
            reactionButton.dataset.count = 0;
            reactionButton.addEventListener("click", () => {
                let count = parseInt(reactionButton.dataset.count);
                count++;
                reactionButton.dataset.count = count;
                reactionButton.innerText = `${emoji} ${count}`;
            });
            reactionContainer.appendChild(reactionButton);
        });

        return reactionContainer;
    }

    // Aggiunge un nuovo commento con reazioni
    addCommentButton.addEventListener("click", () => {
        const author = commentAuthor.value.trim();
        const commentText = commentInput.value.trim();

        if (author === "" || commentText === "") {
            alert("Inserisci sia il nome che il commento!");
            return;
        }

        const noCommentText = document.querySelector(".no-comments");
        if (noCommentText) {
            noCommentText.remove();
        }

        const newComment = document.createElement("div");
        newComment.classList.add("comment");

        const authorElement = document.createElement("span");
        authorElement.classList.add("comment-author");
        authorElement.innerText = author;

        const textElement = document.createElement("p");
        textElement.innerText = commentText;

        const reactions = createReactions();

        newComment.appendChild(authorElement);
        newComment.appendChild(textElement);
        newComment.appendChild(reactions);

        commentsContainer.appendChild(newComment);

        commentAuthor.value = "";
        commentInput.value = "";
    });
});
