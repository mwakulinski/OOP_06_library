const Book = require("./book");
const User = require("./user");
const Validator = require("./validator");
const add = require("date-fns/add");
const endOfDay = require("date-fns/endOfDay");
const differenceInCalendarDays = require("date-fns/differenceInCalendarDays");

class Booking {
  constructor(user) {
    this.user = user;
    this.bookingDate = new Date();
    this.#setReturnDate();
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
  #setReturnDate() {
    this.returnDate = endOfDay(add(new Date(), { days: 7 }));
  }

  makeBooking(book) {
    Validator.throwIfNotProperInstacne(book, Book);
    this.booksList.push(book);
  }

  returnBook(bookId) {
    const book = this.findElementByIdInArr(this.booksList, bookId);
    Validator.throwIfNotProperInstacne(book, Book);
    this.countPenaltyPerBook();
    this.booksList = this.booksList.filter(({ id }) => id !== bookId);
  }

  countPenaltyPerBook() {
    const currentDate = new Date(2022, 1, 27); //sample date to test, it should be "new Date();"
    const numberOfDelayDays = differenceInCalendarDays(
      currentDate,
      this.returnDate
    );

    if (numberOfDelayDays > 0) {
      this.penalty += 5 * Math.pow(1.125, numberOfDelayDays - 1);
    }
  }

  findElementByIdInArr(arr, bookId) {
    return arr.find((item) => item.id === bookId);
  }
}

module.exports = Booking;

const user = new User("Michal", "Waki");

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

const booking = new Booking(user);
booking.makeBooking(book1);
booking.makeBooking(book2);
booking.countPenaltyPerBook();
console.log(booking);
// Booking dostaje użytkownika w constructorze

// Ma mieć: datę wypożyczenia, datę zwrotu (+7d od wypożyczenia), listę wypożyczonych książek, kara

// Ma umożliwiać:
// - usuwanie i dodawanie książki do listy wyporzyczonych książek
// - zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie -
// każdy dzień zwłoki to naliczenie jakiejś kary.
