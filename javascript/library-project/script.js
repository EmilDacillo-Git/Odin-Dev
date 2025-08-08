const myLibrary = [];

function book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addToLibrary(title, author, pages, isRead) {
  const newBook = new book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

const addBookForm = document.getElementById("addBookForm");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");
const addBookModal = document.getElementById("addBookModal");
const bookContainer = document.getElementById("book-container");

book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

newBookBtn.addEventListener("click", () => {
  addBookModal.classList.add("show");
});

cancelBtn.addEventListener("click", () => {
  addBookForm.reset();
  addBookModal.classList.remove("show");
});

function renderLibrary() {
  const container = document.getElementById("book-container");

  container.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.setAttribute("data-id", book.id);

    const title = document.createElement("h3");
    title.classList.add("book-title");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Page: ${book.pages}`;

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = book.isRead ? "✅ Read" : "📖 Not Read";

    const removeBtn = document.createElement("img");
    removeBtn.src = "./assets/delete.png"; // path to your icon file
    removeBtn.alt = "Remove book";
    removeBtn.classList.add("remove-btn");

    if (book.isRead) {
      toggleBtn.classList.add("read");
      toggleBtn.classList.remove("not-read");
    } else {
      toggleBtn.classList.remove("read");
      toggleBtn.classList.add("not-read");
    }

    toggleBtn.addEventListener("click", () => {
      book.toggleReadStatus();
      renderLibrary();
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(toggleBtn);
    card.appendChild(removeBtn);

    container.appendChild(card);
  });
}

bookContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".book-card");
  if (!card) return; // click outside cards

  const bookId = card.getAttribute("data-id");
  const book = myLibrary.find((b) => b.id === bookId);

  if (e.target.classList.contains("toggle-btn")) {
    book.toggleReadStatus();
    renderLibrary();
  }

  if (e.target.classList.contains("remove-btn")) {
    const index = myLibrary.findIndex((b) => b.id === bookId);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      renderLibrary();
    }
  }
});

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = parseInt(document.getElementById("pages").value);
  const isRead = document.getElementById("isRead").checked;

  addToLibrary(title, author, pages, isRead);
  renderLibrary();

  addBookForm.reset();
  addBookModal.classList.remove("show");
});
