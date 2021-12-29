let myLibrary = [];
let storedLibrary = JSON.parse(localStorage.getItem('myLibrary'));

if (storedLibrary) myLibrary = storedLibrary;

const bookContainer = document.querySelector('#book-ctn');
const newBookButton = document.querySelector('#menu-ctn button');
const formContainer = document.querySelector('#form-ctn');
const newBookForm = document.querySelector('#new-book-form');
//let deleteButtons = document.querySelectorAll('.delete');

newBookButton.addEventListener('click', displayForm);
newBookForm.onsubmit = addBook;

initialDisplay();


class Book {
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  };
};

function addBook (e){
    e.preventDefault();
    hideForm();
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;


    let newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
    let i = myLibrary.length - 1;
    displayBook(myLibrary[i], i);
    populateStorage();
};

function removeBook(index){

  let bookToDelete = document.querySelector(`[data-index = "${index}"]`);
  bookToDelete.parentNode.removeChild(bookToDelete);
  myLibrary[index] = '';
  populateStorage();

};

function toggleReadStatus(index){
  myLibrary[index].read = (myLibrary[index].read) ? false : true;

  let statusToChange = document.querySelector(`[data-index = "${index}"] .readStatus`);
  statusToChange.textContent = (myLibrary[index].read) ? 'Read' : 'Not read';
  statusToChange.classList.remove((myLibrary[index].read) ? "not-read" : "read");
  statusToChange.classList.add((myLibrary[index].read) ? "read" : "not-read");
  populateStorage();

};

function displayBook (book, index){


  let bookDiv = document.createElement('div');
  bookDiv.setAttribute('data-index', index);

  let bookTitle = document.createElement('p');
  let bookAuthor = document.createElement('p');
  let bookPages = document.createElement('p');
  let bookReadToggle = document.createElement('button');
  bookReadToggle.classList.add('readStatus');

  let lineBreak = document.createElement("br");
  let bookRemoveButton = document.createElement('button');
  bookRemoveButton.classList.add('delete');


  bookTitle.textContent = `"${book.title}"`;
  bookAuthor.textContent = book.author;
  bookPages.textContent = `${book.pages} pages`;
  bookReadToggle.textContent = (book.read) ? "Read" : "Not read";
  bookReadToggle.classList.add((book.read) ? "read" : "not-read");
  bookRemoveButton.textContent = 'DELETE';


  bookDiv.appendChild(bookTitle);
  bookDiv.appendChild(bookAuthor);
  bookDiv.appendChild(bookPages);
  bookDiv.appendChild(bookReadToggle);
  bookDiv.appendChild(lineBreak);
  bookDiv.appendChild(bookRemoveButton);


  bookReadToggle.addEventListener('click', (e) => {
    toggleReadStatus(bookReadToggle.parentNode.dataset.index);
  });


  bookRemoveButton.addEventListener('click', (e) =>{
    removeBook(bookRemoveButton.parentNode.dataset.index);
  });

  bookContainer.appendChild(bookDiv);

};

function initialDisplay () {
  let i = 0;
  myLibrary.forEach(book => {
    displayBook(book, i);
    ++i;
  });
};

function displayForm () {
  newBookForm.reset();
  formContainer.classList.remove("inactive");
  formContainer.classList.add("active");
};

function hideForm () {
  formContainer.classList.remove("active");
  formContainer.classList.add("inactive");
};

function populateStorage(){
  let updatedLibrary = myLibrary.filter((a) => a);
  localStorage.setItem('myLibrary', JSON.stringify(updatedLibrary));
};



