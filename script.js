let myLibrary = [];

const bookContainer = document.querySelector('#book-ctn');
const newBookButton = document.querySelector('#menu-ctn button');
//let deleteButtons = document.querySelectorAll('.delete');

newBookButton.addEventListener('click', addBook);


function book (title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

function addBook (){
    let title = prompt('book title?', 'none');
    let author = prompt('author?', 'no one');
    let pages = prompt('number of pages?', '0');
    let read = prompt('read it?', 'no');

    read = (read === 'no') ? false : true;

    let newBook = new book(title, author, pages, read);

    myLibrary.push(newBook);
    let i = myLibrary.length - 1;
    displayBook(myLibrary[i]);
};

function removeBook(index){

  let bookToDelete = document.querySelector(`[data-index = "${index}"]`);
  bookToDelete.parentNode.removeChild(bookToDelete);
  //delete myLibrary[index];

};

function removeChildNodes(parent){
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  };
};

function displayBook (book){

  let i = myLibrary.length - 1;
  let bookDiv = document.createElement('div');
  bookDiv.setAttribute('data-index', i);

  let bookTitle = document.createElement('p');
  let bookAuthor = document.createElement('p');
  let bookPages = document.createElement('p');
  let bookReadStatus = document.createElement('p');

  let bookRemoveButton = document.createElement('button');
  bookRemoveButton.classList.add('delete');




  bookTitle.textContent = "Title: " + book.title;
  bookAuthor.textContent = "Author: " + book.author;
  bookPages.textContent = "Pages: " + book.pages;
  bookReadStatus.textContent = "Read: " + book.read;
  bookRemoveButton.textContent = 'DELETE';

  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(bookPages);
  bookDiv.appendChild(bookReadStatus);
  bookDiv.appendChild(bookRemoveButton);

  bookRemoveButton.addEventListener('click', (e) =>{
    removeBook(bookRemoveButton.parentNode.dataset.index);
  });

  bookContainer.appendChild(bookDiv);

};




