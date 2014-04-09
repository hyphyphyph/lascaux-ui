var unobservable = function (value) {
  var getterSetter = function (newValue) {
    if (newValue !== undefined) {
      value = newValue;
    }
    return value;
  }
  return getterSetter;
};

module.exports = unobservable;