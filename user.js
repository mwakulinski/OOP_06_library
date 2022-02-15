const { v4: uuidv4 } = require("uuid");
const Validator = require("./validator");

class User {
  #id;
  constructor(name, surname) {
    this._name = name;
    this._surname = surname;
    this.#id = uuidv4();
  }

  set name(name) {
    Validator.throwIfNotString(name);
    this.name = name;
  }

  set surname(surname) {
    Validator.throwIfNotString(surname);
    this._surname = surname;
  }

  get id() {
    return this.#id;
  }
}

module.exports = User;
