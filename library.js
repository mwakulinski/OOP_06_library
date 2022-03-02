const Validator = require("./validator");
const User = require("./user");
const Booking = require("./booking");
const Book = require("./book");

// {book: Book, quatity: 123}
class Library {
  constructor() {
    this.booksList = [];
    this.availableBooks = [];
    this.usersList = [];
    this.bookings = [];
  }

  addBook(book, quantity) {
    Validator.throwIfNotProperInstacne(book, Book);
    Validator.throwIfNotPositiveInt(quantity);

    const bookInLibrary = this.findElementByIdInArr(this.booksList, book.id);

    if (bookInLibrary) {
      const availableBook = this.findElementByIdInArr(
        this.availableBooks,
        book.id
      );
      bookInLibrary.quantity += quantity;
      availableBook.quantity += quantity;
      return;
    }

    this.booksList.push({ book: book, quantity: quantity });
    this.availableBooks.push({ book: book, quantity: quantity });
  }

  deleteBook(bookId, quantity = 1) {
    this.throwIfBookNotFound(bookId);

    const bookInLibrary = this.findElementByIdInArr(this.booksList, bookId);
    const availableBook = this.findElementByIdInArr(
      this.availableBooks,
      bookId
    );

    if (bookInLibrary.quantity > quantity) {
      bookInLibrary.quantity -= quantity;
      availableBook.quantity -= quantity;
    } else if (bookInLibrary.quantity === quantity) {
      this.booksList = this.booksList.filter((book) => book.id !== bookId);
      this.availableBooks = this.availableBooks.filter(
        (book) => book.id !== bookId
      );
    } else {
      throw new Error(
        `You can not delete more books than ${bookInLibrary.quantity}`
      );
    }
  }

  addUser(name, surname) {
    Validator.throwIfNotString(name);
    Validator.throwIfNotString(surname);
    this.usersList.push(new User(name, surname));
  }

  deleteUser(userId) {
    const user = this.findElementByIdInArr(this.usersList, userId);
    Validator.throwIfNotProperInstacne(user, User);
    this.usersList = this.usersList.filter((user) => user.id !== userId);
  }

  bookBooks(userId, books) {
    const user = this.findElementByIdInArr(this.usersList, userId);
    Validator.throwIfNotProperInstacne(user, User);
    Validator.throwIfNotArr(books);
    //do booking
    books.forEach((book) => Validator.throwIfNotProperInstacne(book, Book));

    const booking = new Booking(user, books);
    //Solid złamany
    booking.booksList.forEach((book) => this.throwIfBookUnavaialable(book.id));
    booking.booksList.forEach((book) => book.makeBooking);
    this.bookings.push(booking);

    booking.booksList.forEach((book) =>
      this.decreaseNumberOfAvaialableCopies(book)
    );
  }

  //troche solidu złamane i nazwy nieadekwatne
  returnBooks(userId, bookId) {
    const user = this.findElementByIdInArr(this.usersList, userId);
    Validator.throwIfNotProperInstacne(user, User);

    const book = this.findElementByIdInArr(this.booksList, bookId);
    Validator.throwIfNotProperInstacne(book, Book);

    const booking = this.findBookingWithBook(user, book);

    booking.booksList.forEach((book) => {
      this.increaseNumberOfAvaialableCopies(book);
    });

    booking.returnBook(book.id);
  }

  decreaseNumberOfAvaialableCopies(book) {
    const availableBook = this.findElementByIdInArr(
      this.availableBooks,
      book.id
    );

    availableBook.quantity -= 1;
    if (availableBook.quantity === 0) {
      this.availableBooks.splice(this.availableBooks.indexOf(availableBook), 1);
    }
  }

  increaseNumberOfAvaialableCopies(book) {
    const availableBook = this.findElementByIdInArr(
      this.availableBooks,
      book.id
    );

    if (!availableBook) {
      book.quantity = 1;
      this.availableBooks.push(book);
    } else {
      availableBook.quantity += 1;
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
    if (!this.findElementByIdInArr(this.availableBooks, bookId)) {
      throw new Error("Book unavaviable, please try book later");
    }
  }

  throwIfBookNotFound(bookId) {
    if (!this.findElementByIdInArr(this.booksList, bookId)) {
      throw new Error(`Such a boook does not exist in this Library`);
    }
  }

  #deepBookListCopy() {
    return this.booksList.map((book) =>
      Object.assign(
        new Book(book.title, book.author, book.photo, book.description),
        book
      )
    );
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
