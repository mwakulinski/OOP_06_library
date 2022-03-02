const Book = require("./book");
const User = require("./user");
const Validator = require("./validator");
const add = require("date-fns/add");
const endOfDay = require("date-fns/endOfDay");
const differenceInCalendarDays = require("date-fns/differenceInCalendarDays");

class Booking {
  constructor(user, books = []) {
    this.user = user;
    this.bookingDate = new Date();
    this.#setReturnDate();
    this.booksList = books;
    this.penalty = 0;
  }

  set user(user) {
    Validator.throwIfNotProperInstacne(user, User);
    this._user = user;
  }

  get user() {
    return this._user;
  }

  set booksList(books) {
    Validator.throwIfNotArr(books);
    books.forEach((book) => Validator.throwIfNotProperInstacne(book, Book));
    this._bookList = books;
  }

  get booksList() {
    return this._bookList;
  }

  #setReturnDate() {
    this.returnDate = endOfDay(add(new Date(), { days: 7 }));
  }

  addBookToBooking(book) {
    Validator.throwIfNotProperInstacne(book, Book);
    this.booksList.push(book);
  }

  returnBook(bookId) {
    Validator.throwIfNotString(bookId);
    const book = this.findElementByIdInArr(this.booksList, bookId);
    if (!book) {
      throw new Error("You didn't book such a book");
    }
    this.#countPenaltyPerBook();
    this.booksList = this.booksList.filter(({ id }) => id !== bookId);
  }

  #countPenaltyPerBook() {
    const currentDate = new Date(2022, 2, 27); //sample date to test, it should be "new Date();"
    const numberOfDelayDays = differenceInCalendarDays(
      currentDate,
      this.returnDate
    );

    if (numberOfDelayDays > 0) {
      this.penalty += 10 * Math.pow(1.125, numberOfDelayDays - 1);
      this.penalty = this.#roundToTwoDecimalPlaces(this.penalty);
    }
  }

  payPenalty(inputSum) {
    Validator.throwIfNotPositiveNumber(inputSum);
    this.penalty -= inputSum;
    this.penalty = this.#roundToTwoDecimalPlaces(this.penalty);
  }

  findElementByIdInArr(arr, bookId) {
    return arr.find((item) => item.id === bookId);
  }

  #roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
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
booking.addBookToBooking(book1);
booking.addBookToBooking(book2);
booking.returnBook(book1.id);
booking.returnBook(book2.id);
booking.payPenalty(142);
console.log(booking);
// Booking dostaje użytkownika w constructorze

// Ma mieć: datę wypożyczenia, datę zwrotu (+7d od wypożyczenia), listę wypożyczonych książek, kara

// Ma umożliwiać:
// - usuwanie i dodawanie książki do listy wyporzyczonych książek
// - zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie -
// każdy dzień zwłoki to naliczenie jakiejś kary.
