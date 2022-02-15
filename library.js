const Validator = require("./validator");
const User = require("./user");
const Book = require("./book");
const Booking = require("./booking");

class Library {
  constructor(booksList = [], usersList = []) {
    this.booksList = booksList;
    this.availableBooks = [...booksList];
    this.bookedBooksList = [];
    this.usersList = usersList;
    this.bookings = [];
  }

  addBook(book) {
    this.booksList.push(book);
    this.availableBooks.push(book);
  }

  deleteBook(book) {
    this.booksList.splice(this.booksList.indexOf(book), 1);
    this.availableBooks.splice(this.availableBooks.indexOf(book), 1);
  }

  addUser(name, surname) {
    this.usersList.push(new User(name, surname));
  }

  deleteUser(user) {
    this.usersList.splice(this.usersList.indexOf(user), 1);
  }

  bookBooks(user, books) {
    Validator.isInstacneOf(user, User);

    this.bookings.push(new Booking(user));
    this.addToBookedBooksList(books);
    this.addToBookingList(books);
    this.refreshAvailableBooks();
  }

  addToBookedBooksList(books) {
    books.forEach((book) => {
      if (book.quantity === book.totalQuantity) {
        this.bookedBooksList.push(book);
      }
    });
  }

  addToBookingList(books) {
    books.forEach((book) => {
      this.bookings[this.bookings.length - 1].bookABook(book);
    });
  }

  refreshAvailableBooks() {
    this.availableBooks = this.availableBooks.filter(
      (book) => book.quantity !== 0
    );
  }

  returnBooks(user, books) {
    Validator.isInstacneOf(user, User);
    const userBookings = this.bookings.filter((booking) => {
      // console.log(booking);
      return (
        booking.user.name === user.name && booking.user.surname === user.surname
      );
    });
    books.forEach((book) => {
      userBookings
        .find((booking) => {
          return booking.booksList.includes(book);
        })
        .returnBook(book);
    });

    this.bookedBooksList = this.bookedBooksList.filter((book) => {
      return book.quantity !== book.totalQuantity;
    });
  }

  // Ma miec: listę książek, listę książek dostępnych (które nie zostały wypożyczone),
  // lista wypożyczeń, lista użytkowników
  // Ma umożliwiać:
  // - dodawanie książek do listy
  // - usuwanie książek z listy
  // - wypożyczanie książki dla usera X
  // - oddanie wypożyczania książki
}

module.exports = Library;
