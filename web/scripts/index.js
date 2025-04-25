document.addEventListener("DOMContentLoaded", async () => {
    const commentsContainer = document.getElementById("comments-container");

    // Função para carregar livros com comentários
    async function loadComments() {
        try {
            const response = await fetch("http://localhost:3000/api/books");
            const books = await response.json();

            // Limpa o contêiner de comentários
            commentsContainer.innerHTML = "";

            // Filtra livros com comentários e exibe
            books.forEach((book) => {
                if (book.comment && book.comment.trim() !== "") {
                    const commentCard = document.createElement("div");
                    commentCard.classList.add("comment-card");
                    commentCard.innerHTML = `
                        <h3>${book.title}</h3>
                        <p>${book.comment}</p>
                    `;
                    commentsContainer.appendChild(commentCard);
                }
            });
        } catch (error) {
            console.error("Erro ao carregar comentários:", error);
        }
    }

    // Carrega os comentários ao carregar a página
    loadComments();
});