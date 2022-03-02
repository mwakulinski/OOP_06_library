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
