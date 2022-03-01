const { v4: uuidv4 } = require("uuid");
const Validator = require("./validator");

class Book {
  constructor(title, author, photo, description) {
    this.title = title;
    this.author = author;
    this.photo = photo;
    this.description = description;
    this.id = uuidv4();
  }

  set title(title) {
    Validator.throwIfNotString(title);
    this._title = title;
  }

  get title() {
    return this._title;
  }

  set author(author) {
    Validator.throwIfNotString(author);
    this._author = author;
  }

  get author() {
    return this._author;
  }

  set photo(photo) {
    Validator.throwIfNotString(photo);
    this._photo = photo;
  }

  get photo() {
    return this._photo;
  }

  set description(description) {
    Validator.throwIfNotString(description);
    this.throwIfDescriptonTooLong(description);
    this._description = description;
  }

  get description() {
    return this._description;
  }

  throwIfDescriptonTooLong(input) {
    const maxLength = 450;
    if (input.length > maxLength) {
      throw new Error(
        `Description must not be longer than ${maxLength} digits`
      );
    }
  }
  // Ma miec: Tytuł, Autora, uuid, losowe zdjęcie oraz krótki opis
}

module.exports = Book;
