const LibraryBook = require("./library-book");
const User = require("./user");
const Validator = require("./validator");

class Booking {
  constructor(user) {
    this.user = user;
    this.bookingDate = new Date();
    this.setReturnDate();
    this.booksList = [];
    this.penalty = 0;
  }

  set user(user) {
    Validator.throwIfNotProperInstacne(user, User);
    this._user = user;
  }

  get user() {
    return this._user;
  }

  //sprawdzić czy nie da się inaczej???
  setReturnDate() {
    this.returnDate = new Date();
    this.returnDate.setDate(this.bookingDate.getDate() + 7);
    this.returnDate.setHours(24);
    this.returnDate.setMinutes(59);
    this.returnDate.setSeconds(59);
    this.returnDate.setMilliseconds(999);
  }

  makeBooking(book) {
    Validator.throwIfNotProperInstacne(book, LibraryBook);
    this.booksList.push(book);
  }

  returnBook(bookId) {
    const book = this.findElementByIdInArr(this.booksList, bookId);
    Validator.throwIfNotProperInstacne(book, LibraryBook);
    this.booksList = this.booksList.filter((book) => book.id !== bookId);
  }

  countPenaltyPerBook() {
    const currentDate = new Date(2022, 2, 27); //sample date to test, it should be "new Date();"
    const numberOfDelayDays = Math.ceil(
      (currentDate - this.returnDate) / 1000 / 60 / 60 / 24
    );

    if (numberOfDelayDays > 0) {
      this.penalty += 10 * Math.pow(1.125, numberOfDelayDays - 1);
    }
  }

  findElementByIdInArr(arr, bookId) {
    return arr.find((item) => item.id === bookId);
  }
}

module.exports = Booking;

// Booking dostaje użytkownika w constructorze

// Ma mieć: datę wypożyczenia, datę zwrotu (+7d od wypożyczenia), listę wypożyczonych książek, kara

// Ma umożliwiać:
// - usuwanie i dodawanie książki do listy wyporzyczonych książek
// - zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie -
// każdy dzień zwłoki to naliczenie jakiejś kary.
