class Validator {
  static throwIfNotString(input) {
    if (typeof input !== "string") {
      throw new Error("Input data must be a string");
    }
  }

  static isObject = (object) => {
    return typeof object === "object";
  };

  static isArray = (object) => {
    return Array.isArray(object);
  };

  static isInstacneOf = (instance, classType) => {
    if (!(instance instanceof classType))
      throw new Error("Such an user does not exist");
  };
}

module.exports = Validator;
