const Validator = require("./validator");
const User = require("./user");
const Booking = require("./booking");
const Book = require("./book");

class Library {
  constructor() {
    this.booksList = [];
    this.usersList = [];
    this.bookings = [];
  }

  addBook(book, quantity) {
    Validator.throwIfNotProperInstacne(book, Book);
    Validator.throwIfNotPositiveInt(quantity);

    const bookInLibrary = this.findElementByIdInArr(this.booksList, book.id);

    if (bookInLibrary) {
      bookInLibrary.available += quantity;
      return;
    }

    this.booksList.push({ book: book, available: quantity, borrowed: 0 });
  }

  deleteBook(bookId, quantity = 1) {
    this.throwIfBookNotFound(bookId);

    const bookInLibrary = this.findElementByIdInArr(this.booksList, bookId);

    if (bookInLibrary.available <= quantity) {
      throw new Error(
        `You can not delete more books than ${bookInLibrary.available}`
      );
    }

    bookInLibrary.available -= quantity;
  }

  addUser(name, surname) {
    this.usersList.push(new User(name, surname));
  }

  deleteUser(userId) {
    this.usersList = this.usersList.filter(({ id }) => id !== userId);
  }

  bookBooks(userId, booksIds) {
    const user = this.findElementByIdInArr(this.usersList, userId);

    booksIds.forEach((bookId) => {
      this.throwIfBookUnavaialable(bookId);
    });

    const booksToBook = [];
    booksIds.forEach((bookId) => {
      const { book } = this.findElementByIdInArr(this.booksList, bookId);
      this.decreaseNumberOfAvaialableCopies(bookId);

      booksToBook.push(book);
    });

    const booking = new Booking(user, booksToBook);
    this.bookings.push(booking);
  }

  //troche solidu złamane i nazwy nieadekwatne
  returnBook(userId, bookId) {
    const user = this.findElementByIdInArr(this.usersList, userId);
    const book = this.findElementByIdInArr(this.booksList, bookId).book;
    const booking = this.findBookingWithBook(user, book);

    if (!booking) {
      throw new Error(
        `${user.name + " " + user.surname} didn't book ${book.title}`
      );
    }

    booking.returnBook(bookId);
    this.increaseNumberOfAvaialableCopies(bookId);
  }

  decreaseNumberOfAvaialableCopies(bookId) {
    const book = this.findElementByIdInArr(this.booksList, bookId);

    if (book.available >= 1) {
      book.available -= 1;
      book.borrowed += 1;
    }
  }

  increaseNumberOfAvaialableCopies(bookId) {
    const book = this.findElementByIdInArr(this.booksList, bookId);
    if (book.borrowed > 0) {
      book.available += 1;
      book.borrowed -= 1;
    }
  }

  findElementByIdInArr(arr, elementId) {
    const arrValues = Object.values(arr);
    return arrValues.find((item) => {
      if (typeof item === "object") {
        return this.findElementByIdInArr(item, elementId);
      }
      return item === elementId;
    });
  }

  findBookingWithBook(user, book) {
    const userBookings = this.findUserBookings(user);
    return userBookings.find((booking) => booking.booksList.includes(book));
  }

  findUserBookings(user) {
    return this.bookings.filter((booking) => {
      return (
        booking.user.name === user.name && booking.user.surname === user.surname
      );
    });
  }

  throwIfBookUnavaialable(bookId) {
    const book = this.findElementByIdInArr(this.booksList, bookId);
    if (book.available === 0) {
      throw new Error("Book unavaviable, please try book later");
    }
  }

  throwIfBookNotFound(bookId) {
    if (!this.findElementByIdInArr(this.booksList, bookId)) {
      throw new Error(`Such a boook does not exist in this Library`);
    }
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
