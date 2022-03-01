class Validator {
  static throwIfNotString(input) {
    if (typeof input !== "string" || input.length === 0) {
      throw new Error("Input data must be a string");
    }
  }

  static isObject = (object) => {
    return typeof object === "object";
  };

  static throwIfNotArr = (object) => {
    if (!Array.isArray(object)) {
      throw new Error("Input data must be of type Array");
    }
  };

  static throwIfNotProperInstacne = (instance, classType) => {
    if (!(instance instanceof classType))
      throw new Error(`${instance} must be of class ${classType.name}`);
  };

  static throwIfNotPositiveNumber = (number) => {
    if (typeof number !== "number" || number <= 0) {
      throw new Error("Input data must be positive number");
    }
  };

  static throwIfNotPositiveInt = (number) => {
    if (!Number.isInteger(number) || number < 0) {
      throw new Error(`Input data must be a positive integer`);
    }
  };
}

module.exports = Validator;
