const LibraryBook = require("./library-book");
const User = require("./user");
const Validator = require("./validator");
const add = require("date-fns/add");
const endOfDay = require("date-fns/endOfDay");

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
  //date fns
  setReturnDate() {
    this.returnDate = endOfDay(add(new Date(), { days: 7 }));
  }

  makeBooking(book) {
    Validator.throwIfNotProperInstacne(book, LibraryBook);
    this.booksList.push(book);
  }

  returnBook(bookId) {
    const book = this.findElementByIdInArr(this.booksList, bookId);
    Validator.throwIfNotProperInstacne(book, LibraryBook);
    this.booksList = this.booksList.filter(({ id }) => id !== bookId);
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
