let myLibrary = [];

function book(title, author, pages, read){
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
};
