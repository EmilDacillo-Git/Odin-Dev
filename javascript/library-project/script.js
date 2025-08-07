const myLibrary = [];

function Book(id,title,author,pages,isRead){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

const newBookBtn = document.getElementById('new-book-btn');
const cancelBtn = document.getElementById('cancel-btn');

newBookBtn.addEventListener('click', () => {
    addBookModal.classList.add('show');
  });

cancelBtn.addEventListener('click', () => {
    addBookModal.classList.remove('show');
});