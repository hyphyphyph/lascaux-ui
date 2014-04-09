var $ = require('jquery')
  , PIXI = require('pixi.js')
  , BaseWidget = require('./BaseWidget');

var Stage = BaseWidget.extend({
  init: function () {
    var self = this;

    this._super();

    this.el = new PIXI.Stage(0xeeeeee);
    this.el.interactive = true;
    this.renderer = new PIXI.CanvasRenderer(
      $(window).width()
    , $(window).height()
    , null
    , false
    , true
    );
    document.body.appendChild(this.renderer.view);

    $(window).on('resize', function () {
      self.renderer.resize(
        $(window).width()
      , $(window).height()
      );
    });

    requestAnimFrame(animate);

    function animate () {
      requestAnimFrame(animate);
      self.renderer.render(self.el);
    }

    this.onMessage('child.add', function (widget) {
      self.el.addChild(widget.el);
    });
  }
});

module.exports = Stage;