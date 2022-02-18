const Book = require("./book");
const Validator = require("./validator");

class LibraryBook extends Book {
  constructor(title, author, photo, description) {
    super(title, author, photo, description);
  }

  set quantity(quantity) {
    Validator.throwIfNotPositiveInt(quantity);
    this._quantity = quantity;
  }

  get quantity() {
    return this._quantity;
  }
}

module.exports = LibraryBook;
