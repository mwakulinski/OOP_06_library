const Book = require("./book");
const Library = require("./library");

const book1 = new Book(
  "O psach",
  "Michal Wakulinski",
  "photo1",
  "Good book to reade about dogs"
);
const book2 = new Book(
  "O kotach",
  "Barbara Nowak",
  "photo2",
  "Good book to reade about cats"
);
const book3 = new Book(
  "O pszczołąch",
  "Maria Karaś",
  "photo3",
  "Good book to reade about bees"
);
const book4 = new Book(
  "O dinozaurach",
  "Feliks Dzierżyński",
  "photo4",
  "Good book to reade about dinos"
);

const library = new Library();
library.addBook(book1, 3);
library.addBook(book1, 3);
library.addBook(book2, 3);
library.addBook(book3, 3);
library.addBook(book4, 5);
library.addUser("Michal", "Wakulinski");
library.addUser("Paweł", "Pawełski");
library.addUser("Gaweł", "Gawelski");
library.addUser("Patryk", "Patrycki");

library.bookBooks(library.usersList[0].id, [book3.id, book4.id]);
library.bookBooks(library.usersList[1].id, [book3.id, book4.id]);
library.bookBooks(library.usersList[2].id, [book3.id, book4.id]);

library.returnBook(library.usersList[0].id, book3.id);
library.returnBook(library.usersList[0].id, book4.id);
library.returnBook(library.usersList[1].id, book4.id);
library.returnBook(library.usersList[2].id, book4.id);
library.deleteBook(library.booksList[0].book.id, 6);

// library.deleteUser(library.usersList[0].id);

console.log(library.booksList);
// console.log(library.availableBooks);
