var Stage = require('../widgets/Stage')
  , Button = require('../widgets/Button');

module.exports = (function () {
  return {
    init: function () {
      var stage = new Stage();
      var button = new Button();
      button.x(0);
      button.y(0);
      button.label('Click Me');
      button.parent(stage);

      button.on('click', function () {
        button.x(50);
      })
    }
  }
})();
