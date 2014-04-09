var observable = function (value) {
  var subscribers = [];

  var getterSetter = function (newValue) {
    if (newValue !== undefined) {
      var oldValue = value;
      value = newValue
      for (var i in subscribers) {
        subscribers[i](value, oldValue);
      }
    };
    return value;
  };

  getterSetter.observe = function (callback) {
    subscribers.push(callback);
  };

  return getterSetter;
};

module.exports = observable;
