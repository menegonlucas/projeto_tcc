document.addEventListener("DOMContentLoaded", () => {
    const addBookForm = document.getElementById("add-book-form");
    const readingProgressForm = document.getElementById("reading-progress-form");
    const booksContainer = document.getElementById("books-container");
    const bookSelect = document.getElementById("book-select");
    const progressFill = document.getElementById("progress-fill");
    const progressPercentage = document.getElementById("progress-percentage");

    // Função para carregar livros do backend
    async function loadBooks() {
        try {
            const response = await fetch("http://localhost:3000/api/books");
            const books = await response.json();

            // Limpa o contêiner e o select
            booksContainer.innerHTML = "";
            bookSelect.innerHTML = "";

            books.forEach((book) => {
                // Adiciona o livro ao contêiner
                const bookElement = document.createElement("div");
                bookElement.classList.add("book");
                bookElement.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>Autor: ${book.author}</p>
                    <p>Status: ${book.status || "Não definido"}</p>
                `;
                booksContainer.appendChild(bookElement);

                // Adiciona o livro ao select
                const option = document.createElement("option");
                option.value = book.id;
                option.textContent = book.title;
                bookSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar livros:", error);
        }
    }

    // Função para adicionar um livro
    addBookForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("book-title").value;
        const author = document.getElementById("book-author").value;

        try {
            await fetch("http://localhost:3000/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, author }),
            });

            addBookForm.reset();
            loadBooks(); // Recarrega os livros
        } catch (error) {
            console.error("Erro ao adicionar livro:", error);
        }
    });

    // Função para registrar progresso de leitura
    readingProgressForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const bookId = bookSelect.value;
        const status = document.getElementById("reading-status").value;
        const totalPages = parseInt(document.getElementById("total-pages").value) || 0;
        const currentPage = parseInt(document.getElementById("current-page").value) || 0;
        const comment = document.getElementById("comment").value;

        try {
            await fetch(`http://localhost:3000/api/books/${bookId}/progress`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, totalPages, currentPage, comment }),
            });

            readingProgressForm.reset();
            updateProgressBar(0); // Reseta a barra de progresso
            loadBooks(); // Recarrega os livros
        } catch (error) {
            console.error("Erro ao registrar progresso:", error);
        }
    });

    // Função para atualizar a barra de progresso
    readingProgressForm.addEventListener("input", () => {
        const totalPages = parseInt(document.getElementById("total-pages").value) || 0;
        const currentPage = parseInt(document.getElementById("current-page").value) || 0;

        if (totalPages > 0 && currentPage >= 0) {
            const progress = Math.min((currentPage / totalPages) * 100, 100); // Limita a 100%
            updateProgressBar(progress);
        } else {
            updateProgressBar(0);
        }
    });

    // Função para atualizar visualmente a barra de progresso
    function updateProgressBar(progress) {
        progressFill.style.width = `${progress}%`;
        progressPercentage.textContent = `${Math.round(progress)}%`;
    }

    // Carrega os livros ao carregar a página
    loadBooks();
});