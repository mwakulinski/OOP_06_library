const { v4: uuidv4 } = require("uuid");
const Validator = require("./validator");

class User {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
    this.id = uuidv4();
  }

  set name(name) {
    Validator.throwIfNotString(name);
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set surname(surname) {
    Validator.throwIfNotString(surname);
    this._surname = surname;
  }

  get surname() {
    return this._surname;
  }
}

module.exports = User;
