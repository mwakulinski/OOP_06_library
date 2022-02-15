const User = require("./user");
const Book = require("./book");
const Booking = require("./booking");
const Library = require("./library");

const user1 = new User("Michal", "Wakulinski");
const user2 = new User("Paweł", "Pawełski");
const user3 = new User("Gaweł", "Gawelski");

const book1 = new Book(
  "O psach",
  "Michal Wakulinski",
  "photo1",
  "Good book to reade about dogs",
  2
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
  "Good book to reade about dinos",
  3
);

const library = new Library([book1, book2]);
library.addBook(book3);
library.addBook(book4);
library.addUser("Michal", "Wakulinski");
library.addUser("Paweł", "Pawełski");
library.addUser("Gaweł", "Gawelski");
library.bookBooks(library.usersList[0], [book1, book2]);
console.log(library);
library.returnBooks(library.usersList[0], [book1, book2]);
// library.returnBooks(library.usersList[0], [book1]);
console.log(library);
