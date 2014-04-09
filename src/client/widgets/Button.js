var $             = require('jquery')
  , PIXI          = require('pixi.js')
  , observable    = require('../utils/observable')
  , MessageBroker = require('../utils/MessageBroker')
  , BaseWidget    = require('./BaseWidget');

var Button = BaseWidget.extend({
  init: function () {
    var self = this;

    this._super();

    this.width(200);
    this.height(50);
    this.fillColor     = observable(0x39ace6);
    this.strokeColor   = observable(0x777777);
    this.strokeWidth   = observable(4);
    this.strokeOpacity = observable(0.25);
    this.label         = observable('');

    this.el             = new PIXI.Graphics();
    this.el.interactive = true;

    this.setupEventBroker();
    this.draw();

    this.width.observe(function (newValue) {
      self.draw();
    });

    this.height.observe(function (newValue) {
      self.draw();
    });

    this.fillColor.observe(function (newValue) {
      self.draw();
    });

    this.strokeColor.observe(function (newValue) {
      self.draw();
    });

    this.strokeWidth.observe(function (newValue) {
      self.draw();
    });

    this.strokeOpacity.observe(function (newValue) {
      self.draw();
    });

    this.label.observe(function (newValue) {
      self.draw();
    });

    this.onMessage('child.add', function (widget) {
      self.el.addChild(widget.el);
    });
  }

, setupEventBroker: function () {
    var self = this;

    MessageBroker.extend(this, 'on', 'trigger');

    this.el.click = function (ev) {
      self.trigger('click', ev);
    };

    this.el.mousedown = function (ev) {
      self.trigger('mousedown', ev);
    };

    this.el.mousemove = function (ev) {
      self.trigger('mousemove', ev);
    };

    this.el.mouseup = function (ev) {
      self.trigger('mouseup', ev);
    };
  }

, draw: function () {
    var self = this;

    this.el.clear();

    this.el.beginFill(this.fillColor(), 1.0);
    if (this.strokeWidth() && this.strokeColor() >= 0) {
      this.el.lineStyle(this.strokeWidth(), this.strokeColor(), this.strokeOpacity());
    }
    this.el.drawRect(this.absX(), this.absY(), this.width(), this.height());
    this.el.endFill();

    $('#' + this.uuid).remove();
    $('body').append('<label></label>');
    var label = $('label').last();
    label.attr({
      id: this.uuid
    });
    label.css({
      position: 'absolute'
    , top: this.absY() + 'px'
    , left: this.absX() + 'px'
    , width: this.width() + 'px'
    , lineHeight: this.height() + 'px'
    , textAlign: 'center'
    , margin: 0
    });
    label.text(this.label());
    label.on('click', function () {
      self.trigger('click');
    });

    this.el.hitArea = new PIXI.Rectangle(this.absX(), this.absY(), this.width(), this.height());
  }
});

module.exports = Button;