const { v4: uuidv4 } = require("uuid");
const Validator = require("./validator");

class Book {
  #id;
  #totalQuantity;
  constructor(title, author, photo, description, quantity = 1) {
    this.title = title;
    this.author = author;
    this.photo = photo;
    this.description = description;
    this.quantity = quantity;
    this.#totalQuantity = quantity;
    this.#id = uuidv4();
  }

  // Ma miec: Tytuł, Autora, uuid, losowe zdjęcie oraz krótki opis

  changeQuantity(numberOfCopies) {
    if (
      this.quantity + numberOfCopies <= this.totalQuantity &&
      this.quantity + numberOfCopies >= 0
    ) {
      this.quantity = this.quantity + numberOfCopies;
    } else {
      throw new Error(
        `Number of book copies must be between 0 and ${this.totalQuantity}`
      );
    }
  }

  get totalQuantity() {
    return this.#totalQuantity;
  }
}

module.exports = Book;
