var uuid          = require('uuid')
  , MessageBroker = require('../utils/MessageBroker')
  , observable    = require('../utils/observable')
  , unobservable  = require('../utils/unobservable')
  , Class         = require('../utils/Class');

var BaseWidget = Class.extend({
  init: function () {
    var self = this;

    MessageBroker.extend(this);

    this.uuid      = uuid.v4();
    this.parent    = observable();
    var children   = [];
    this.x         = observable(0);
    this.y         = observable(0);
    this.width     = observable(0);
    this.height    = observable(0);
    this.absX      = unobservable(0);
    this.absY      = unobservable(0);
    this.absWidth  = unobservable(0);
    this.absHeight = unobservable(0);

    var emitParentCoordsChange = function () {
      for (var i in children) {
        children[i].emitMessage('parent.coords.change');
      }
    };

    this.onMessage('child.add', function (child) {
      for (var i in children) {
        if (children[i].uuid === child.uuid) {
          console.warn('Child widget already added.')
          return;
        }
      }
      children.push(child);
    });

    this.onMessage('child.remove', function (child) {
      for (var i in children) {
        if (children[i].uuid === child.uuid) {
          children.splice(i, 1);
        }
      }
    });

    this.x.observe(function (newValue) {
      if (self.el) {
        self.el.x = newValue;
      }
      self.absX(self.getAbsX());
      emitParentCoordsChange();
    });

    this.y.observe(function (newValue) {
      if (self.el) {
        self.el.y = newValue;
      }
      self.absY(self.getAbsY());
      emitParentCoordsChange();
    });

    this.width.observe(function () {
      self.absWidth(self.getAbsWidth());
      emitParentCoordsChange();
    });

    this.height.observe(function () {
      self.absHeight(self.getAbsHeight());
      emitParentCoordsChange();
    });

    this.onMessage('parent.coords.change', function (data) {
      self.absX(self.getAbsX());
      self.absY(self.getAbsY());
      self.absWidth(self.getAbsWidth());
      self.absHeight(self.getAbsHeight());
      emitParentCoordsChange();
    });

    this.parent.observe(function (newValue, oldValue) {
      oldValue && oldValue.emitMessage('child.remove', self);
      newValue && newValue.emitMessage('child.add', self);
      self.emitMessage('parent.coords.change');
    });

    this.x(this.x());
    this.y(this.y());
    this.width(this.width());
    this.height(this.height());
  }

, getAbsX: function () {
    return (this.parent() && this.parent().absX() || 0) + this.x();
  }

, getAbsY: function () {
    return (this.parent() && this.parent().absY() || 0) + this.y();
  }

, getAbsWidth: function () {
    return this.absX() + this.width();
  }

, getAbsHeight: function () {
    return this.absY() + this.height();
  }
});

module.exports = BaseWidget;
