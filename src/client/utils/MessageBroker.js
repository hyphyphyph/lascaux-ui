var MessageBroker = {
  extend: function (object, on, emit) {
    on   = on   || 'onMessage';
    emit = emit || 'emitMessage';

    var messageHandlers = {};

    object[on] = function (topic, callback) {
      messageHandlers[topic] = messageHandlers[topic] || [];
      messageHandlers[topic].push(callback);
    };

    object[emit] = function (topic, data) {
      if (!messageHandlers[topic]) {
        return;
      }
      for (var i in messageHandlers[topic]) {
        messageHandlers[topic][i](data);
      }
    };
  }
};

module.exports = MessageBroker;
